import React from 'react'
import './list.styl'
import Content from '../../components/content'

import BlockSearchModal from '../common/blockSearchModal'

import hashHistory from '../../routes/history'
import { timePassed } from '../../utils/time'
import { valueFormat } from '../../utils/hex'
import queryString from 'query-string'

class BlockList extends React.Component<any, any> {
  componentDidMount() {
    var self = this
    var params: any = queryString.parse(self.props.location.search)
    console.log(params)
    var pageNum = params.pageNum ? parseInt(params.pageNum) : 1
    var pageSize = params.pageSize ? parseInt(params.pageSize) : 10
    var blockFrom = params.blockFrom || ''
    var blockTo = params.blockTo || ''
    var transactionCountMin = params.transactionCountMin || ''
    var transactionCountMax = params.transactionCountMax || ''

    self.props.blockAction.getBlockList(
      pageNum,
      pageSize,
      blockFrom,
      blockTo,
      transactionCountMin,
      transactionCountMax
    )
  }
  componentWillReceiveProps(nextProps: any) {
    var self = this
    if (nextProps.location.search !== this.props.location.search) {
      var params: any = queryString.parse(nextProps.location.search)
      var pageNum = params.pageNum ? parseInt(params.pageNum) : 1
      var pageSize = params.pageSize ? parseInt(params.pageSize) : 10
      var blockFrom = params.blockFrom || ''
      var blockTo = params.blockTo || ''
      var transactionCountMin = params.transactionCountMin || ''
      var transactionCountMax = params.transactionCountMax || ''
      self.props.blockAction.getBlockList(
        pageNum,
        pageSize,
        blockFrom,
        blockTo,
        transactionCountMin,
        transactionCountMax
      )
    }
  }
  render() {
    var self = this
    var intl = self.props.intl
    var data = self.props.block.list
    var globalTickTime = self.props.app.globalTickTime
    var params: any = queryString.parse(self.props.location.search)
    var pageNum = params.pageNum ? parseInt(params.pageNum) : 1
    var pageSize = params.pageSize ? parseInt(params.pageSize) : 10
    var blockFrom = params.blockFrom || ''
    var blockTo = params.blockTo || ''
    var transactionCountMin = params.transactionCountMin || ''
    var transactionCountMax = params.transactionCountMax || ''
    var hasPrev = pageNum > 1
    var hasNext = data && data.list && data.list.length == pageSize
    return (
      <Content className="blockList" bgColor="white">
        <div
          style={{
            width: '100%',
            backgroundImage: 'url("./images/list_bg.png")',
            backgroundRepeat: 'no-repeat',
            paddingTop: 75,
            paddingBottom: 98
          }}
        >
          <div
            className="container blockListBody"
            style={{ minHeight: 690, paddingTop: 47 }}
          >
            <div
              className="withRow"
              style={{ minHeight: 36, paddingLeft: 24, paddingRight: 20 }}
            >
              <div
                className="queryConditoin withRowLeftAuto"
                style={{ color: '#868b92', fontSize: 14 }}
              >
                {intl.formatMessage(
                  { id: 'app.pages.blocklist.search.parameters' },
                  {
                    blockFrom: blockFrom,
                    blockTo: blockTo,
                    transactionCountMin: transactionCountMin,
                    transactionCountMax: transactionCountMax
                  }
                )}
              </div>
              <div
                className="queryButton operationItem"
                onClick={() => {
                  self.props.appAction.showModal({
                    ui: BlockSearchModal,
                    uiProps: {
                      style: {
                        width: '60%'
                      },
                      from: blockFrom,
                      to: blockTo,
                      min: transactionCountMin,
                      max: transactionCountMax,
                      appAction: self.props.appAction,
                      intl: intl
                    }
                  })
                }}
              >
                {intl.formatMessage({
                  id: 'app.pages.blocklist.search.button'
                })}
              </div>
            </div>
            <div
              className="tableWrapper"
              style={{ padding: '14px 23px 0 23px', minHeight: 690 - 36 }}
            >
              <table
                className="table table-hover"
                style={{ tableLayout: 'fixed' }}
              >
                <thead style={{ backgroundColor: '#fafbff' }}>
                  <th
                    className="text-center"
                    style={{ width: (232 / 1154) * 100 + '%' }}
                    scope="col"
                  >
                    {intl.formatMessage({
                      id: 'app.pages.blocklist.table.header.height'
                    })}
                  </th>
                  <th
                    className="text-center"
                    style={{ width: ((591 - 232) / 1154) * 100 + '%' }}
                    scope="col"
                  >
                    {intl.formatMessage({
                      id: 'app.pages.blocklist.table.header.hash'
                    })}
                  </th>
                  <th
                    className="text-center"
                    style={{ width: ((815 - 591) / 1154) * 100 + '%' }}
                    scope="col"
                  >
                    {intl.formatMessage({
                      id: 'app.pages.blocklist.table.header.timestamp'
                    })}
                  </th>
                  <th
                    className="text-center"
                    style={{ width: ((995 - 815) / 1154) * 100 + '%' }}
                    scope="col"
                  >
                    {intl.formatMessage({
                      id: 'app.pages.blocklist.table.header.txcount'
                    })}
                  </th>
                  <th className="text-center" scope="col">
                    {intl.formatMessage({
                      id: 'app.pages.blocklist.table.header.quotaused'
                    })}
                  </th>
                </thead>
                <tbody>
                  {data.list &&
                    data.list.map(function(d: any, i: number) {
                      return (
                        <tr key={i}>
                          <td
                            className="text-center blockNumberTd operationItem"
                            onClick={() => {
                              hashHistory.push(
                                '/block/id/' + parseInt(d.header.number)
                              )
                            }}
                          >
                            {parseInt(d.header.number)}
                          </td>
                          <td>
                            <div
                              className="text-center blockHashTd operationItem"
                              onClick={() => {
                                hashHistory.push('/block/hash/' + d.hash)
                              }}
                            >
                              <span className="hash">{d.hash}</span>
                            </div>
                          </td>
                          <td className="text-center blockTimestampTd">
                            {timePassed(globalTickTime - d.header.timestamp)}
                          </td>
                          <td className="text-center blockTransactionCountTd">
                            {d.transactionsCount}
                          </td>
                          <td className="text-center blockQuotaUsedTd">
                            {valueFormat(
                              d.header.quotaUsed,
                              self.props.network.metaData &&
                                self.props.network.metaData.tokenSymbol,
                              self.props.network.quotaPrice
                            )}
                          </td>
                        </tr>
                      )
                    })}
                </tbody>
              </table>
              <div style={{ float: 'right' }}>
                <ul className="rc-pagination ">
                  {hasPrev ? (
                    <li
                      className="rc-pagination-disabled rc-pagination-prev"
                      aria-disabled="false"
                      onClick={() => {
                        hashHistory.push(
                          '/block/list?pageNum=' +
                            (pageNum - 1) +
                            '&pageSize=' +
                            pageSize +
                            '&blockFrom=' +
                            self.props.block.list.blockFrom +
                            '&blockTo=' +
                            self.props.block.list.blockTo +
                            '&transactionCountMin=' +
                            self.props.block.list.transactionCountMin +
                            '&transactionCountMax=' +
                            self.props.block.list.transactionCountMax
                        )
                      }}
                    >
                      <a className="rc-pagination-item-link" />
                    </li>
                  ) : null}
                  {hasNext ? (
                    <li
                      className=" rc-pagination-next"
                      aria-disabled="false"
                      onClick={() => {
                        hashHistory.push(
                          '/block/list?pageNum=' +
                            (pageNum + 1) +
                            '&pageSize=' +
                            pageSize +
                            '&blockFrom=' +
                            self.props.block.list.blockFrom +
                            '&blockTo=' +
                            self.props.block.list.blockTo +
                            '&transactionCountMin=' +
                            self.props.block.list.transactionCountMin +
                            '&transactionCountMax=' +
                            self.props.block.list.transactionCountMax
                        )
                      }}
                    >
                      <a className="rc-pagination-item-link" />
                    </li>
                  ) : (
                    false
                  )}
                </ul>
              </div>
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
    network: state.network,
    block: state.block
  }),
  dispatch => ({
    appAction: bindActionCreators(appAction, dispatch),
    blockAction: bindActionCreators(blockAction, dispatch)
  })
)(injectIntl(BlockList))
