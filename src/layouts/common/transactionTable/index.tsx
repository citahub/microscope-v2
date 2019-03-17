import React from 'react'
import './index.styl'
import Pagination from 'rc-pagination'
import 'rc-pagination/assets/index.css'
import Select from 'rc-select'
import 'rc-select/assets/index.css'

import { timePassed } from '../../../utils/time'
import { valueFormat } from '../../../utils/hex'
import { hashHistory } from 'react-router'

class TransactionTable extends React.Component<any, any> {
  componentDidMount() {}
  render() {
    var self = this
    var data = self.props.data
    var globalTickTime = self.props.globalTickTime
    return (
      <div className="transactionTable tableWrapper">
        <table className="table table-hover" style={{ tableLayout: 'fixed' }}>
          <thead style={{ backgroundColor: '#fafbff' }}>
            <th
              className="text-center"
              style={{ width: (157 / 1154) * 100 + '%' }}
              scope="col"
            >
              交易类型
            </th>
            <th
              className="text-center"
              style={{ width: ((312 - 157) / 1154) * 100 + '%' }}
              scope="col"
            >
              哈希
            </th>
            <th
              className="text-center"
              style={{ width: ((476 - 312) / 1154) * 100 + '%' }}
              scope="col"
            >
              从
            </th>
            <th
              className="text-center"
              style={{ width: ((623 - 476) / 1154) * 100 + '%' }}
              scope="col"
            >
              至
            </th>
            <th
              className="text-center"
              style={{ width: ((789 - 623) / 1154) * 100 + '%' }}
              scope="col"
            >
              价值
            </th>
            <th
              className="text-center"
              style={{ width: ((897 - 789) / 1154) * 100 + '%' }}
              scope="col"
            >
              高度
            </th>
            <th
              className="text-center"
              style={{ width: ((981 - 815) / 1154) * 100 + '%' }}
              scope="col"
            >
              消耗的 Quota
            </th>
            <th className="text-center" scope="col">
              时间
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
                        {d.hash}
                      </div>
                    </td>
                    <td>
                      <div
                        className="text-center transactionFromTd operationItem"
                        onClick={() => {
                          hashHistory.push('/account/' + d.from)
                        }}
                      >
                        {d.from}
                      </div>
                    </td>
                    <td>
                      <div
                        className="text-center transactionToTd operationItem"
                        onClick={() => {
                          hashHistory.push('/account/' + d.to)
                        }}
                      >
                        {d.to}
                      </div>
                    </td>
                    <td className="text-center transactionValueTd">
                      {valueFormat(d.value)}
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
        <div style={{ float: 'right' }}>
          <Pagination
            selectComponentClass={Select}
            current={data.pageNum}
            total={data.total}
            showQuickJumper={{ goButton: <button>确定</button> }}
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
      </div>
    )
  }
}
export default TransactionTable
