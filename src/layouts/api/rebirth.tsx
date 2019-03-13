import React from 'react'
import './rebirth.styl'
import Layout from '../../components/layout'
import { hashHistory } from 'react-router'
import Header from '../common/Header'
import Footer from '../common/Footer'
import ReactJson from 'react-json-view'

const jsonRpc = [
  {
    name: '/api/info/url',
    inputSample: ''
  },
  {
    name: '/api/blocks',
    inputSample:
      '{"numberFrom":"10","numberTo":"20","transactionFrom":"1","transactionTo":"100","page":"1","perPage":"10","offset":"1","limit":"10"}'
  },
  {
    name: '/api/transactions',
    inputSample:
      '{"account":"0x46f8bf24c777fee056d447f3869ee5f71b37d0e3","from":"0x46f8bf24c777fee056d447f3869ee5f71b37d0e3","to":"0xffffffffffffffffffffffffffffffffff010001","valueFormat":"decimal","page":"1","perPage":"10","offset":"1","limit":"10"}'
  },
  {
    name: '/api/transactions/:hash',
    inputSample: ''
  },
  {
    name: '/api/statistics',
    inputSample: '{type: "proposals"}'
  },
  {
    name: '/api/status',
    inputSample: ''
  },
  {
    name: '/api/sync_errors',
    inputSample: '{"page":1,"perPage":10,"offset":1,"limit":10}'
  },
  {
    name: '/api/erc20/transfers',
    inputSample:
      '{"address":"0x...","account":"from or to","from":"from address","to":"to address","page":1,"perPage":10,"offset":1,"limit":10}'
  },
  {
    name: '/api/event_logs/:address',
    inputSample: '{"page":1,"perPage":10}'
  }
]

// import { api } from '../../utils/config'
import { getSelectNetwork } from '../../utils/storage'

class APIRebirth extends React.Component<any, any> {
  input: string = ''
  output: string = ''
  constructor(props: any) {
    super(props)
  }
  componentDidMount() {
    var self = this
    var params = self.props.location.query
    var method = params.method
    if (!method) {
      method = jsonRpc[0].name
      hashHistory.replace('/api/rebirth?method=' + jsonRpc[0].name)
    }
    var item: any = jsonRpc.find(d => {
      return d.name == method
    })
    try {
      self.input = JSON.parse(item.inputSample || '{}')
      self.props.networkAction.rebirth(
        getSelectNetwork().url + method,
        self.input
      )
    } catch (e) {
      console.log(e)
    }
  }
  componentWillReceiveProps(nextProps: any) {
    var self = this
    if (
      JSON.stringify(nextProps.location.query) !==
      JSON.stringify(self.props.location.query)
    ) {
      var method = nextProps.location.query.method
      if (!method) {
        method = jsonRpc[0].name
        hashHistory.replace('/api/rebirth?method=' + jsonRpc[0].name)
      }
      var item: any = jsonRpc.find(d => {
        return d.name == method
      })
      try {
        self.props.networkAction.rebirth(
          getSelectNetwork().url + method,
          JSON.parse(item.inputSample || '{}')
        )
      } catch (e) {
        console.log(e)
      }
      // self.props.networkAction.rpc(method);
    }
  }
  componentDidCatch(error: any, info: any) {
    console.log(error, 'componentDidCatch')
    console.log(info, 'componentDidCatch')
  }
  render() {
    var self = this
    var params = self.props.location.query
    var method = params.method
    if (!method) {
      method = jsonRpc[0].name
    }
    // var networks = api.serverList;
    var selectNetwork = getSelectNetwork()

    // var item = jsonRpc.find((d)=>{return d.name==method});
    return (
      <Layout className="apiRebirth" bgColor="white">
        <Header location={self.props.location} app={self.props.app} />
        <div
          className="container withRow"
          style={{
            minHeight: self.props.app.appHeight - 338,
            marginTop: 30,
            marginBottom: 30,
            position: 'relative'
          }}
        >
          <div style={{ width: 200 }}>
            {jsonRpc.map(function(item) {
              var className = 'rpcItem'
              if (item.name == method) {
                className += ' rpcActiveItem'
              }
              return (
                <div
                  className={className}
                  onClick={() => {
                    hashHistory.push('/api/rebirth?method=' + item.name)
                  }}
                >
                  {item.name}
                </div>
              )
            })}
          </div>
          <div
            className="withRowLeftAuto"
            style={{
              marginLeft: 10,
              height: '100%',
              position: 'sticky',
              top: 0
            }}
          >
            <nav aria-label="breadcrumb">
              <ol className="breadcrumb">
                <li className="breadcrumb-item">
                  {selectNetwork.url}
                  {method}
                </li>
              </ol>
            </nav>
            <div className="withColumn">
              <div className="card" style={{ height: '40%' }}>
                <div className="card-header">Input</div>
                <div className="card-body">
                  <ReactJson
                    src={self.props.network.rebirthData.input || {}}
                    onEdit={v => {
                      var newValue = v.updated_src
                      self.input = JSON.stringify(newValue)
                    }}
                    onDelete={v => {
                      var newValue = v.updated_src
                      self.input = JSON.stringify(newValue)
                    }}
                  />
                </div>
                <div className="card-footer" style={{ textAlign: 'right' }}>
                  <button
                    className="btn btn-danger"
                    onClick={() => {
                      var input = self.input
                      try {
                        self.props.networkAction.rebirth(
                          getSelectNetwork().url + method,
                          JSON.parse(input || '{}')
                        )
                      } catch (e) {
                        console.log(e)
                      }
                    }}
                  >
                    发送
                  </button>
                </div>
              </div>
              <div
                className="card withColumnLeftAuto"
                style={{ marginTop: 20 }}
              >
                <div className="card-header">Output</div>
                <div className="card-body">
                  <div ref="output" style={{ width: '100%', minHeight: 200 }}>
                    <ReactJson
                      src={self.props.network.rebirthData.output || {}}
                    />
                  </div>
                </div>
                <div className="card-footer">
                  <small className="text-muted" />
                </div>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </Layout>
    )
  }
}
import { injectIntl } from 'react-intl'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as appAction from '../../redux/actions/appAction'
import * as networkAction from '../../redux/actions/network'
import { IRootState } from '../../redux/states'

export default connect(
  (state: IRootState) => ({ app: state.app, network: state.network }),
  dispatch => ({
    appAction: bindActionCreators(appAction, dispatch),
    networkAction: bindActionCreators(networkAction, dispatch)
  })
)(injectIntl(APIRebirth))
