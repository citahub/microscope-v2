import React from 'react'
import './detail.styl'
import Layout from '../../components/layout'
import CustomHeader from '../common/customHeader'
import CustomFooter from '../common/customFooter'

import { hashHistory } from 'react-router'

import { format } from '../../utils/time'

class BlockDetail extends React.Component<any, any> {
  componentDidMount() {
    var self = this
    var params = self.props.params
    self.props.blockAction.getBlock(params.hash || params.id)
  }
  componentWillReceiveProps(nextProps: any) {
    var self = this
    if (
      JSON.stringify(nextProps.params) !== JSON.stringify(self.props.params)
    ) {
      self.props.blockAction.getBlock(
        nextProps.params.hash || nextProps.params.id
      )
    }
  }
  render() {
    var self = this
    var data = self.props.block.item
    return (
      <Layout className="blockDetail" bgColor="#fbfbfb">
        <CustomHeader />
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
                        self.props.params.id || (data && data.header.number)
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
                        self.props.params.id || (data && data.header.number)
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
                <div className="blockDetailKey">交易:</div>
                <div className="blockDetailValue withRowLeftAuto">
                  {data && data.body.transactions.length}
                </div>
              </div>
              <div className="withRow blockBodyRow">
                <div className="blockDetailKey">节点:</div>
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
                  {data && data.header.quotaUsed}
                </div>
              </div>
              <div className="withRow blockBodyRow">
                <div className="blockDetailKey">Quota 价格:</div>
                <div className="blockDetailValue withRowLeftAuto">
                  {data && data.header.quotaUsed}
                </div>
              </div>
              <div className="withRow blockBodyRow">
                <div className="blockDetailKey">Total handling fee:</div>
                <div className="blockDetailValue withRowLeftAuto">
                  {data && data.header.quotaUsed}
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
            </div>
          </div>
        </div>
        <CustomFooter />
      </Layout>
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
  (state: IRootState) => ({ app: state.app, block: state.block }),
  dispatch => ({
    appAction: bindActionCreators(appAction, dispatch),
    blockAction: bindActionCreators(blockAction, dispatch)
  })
)(injectIntl(BlockDetail))
