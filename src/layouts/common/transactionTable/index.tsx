import React from 'react'
import './index.styl'
import Pagination from 'rc-pagination'
import 'rc-pagination/assets/index.css'
import Select from 'rc-select'
import 'rc-select/assets/index.css'

import { timePassed } from '../../../utils/time'
import { valueFormat } from '../../../utils/hex'
import hashHistory from '../../../routes/history'

class TransactionTable extends React.Component<any, any> {
  componentDidMount() {}
  render() {
    var self = this
    var intl = self.props.intl
    var data = self.props.data
    var globalTickTime = self.props.globalTickTime
    return (
      <>
        <div className="transactionTable tableWrapper">
          <table className="table table-hover" style={{ tableLayout: 'fixed' }}>
            <thead style={{ backgroundColor: '#fafbff' }}>
              <th
                className="text-center"
                style={{ width: (157 / 1154) * 100 + '%' }}
                scope="col"
              >
                {intl.formatMessage({
                  id: 'app.pages.common.transactiontable.header.type'
                })}
              </th>
              <th
                className="text-center"
                style={{ width: ((312 - 157) / 1154) * 100 + '%' }}
                scope="col"
              >
                {intl.formatMessage({
                  id: 'app.pages.common.transactiontable.header.hash'
                })}
              </th>
              <th
                className="text-center"
                style={{ width: ((476 - 312) / 1154) * 100 + '%' }}
                scope="col"
              >
                {intl.formatMessage({
                  id: 'app.pages.common.transactiontable.header.from'
                })}
              </th>
              <th
                className="text-center"
                style={{ width: ((623 - 476) / 1154) * 100 + '%' }}
                scope="col"
              >
                {intl.formatMessage({
                  id: 'app.pages.common.transactiontable.header.to'
                })}
              </th>
              <th
                className="text-center"
                style={{ width: ((769 - 623) / 1154) * 100 + '%' }}
                scope="col"
              >
                {intl.formatMessage({
                  id: 'app.pages.common.transactiontable.header.value'
                })}
              </th>
              <th
                className="text-center"
                style={{ width: ((897 - 769) / 1154) * 100 + '%' }}
                scope="col"
              >
                {intl.formatMessage({
                  id: 'app.pages.common.transactiontable.header.blockheight'
                })}
              </th>
              <th
                className="text-center"
                style={{ width: ((981 - 815) / 1154) * 100 + '%' }}
                scope="col"
              >
                {intl.formatMessage({
                  id: 'app.pages.common.transactiontable.header.quotaused'
                })}
              </th>
              <th className="text-center" scope="col">
                {intl.formatMessage({
                  id: 'app.pages.common.transactiontable.header.timestamp'
                })}
              </th>
            </thead>
            <tbody>
              {data.list &&
                data.list.map(function(d: any, i: number) {
                  var subData =
                    (d &&
                      d.unsignedTransaction &&
                      d.unsignedTransaction.transaction &&
                      d.unsignedTransaction.transaction.data) ||
                    ''
                  return (
                    <tr key={i}>
                      <td className="text-center transactionTypeTd">
                        {!d.to
                          ? 'Contract Creation'
                          : subData && subData.replace(/^0x/, '')
                          ? 'Contract Call'
                          : 'Exchange'}
                        {d.errorMessage ? (
                          <span style={{ color: '#ff8181' }}>✖</span>
                        ) : (
                          ''
                        )}
                      </td>
                      <td>
                        <div
                          className="text-center transactionHashTd operationItem"
                          onClick={() => {
                            hashHistory.push('/transaction/hash/' + d.hash)
                          }}
                        >
                          <span className="hash">{d.hash}</span>
                        </div>
                      </td>
                      <td>
                        <div
                          className="text-center transactionFromTd operationItem"
                          onClick={() => {
                            hashHistory.push('/account/' + d.from)
                          }}
                        >
                          <span className="hash">{d.from}</span>
                        </div>
                      </td>
                      <td>
                        <div
                          className="text-center transactionToTd operationItem"
                          onClick={() => {
                            hashHistory.push('/account/' + d.to)
                          }}
                        >
                          <span className="hash">{d.to}</span>
                        </div>
                      </td>
                      <td className="text-center transactionValueTd">
                        {valueFormat(
                          d.value,
                          self.props.network.metaData &&
                            self.props.network.metaData.tokenSymbol,
                          self.props.network.quotaPrice
                        )}
                      </td>
                      <td>
                        <div className="text-center transactionBlockNumberTd">
                          {parseInt(d.blockNumber)}
                        </div>
                      </td>
                      <td className="text-center transactionQuotaUsedTd">
                        {parseInt(d.quotaUsed)}
                      </td>
                      <td className="text-center transactionTimestampTd">
                        {timePassed(globalTickTime - d.timestamp)}
                      </td>
                    </tr>
                  )
                })}
            </tbody>
          </table>
        </div>
        <div
          style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 10 }}
        >
          <Pagination
            locale={JSON.parse(intl.messages['app.pages.common.pagination'])}
            selectComponentClass={Select}
            current={data.pageNum}
            total={data.total}
            showQuickJumper={true}
            defaultPageSize={data.pageSize}
            showSizeChanger={true}
            onShowSizeChange={(current: number, pageSize: number) => {
              self.props.onChange(current, pageSize)
            }}
            onChange={(current: number, pageSize: number) => {
              self.props.onChange(current, pageSize)
            }}
          />
        </div>
      </>
    )
  }
}
export default TransactionTable
