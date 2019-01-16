import * as React from 'react'
import './detail.styl'
import Layout from '../../components/layout'
import Content from '../../components/content'
import CustomHeader from '../common/customHeader'
import CustomFooter from '../common/customFooter'
import TransactionTable from '../common/transactionTable'

import { hashHistory } from 'react-router';



class AccountDetail  extends React.Component<any,any> {

  componentDidMount(){
    var self = this;
    var address = self.props.params.address;
    var params = self.props.location.query;
    var pageNum = params.pageNum ? parseInt(params.pageNum): 1
    self.props.accountAction.getTransactionListByAccount(address,pageNum,10)
  }
  componentWillReceiveProps(nextProps:any){
    var self = this;
    var address = self.props.params.address;
    var pageNum = parseInt(self.props.location.query.pageNum) || 1;
    var fetchData = false;
    if(nextProps.params.address !== self.props.params.address){
      address = nextProps.params.address;
      fetchData = true;
    }
    if(JSON.stringify(nextProps.location.query) !== JSON.stringify(this.props.location.query)){
      var params = nextProps.location.query;
      pageNum = params.pageNum ? parseInt(params.pageNum): 1;
      fetchData = true
    }
    if(fetchData){
      self.props.accountAction.getTransactionListByAccount(address,pageNum,10)
    }
  }
  render() {
    var self = this;
    var account = self.props.params.address;
    var data = self.props.account.trList;
    var globalTickTime = self.props.app.globalTickTime;
    return (
      <Layout className='accountDetail' bgColor='#fbfbfb'>
        <Content style={{ width: '100%', height: '100%' }}>
          <CustomHeader/>
          <div style={{ width: '100%', backgroundImage: 'url("./images/list_bg.png")', backgroundRepeat: 'no-repeat', paddingTop: 96, paddingBottom: 85}}>
            <div className='container'>
              <div className='accountNav row'>
                <div className='col-6'>
                  account: # {account}
                </div>
                <div className='col-6'>
                  Balance: #
                </div>

              </div>
              <div  className='accountBody'>
                <TransactionTable data={data} globalTickTime={globalTickTime} onChange={(page:number)=>{  hashHistory.push('/account/'+ account+ '?pageNum=' + page)}}/>
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
import * as accountAction from '../../redux/actions/account'

import { IRootState } from '../../redux/states'
import { connect } from 'react-redux'

export default connect( (state:IRootState)=> ({app: state.app, account: state.account}), dispatch => ({
  appAction: bindActionCreators(appAction, dispatch),
  accountAction: bindActionCreators(accountAction, dispatch)
}))(injectIntl(AccountDetail))
