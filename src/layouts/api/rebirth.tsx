import React from 'react'
import './rebirth.styl'
import Content from '../../components/content'
import hashHistory from '../../routes/history'
import ReactJson from 'react-json-view'
import rebirthTemplate from './rebirth-template'

import { getSelectNetwork } from '../../utils/storage'
import queryString from 'query-string'

class APIRebirth extends React.Component<any, any> {
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
      method = rebirthTemplate[0].name
      hashHistory.replace('/api/rebirth?method=' + rebirthTemplate[0].name)
    }
    var item: any = rebirthTemplate.find(d => {
      return d.name == method
    })
    try {
      self.input = item.inputSample || '{}'
      self.props.networkAction.rebirth(
        getSelectNetwork().url + method,
        JSON.parse(item.inputSample)
      )
    } catch (e) {
      console.error(e)
    }
  }
  componentWillReceiveProps(nextProps: any) {
    var self = this
    if (nextProps.location.search !== self.props.location.search) {
      var params = queryString.parse(nextProps.location.search)
      var method = params.method
      if (!method) {
        method = rebirthTemplate[0].name
        hashHistory.replace('/api/rebirth?method=' + rebirthTemplate[0].name)
      }
      var item: any = rebirthTemplate.find(d => {
        return d.name == method
      })
      try {
        self.props.networkAction.rebirth(
          getSelectNetwork().url + method,
          JSON.parse(item.inputSample || '{}')
        )
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
    var method = params.method || rebirthTemplate[0].name
    var selectNetwork = getSelectNetwork()

    return (
      <Content className="apiRebirth" bgColor="white">
        <div
          className="container"
          style={{
            minHeight: self.props.app.appHeight - 338,
            marginTop: 30,
            marginBottom: 30,
            position: 'relative',
            overflowX: 'auto'
          }}
        >
          <div className="withRow apiRebirthBody">
            <div style={{ width: 200 }}>
              {rebirthTemplate.map(function(item) {
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
)(injectIntl(APIRebirth))
