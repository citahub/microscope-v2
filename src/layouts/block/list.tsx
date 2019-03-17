import React from 'react'
import './list.styl'
import Layout from '../../components/layout'
import Header from '../common/Header'
import Footer from '../common/Footer'

import BlockSearchModal from '../common/blockSearchModal'

import { hashHistory } from 'react-router'
import { timePassed } from '../../utils/time'
import { valueFormat } from '../../utils/hex'

// import * as cacheAPI from '../../utils/cacheAPI';

import Pagination from 'rc-pagination'
import 'rc-pagination/assets/index.css'
import Select from 'rc-select'
import 'rc-select/assets/index.css'

class BlockList extends React.Component<any, any> {
  componentDidMount() {
    var self = this
    var params = self.props.location.query
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
    if (
      JSON.stringify(nextProps.location.query) !==
      JSON.stringify(this.props.location.query)
    ) {
      var params = nextProps.location.query
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
    var data = self.props.block.list
    var globalTickTime = self.props.app.globalTickTime

    return (
      <Layout className="blockList" bgColor="white">
        <Header location={self.props.location} app={self.props.app} />
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
                className="withRowLeftAuto"
                style={{ color: '#868b92', fontSize: 14 }}
              >
                当前搜索参数:<br/>  
                blockFrom: {self.props.block.list.blockFrom}
                blockTo: {self.props.block.list.blockTo}
                transactionCountMin: {self.props.block.list.transactionCountMin} 
                transactionCountMax: {self.props.block.list.transactionCountMax}
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
                      from: self.props.block.list.blockFrom,
                      to: self.props.block.list.blockTo,
                      min: self.props.block.list.transactionCountMin,
                      max: self.props.block.list.transactionCountMax,
                      appAction: self.props.appAction
                    }
                  })
                }}
              >
                高级选择器
              </div>
            </div>
            <div className='tableWrapper' style={{ padding: '14px 23px 0 23px' }}>
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
                    高度
                  </th>
                  <th
                    className="text-center"
                    style={{ width: ((591 - 232) / 1154) * 100 + '%' }}
                    scope="col"
                  >
                    哈希
                  </th>
                  <th
                    className="text-center"
                    style={{ width: ((815 - 591) / 1154) * 100 + '%' }}
                    scope="col"
                  >
                    出块时间
                  </th>
                  <th
                    className="text-center"
                    style={{ width: ((995 - 815) / 1154) * 100 + '%' }}
                    scope="col"
                  >
                    交易数
                  </th>
                  <th className="text-center" scope="col">
                    Quota消耗
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
                              {d.hash}
                            </div>
                          </td>
                          <td className="text-center blockTimestampTd">
                            {timePassed(globalTickTime - d.header.timestamp)}
                          </td>
                          <td className="text-center blockTransactionCountTd">
                            {d.transactionsCount}
                          </td>
                          <td className="text-center blockQuotaUsedTd">
                            {valueFormat(d.header.quotaUsed)}
                          </td>
                        </tr>
                      )
                    })}
                </tbody>
              </table>
              <div style={{ float: 'right' }}>
                <Pagination
                  selectComponentClass={Select}
                  current={data.pageNum}
                  total={data.total}
                  showQuickJumper={{ goButton: <button>确定</button> }}
                  defaultPageSize={data.pageSize}
                  showSizeChanger={true}
                  onShowSizeChange={(page: number, pageSize: number) => {
                    hashHistory.push(
                      '/block/list?pageNum=' +
                        page +
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
                  onChange={(page: number, pageSize: number) => {
                    hashHistory.push(
                      '/block/list?pageNum=' +
                        page +
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
                />
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
)(injectIntl(BlockList))
