import React from 'react'
import './rpc.styl'
import Content from '../../components/content'
import hashHistory from '../../routes/history'
import ReactJson from 'react-json-view'
import rpcTemplate from './rpc-template'

import { getSelectNetwork } from '../../utils/storage'
import queryString from 'query-string'

class APIRpc extends React.Component<any, any> {
  input: string = ''
  output: string = ''
  constructor(props: any) {
    super(props)
  }
  componentDidMount() {
    var self = this
    var params = queryString.parse(self.props.location.search)
    var method = params.method
    if (!method) {
      method = rpcTemplate[0].name
      hashHistory.replace('/api/rpc?method=' + rpcTemplate[0].name)
    }
    var item: any = rpcTemplate.find(d => {
      return d.name == method
    })
    try {
      self.props.networkAction.rpc(JSON.parse(item.inputSample || '{}'))
    } catch (e) {
      console.error(e)
    }
  }
  componentWillReceiveProps(nextProps: any) {
    var self = this
    if (nextProps.location.search !== self.props.location.search) {
      var params = queryString.parse(self.props.location.search)
      var method = params.method
      if (!method) {
        method = rpcTemplate[0].name
        hashHistory.replace('/api/rpc?method=' + rpcTemplate[0].name)
      }
      var item: any = rpcTemplate.find(d => {
        return d.name == method
      })
      try {
        self.input = item.inputSample || '{}'

        self.props.networkAction.rpc(JSON.parse(self.input))
      } catch (e) {
        console.error(e)
      }
    }
  }
  componentDidCatch(error: any, info: any) {
    console.error(error, 'componentDidCatch')
    console.error(info, 'componentDidCatch')
  }
  render() {
    var self = this
    var params = queryString.parse(self.props.location.search)
    var method = params.method || rpcTemplate[0].name

    var selectNetwork = getSelectNetwork()

    return (
      <Content className="apiRpc" bgColor="white">
        <div
          className="container"
          style={{
            marginTop: 30,
            marginBottom: 30,
            overflowX: 'auto',
            position: 'relative'
          }}
        >
          <div className="withRow apiRpcBody">
            <div style={{ width: 200 }}>
              {rpcTemplate.map(function(item) {
                var className = 'rpcItem'
                if (item.name == method) {
                  className += ' rpcActiveItem'
                }
                return (
                  <div
                    className={className}
                    onClick={() => {
                      hashHistory.push('/api/rpc?method=' + item.name)
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
                  <li className="breadcrumb-item">{selectNetwork.url}</li>
                  <li className="breadcrumb-item active" aria-current="page">
                    {method}
                  </li>
                </ol>
              </nav>
              <div className="withColumn">
                <div className="card" style={{ height: '40%' }}>
                  <div className="card-header">Input</div>
                  <div className="card-body">
                    <ReactJson
                      src={self.props.network.rpcData.input || {}}
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
                          self.props.networkAction.rpc(
                            JSON.parse(input || '{}')
                          )
                        } catch (e) {
                          console.error(e)
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
                    <ReactJson src={self.props.network.rpcData.output || {}} />
                  </div>
                  <div className="card-footer">
                    <small className="text-muted" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Content>
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
)(injectIntl(APIRpc))
