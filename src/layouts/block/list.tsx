import * as React from 'react'
import './list.styl'
import Layout from '../../components/layout'
import Content from '../../components/content'
import CustomHeader from '../common/customHeader'
import CustomFooter from '../common/customFooter'

import { hashHistory } from 'react-router';
import { timePassed } from '../../utils/time'

// import * as cacheAPI from '../../utils/cacheAPI';

import Pagination from 'rc-pagination'
import 'rc-pagination/assets/index.css';

class BlockList  extends React.Component<any,any> {
  componentDidMount(){
    var self = this;
    var params = self.props.location.query;
    var pageNum = params.pageNum ? parseInt(params.pageNum): 1
    self.props.blockAction.getBlockList(pageNum,10);
  }
  componentWillReceiveProps(nextProps:any){
    var self = this;
    if(JSON.stringify(nextProps.location.query) !== JSON.stringify(this.props.location.query)){
      var params = nextProps.location.query;
      var pageNum = params.pageNum ? parseInt(params.pageNum): 1;
      self.props.blockAction.getBlockList(pageNum,10);
    }
  }
  render() {
    var self = this;
    var data = self.props.block.list;
    var globalTickTime = self.props.app.globalTickTime;

    return (
      <Layout className='blockList' bgColor='white'>
        <Content style={{ width: '100%', height: '100%' }}>
          <CustomHeader/>
          <div style={{ width: '100%', backgroundImage: 'url("./images/list_bg.png")', backgroundRepeat: 'no-repeat', paddingTop: 75, paddingBottom: 98}}>
            <div className="container blockListBody" style={{ minHeight: 690, paddingTop: 47 }}>
              <div className='withRow' style={{ height: 36, paddingLeft: 24, paddingRight: 20 }}>
                <div className='withRowLeftAuto' style={{ color: '#868b92', fontSize: 14 }}>
                  当前搜索参数: ??
                </div>
                <div className='queryButton'>
                  高级选择器
                </div>
              </div>
              <div style={{ padding: "14px 23px 0 23px" }}>
                <table className="table table-hover" style={{ tableLayout: 'fixed'}} >
                  <thead style={{ backgroundColor: "#fafbff" }}>
                      <th style={{ width: 232/1154 * 100 +"%"}} scope="col">高度</th>
                      <th style={{ width: (591-232)/1154 * 100 +"%"}} scope="col">哈希</th>
                      <th style={{ width: (815-591)/1154 * 100 +"%"}} scope="col">出块时间</th>
                      <th style={{ width: (995-815)/1154 * 100 +"%"}} scope="col">交易数</th>
                      <th scope="col">Quota消耗</th>
                  </thead>
                  <tbody>
                  {
                  data.list && data.list.map(function(d:any, i:number){
                    return (
                      <tr key={i}>
                        <td className='blockNumberTd operationItem'  onClick={()=>{hashHistory.push("/block/id/" + parseInt(d.header.number))}}>{parseInt(d.header.number)}</td>
                        <td>
                          <div className='blockHashTd operationItem' onClick={()=>{hashHistory.push("/block/hash/" + d.hash)}}>{d.hash}</div>
                        </td>
                        <td className='blockTimestampTd'>{timePassed( globalTickTime - d.header.timestamp )}</td>
                        <td className='blockTransactionCountTd'>{d.transactionsCount}</td>
                        <td className='blockQuotaUsedTd'>{d.header.quotaUsed}</td>
                      </tr>
                    )
                  })
                }
                  </tbody>
                </table>
                <div style={{ float: 'right'}}>
                  <Pagination onChange={(page:number)=>{
                    hashHistory.push('/block/list?pageNum=' + page)
                  }} current={data.pageNum} total={ data.total } />
                </div>
              </div>
            </div>
          </div>

          <CustomFooter/>
        </Content>
      </Layout>
    );
  }
}
import {injectIntl} from 'react-intl';
import { bindActionCreators } from 'redux'
import * as appAction from '../../redux/actions/appAction'
import * as blockAction from '../../redux/actions/block'
import { IRootState } from '../../redux/states'
import { connect } from 'react-redux'

export default connect( (state:IRootState)=> ({app: state.app,block:state.block}), dispatch => ({
  appAction: bindActionCreators(appAction, dispatch),
  blockAction: bindActionCreators(blockAction, dispatch),
}))(injectIntl(BlockList))
