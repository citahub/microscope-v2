import * as React from 'react'
import './list.styl'
import Layout from '../../components/layout'
import Content from '../../components/content'
import CustomHeader from '../common/customHeader'
import CustomFooter from '../common/customFooter'

import TransactionTable from '../common/transactionTable'

import { hashHistory } from 'react-router';



class TransitionList  extends React.Component<any,any> {
  componentDidMount(){
    var self = this;
    var params = self.props.location.query;
    var pageNum = params.pageNum ? parseInt(params.pageNum): 1
    self.props.transactionAction.getTransactionList(pageNum,10);
  }
  componentWillReceiveProps(nextProps:any){
    var self = this;
    if(JSON.stringify(nextProps.location.query) !== JSON.stringify(this.props.location.query)){
      var params = nextProps.location.query;
      var pageNum = params.pageNum ? parseInt(params.pageNum): 1;
      self.props.transactionAction.getTransactionList(pageNum,10);
    }
  }
  render() {
    var self = this;
    var data = self.props.transaction.list;
    var globalTickTime = self.props.app.globalTickTime;
    return (
      <Layout className='transactionList' bgColor='white'>
        <Content style={{ width: '100%', height: '100%' }}>
          <CustomHeader/>
          <div style={{ width: '100%', backgroundImage: 'url("./images/list_bg.png")', backgroundRepeat: 'no-repeat', paddingTop: 75, paddingBottom: 98}}>
            <div className="container transactionListBody" style={{ minHeight: 690, paddingTop: 47 }}>
              <div className='withRow' style={{ height: 36, paddingLeft: 24, paddingRight: 20 }}>
                <div className='withRowLeftAuto' style={{ color: '#868b92', fontSize: 14 }}>
                  当前搜索参数: ??
                </div>
                <div className='queryButton'>
                  高级选择器
                </div>
              </div>
              <TransactionTable data={data} globalTickTime={globalTickTime} onChange={(page:number)=>{  hashHistory.push('/transaction/list?pageNum=' + page)}}/>
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
import * as transactionAction from '../../redux/actions/transaction'

import { IRootState } from '../../redux/states'
import { connect } from 'react-redux'

export default connect( (state:IRootState)=> ({app: state.app, transaction: state.transaction}), dispatch => ({
  appAction: bindActionCreators(appAction, dispatch),
  transactionAction: bindActionCreators(transactionAction, dispatch),
}))(injectIntl(TransitionList))
