import * as React from 'react'
import './index.styl'
import Pagination from 'rc-pagination'
import 'rc-pagination/assets/index.css';

import { timePassed } from '../../../utils/time'
import { hashHistory } from 'react-router';

class TransactionTable  extends React.Component<any,any> {
  componentDidMount(){

  }
  render() {
    var self = this;
    var data = self.props.data;
    var globalTickTime = self.props.globalTickTime;
    return (
      <div className='transactionTable' style={{ padding: "14px 23px 0 23px" }}>
        <table className="table table-hover" style={{ tableLayout: 'fixed'}} >
          <thead style={{ backgroundColor: "#fafbff" }}>
              <th style={{ width: 157/1154 * 100 +"%"}} scope="col">交易类型</th>
              <th style={{ width: (312-157)/1154 * 100 +"%"}} scope="col">哈希</th>
              <th style={{ width: (476-312)/1154 * 100 +"%"}} scope="col">从</th>
              <th style={{ width: (623-476)/1154 * 100 +"%"}} scope="col">至</th>
              <th style={{ width: (789-623)/1154 * 100 +"%"}} scope="col">代币值</th>
              <th style={{ width: (897-789)/1154 * 100 +"%"}} scope="col">高度</th>
              <th style={{ width: (981-815)/1154 * 100 +"%"}} scope="col">使用的配额</th>
              <th scope="col">时间</th>
          </thead>
          <tbody>
          {
          data.list && data.list.map(function(d:any, i:number){
            return (
              <tr key={i}>
                <td className='transactionTypeTd'>{d.type}</td>
                <td>
                  <div className='transactionHashTd operationItem' onClick={()=>{hashHistory.push("/transaction/hash/"+d.hash)}}>{d.hash}</div>
                </td>
                <td>
                  <div className='transactionFromTd operationItem'  onClick={()=>{hashHistory.push("/account/"+d.from)}}>{d.from}</div>
                </td>
                <td>
                  <div className='transactionToTd operationItem'  onClick={()=>{hashHistory.push("/account/"+d.to)}}>{d.to}</div>
                </td>
                <td className='transactionValueTd'>{parseInt(d.gasUsed)}</td>
                <td>
                  <div className='transactionBlockNumberTd'>{parseInt(d.blockNumber)}</div>
                </td>
                <td className='transactionQuotaUsedTd'>{parseInt(d.quotaUsed)}</td>
                <td className='transactionTimestampTd'>{timePassed( globalTickTime - d.timestamp )}</td>
              </tr>
            )
          })
        }
          </tbody>
        </table>
        <div style={{ float: 'right'}}>
          <Pagination onChange={(page:number)=>{
            self.props.onChange(page);
          }} current={data.pageNum} total={ data.total } />
        </div>
      </div>
    );
  }
}
export default TransactionTable;
