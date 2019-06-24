import React from 'react'
import './detail.styl'
import Content from '../../components/content'
import hashHistory from '../../routes/history'

import { format } from '../../utils/time'
import { valueFormat, toHex, scientificNotationToString } from '../../utils/hex'

class BlockDetail extends React.Component<any, any> {
  componentDidMount() {
    var self = this
    var params = self.props.match.params
    if (params.hash) {
      self.props.blockAction.getBlock(params.hash).then((block: any) => {
        if (!block) {
          hashHistory.replace('/search?q=' + params.hash)
        }
      })
    } else {
      var id = params.id
      if (!parseInt(id)) {
        hashHistory.replace('/search?q=' + id)
        return
      }
      self.props.blockAction.getBlock(id).then((block: any) => {
        if (!block) {
          hashHistory.replace('/search?q=' + id)
        }
      })
    }
  }
  componentWillReceiveProps(nextProps: any) {
    var self = this
    if (
      JSON.stringify(nextProps.match.params) !==
      JSON.stringify(self.props.match.params)
    ) {
      if (nextProps.match.params.hash) {
        self.props.blockAction
          .getBlock(nextProps.match.params.hash)
          .then((block: any) => {
            if (!block) {
              hashHistory.replace('/search?q=' + nextProps.match.params.hash)
            }
          })
      } else {
        var id = nextProps.match.params.id
        if (!parseInt(id)) {
          hashHistory.replace('/search?q=' + id)
          return
        }
        self.props.blockAction.getBlock(id).then((block: any) => {
          if (!block) {
            hashHistory.replace('/search?q=' + id)
          }
        })
      }
    }
  }
  render() {
    var self = this
    var data = self.props.block.item
    return (
      <Content className="blockDetail" bgColor="#fbfbfb">
        <div
          style={{
            width: '100%',
            backgroundImage: 'url("./images/list_bg.png")',
            backgroundRepeat: 'no-repeat',
            paddingTop: 96,
            paddingBottom: 85
          }}
        >
          <div className="container">
            <div className="blockNav">
              <div className="withRow blockBodyRow">
                <div
                  className="blockDetailKey"
                  style={{ color: '#47484a', fontSize: 16 }}
                >
                  Block: # {data && parseInt(data.header.number)}
                </div>
                <div className="blockDetailValue withRowLeftAuto">
                  <div
                    className="preButton vhCenter operationItem"
                    onClick={() => {
                      var id =
                        self.props.match.params.id ||
                        (data && data.header.number)
                      if (id && parseInt(id) - 1 >= 0)
                        hashHistory.push('/block/id/' + (parseInt(id) - 1))
                    }}
                  >
                    &lt;
                  </div>
                  <div
                    className="nextButton vhCenter operationItem"
                    onClick={() => {
                      var id =
                        self.props.match.params.id ||
                        (data && data.header.number)
                      if (id && parseInt(id) + 1 >= 0)
                        hashHistory.push('/block/id/' + (parseInt(id) + 1))
                    }}
                  >
                    &gt;
                  </div>
                </div>
              </div>
            </div>
            <div className="blockBody">
              <div className="withRow blockBodyRow">
                <div className="blockDetailKey">区块哈希:</div>
                <div
                  className="blockDetailValue withRowLeftAuto"
                  style={{ fontSize: 16 }}
                >
                  {data && data.hash}
                </div>
              </div>
              <div className="withRow blockBodyRow">
                <div className="blockDetailKey">时间戳:</div>
                <div
                  className="blockDetailValue withRowLeftAuto"
                  style={{ fontSize: 16 }}
                >
                  {data && data.header.timestamp
                    ? format(data.header.timestamp, 'YYYY/MM/DD HH:mm:ss')
                    : ''}
                </div>
              </div>
              <div className="withRow blockBodyRow">
                <div className="blockDetailKey">交易数:</div>
                <div className="blockDetailValue withRowLeftAuto">
                  {data && data.body.transactions.length}
                </div>
              </div>
              <div className="withRow blockBodyRow">
                <div className="blockDetailKey">Proposer:</div>
                <div
                  className="blockDetailValue withRowLeftAuto"
                  style={{ fontSize: 16 }}
                >
                  {data && data.header.proposer}
                </div>
              </div>
              <div className="withRow blockBodyRow">
                <div className="blockDetailKey">消耗的 Quota:</div>
                <div className="blockDetailValue withRowLeftAuto">
                  {data && parseInt(data.header.quotaUsed)}
                </div>
              </div>
              <div className="withRow blockBodyRow">
                <div className="blockDetailKey">Quota 价格:</div>
                <div className="blockDetailValue withRowLeftAuto">
                  1&nbsp;
                  {self.props.network.metaData &&
                    self.props.network.metaData.tokenSymbol}
                  &nbsp; = {self.props.network.quotaPrice} Quota
                </div>
              </div>
              <div className="withRow blockBodyRow">
                <div className="blockDetailKey">Total handling fee:</div>
                <div className="blockDetailValue withRowLeftAuto">
                  {data &&
                    data.header.quotaUsed &&
                    self.props.network.quotaPrice &&
                    valueFormat(
                      toHex(scientificNotationToString(data.header.quotaUsed)),
                      self.props.network.metaData &&
                        self.props.network.metaData.tokenSymbol,
                      self.props.network.quotaPrice
                    )}
                </div>
              </div>
              <div className="withRow blockBodyRow">
                <div className="blockDetailKey">上一块哈希:</div>
                <div
                  className="blockDetailValue withRowLeftAuto operationItem"
                  style={{ fontSize: 16, color: '#5b8ee6' }}
                  onClick={() => {
                    if (data && data.header.prevHash)
                      hashHistory.push('/block/hash/' + data.header.prevHash)
                  }}
                >
                  {data && data.header.prevHash}
                </div>
              </div>
              <div className="withRow blockBodyRow">
                <div className="blockDetailKey">Receipts Root:</div>
                <div
                  className="blockDetailValue withRowLeftAuto"
                  style={{ fontSize: 16 }}
                >
                  {data && data.header.receiptsRoot}
                </div>
              </div>
              <div className="withRow blockBodyRow">
                <div className="blockDetailKey">State Root:</div>
                <div
                  className="blockDetailValue withRowLeftAuto"
                  style={{ fontSize: 16 }}
                >
                  {data && data.header.stateRoot}
                </div>
              </div>
              <div className="withRow blockBodyRow">
                <div className="blockDetailKey">Transactions Root:</div>
                <div
                  className="blockDetailValue withRowLeftAuto"
                  style={{ fontSize: 16 }}
                >
                  {data && data.header.transactionsRoot}
                </div>
              </div>
              {data &&
              data.body &&
              data.body.transactions &&
              data.body.transactions.length > 0 ? (
                <div
                  className="withRow blockBodyRow"
                  style={{ height: 'auto' }}
                >
                  <div className="blockDetailKey">Transactions List:</div>
                  <div
                    className="blockDetailValue withRowLeftAuto"
                    style={{ fontSize: 16 }}
                  >
                    {data.body.transactions.map((hash: string, i: number) => {
                      return (
                        <div
                          className="operationItem"
                          style={{
                            marginTop: 5,
                            fontSize: 16,
                            color: '#5b8ee6'
                          }}
                          onClick={() => {
                            if (hash)
                              hashHistory.push('/transaction/hash/' + hash)
                          }}
                        >
                          <span
                            style={{
                              display: 'inline-block',
                              width: 40,
                              color: '#47484a'
                            }}
                          >
                            [{i + 1}]
                          </span>
                          {hash}
                        </div>
                      )
                    })}
                  </div>
                </div>
              ) : null}
            </div>
          </div>
        </div>
      </Content>
    )
  }
}
import { injectIntl } from 'react-intl'
import { bindActionCreators } from 'redux'
import * as appAction from '../../redux/actions/appAction'
import * as blockAction from '../../redux/actions/block'

import { IRootState } from '../../redux/states'
import { connect } from 'react-redux'

export default connect(
  (state: IRootState) => ({
    app: state.app,
    block: state.block,
    network: state.network
  }),
  dispatch => ({
    appAction: bindActionCreators(appAction, dispatch),
    blockAction: bindActionCreators(blockAction, dispatch)
  })
)(injectIntl(BlockDetail))
