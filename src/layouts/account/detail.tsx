import  React from 'react'
import './detail.styl'
import Layout from '../../components/layout'
import Content from '../../components/content'
import Tabs, { Tab } from '../../components/tab'
import CustomHeader from '../common/customHeader'
import CustomFooter from '../common/customFooter'
import TransactionTable from '../common/transactionTable'

import { hashHistory } from 'react-router';

import { valueFormat } from '../../utils/hex'


class AccountDetail  extends React.Component<any,any> {

  componentDidMount(){
    var self = this;
    var address = self.props.params.address;
    var params = self.props.location.query;
    var pageNum = params.pageNum ? parseInt(params.pageNum): 1;
    var pageSize = params.pageSize ? parseInt(params.pageSize): 10;

    if(!self.props.network.metaData)self.props.networkAction.getMetaData();

    self.props.accountAction.getBalance(address)

    // var tabIndex = params.tabIndex ? parseInt(params.tabIndex): 0;
    // if(tabIndex == 0){
    self.props.accountAction.getTransactionListByAccount(address,pageNum,pageSize)
    // } else{
    self.props.accountAction.getERC20TransactionListByAccount(address,pageNum,pageSize)
    // }
  }
  componentWillReceiveProps(nextProps:any){
    var self = this;
    var address = self.props.params.address;
    var pageNum = parseInt(self.props.location.query.pageNum) || 1;
    var pageSize = parseInt(self.props.location.query.pageSize) || 10;
    var tabIndex = parseInt(self.props.location.query.tabIndex) ||  0;

    var fetchData = false;
    if(nextProps.params.address !== self.props.params.address){
      address = nextProps.params.address;
      self.props.accountAction.getBalance(address)
      fetchData = true;
    }
    if(JSON.stringify(nextProps.location.query) !== JSON.stringify(this.props.location.query)){
      var params = nextProps.location.query;
      pageNum = params.pageNum ? parseInt(params.pageNum): 1;
      pageSize = params.pageSize ? parseInt(params.pageSize): 10;
      tabIndex = params.tabIndex ? parseInt(params.tabIndex): 0;
      fetchData = true
    }
    if(fetchData){
      if(tabIndex == 0){
        self.props.accountAction.getTransactionListByAccount(address,pageNum,pageSize)
      } else{
        self.props.accountAction.getERC20TransactionListByAccount(address,pageNum,pageSize)
      }
    }
  }
  render() {
    var self = this;
    var account = self.props.params.address;
    var data = self.props.account.trList;
    var globalTickTime = self.props.app.globalTickTime;
    var erc20Data = self.props.account.erc20List;
    var params = self.props.location.query;
    var tabIndex = params.tabIndex ? parseInt(params.tabIndex): 0;
    var balance = self.props.account.balance;
    var metaData = self.props.network.metaData;

    return (
      <Layout className='accountDetail' bgColor='#fbfbfb'>
        <Content style={{ width: '100%', height: '100%' }}>
          <CustomHeader/>
          <div style={{ width: '100%', backgroundImage: 'url("./images/list_bg.png")', backgroundRepeat: 'no-repeat', paddingTop: 96, paddingBottom: 85}}>
            <div className='container'>
              <div className='row' style={{ marginLeft: -20, marginRight: -20 }}>
                <div className='col-6'>
                  <div className='accountNav'>
                    <div className='withRow'  style={{ height: 22 }}>
                      <div style={{ marginTop: 7,  width: 8, height: 8, backgroundColor: '#5b8ee6',WebkitBorderRadius: '50% 50%'}}></div>
                      <div style={{  marginLeft: 20, fontSize: 16, color: '#47484a' }}>account:</div>
                      <div style={{  marginLeft: 10, fontSize: 16, color: '#6f747a' }}> # {account}</div>
                    </div>
                  </div>
                </div>
                <div className='col-6'>
                  <div className='accountNav'>
                    <div className='withRow' style={{ height: 22 }}>
                      <div style={{ marginTop: 7, width: 8, height: 8, backgroundColor: '#3dd895',WebkitBorderRadius: '50% 50%'}}></div>
                      <div style={{ marginLeft: 20, fontSize: 16, color: '#47484a'  }}> Balance: </div>
                      <div style={{ marginLeft: 10, fontSize: 16, color: '#6f747a'  }}># {metaData? valueFormat(balance,metaData.tokenSymbol):valueFormat(balance)} </div>
                    </div>
                  </div>
                </div>

              </div>
              <Tabs style={{ marginTop: 50 }} headerWidthUnit="fixed" initIndex={tabIndex} onTabSwitchCallBack={(index:number)=>{
                hashHistory.push('/account/'+ account+ '?pageNum=' + 1 +'&pageSize=' + 10+ '&tabIndex='+index)
              }}>
                <Tab title={"普通(" + data.total+")"}>
                  <div  className='accountBody'>
                    <TransactionTable data={data} globalTickTime={globalTickTime} onChange={(pageNum:number, pageSize:number)=>{
                      hashHistory.push('/account/'+ account+ '?pageNum=' + pageNum +'&pageSize=' + pageSize+ '&tabIndex=0')
                    }}/>
                  </div>
                </Tab>
                <Tab title={"ERC20(" + erc20Data.total+")"}>
                  <div  className='accountBody'>
                    <TransactionTable data={erc20Data} globalTickTime={globalTickTime} onChange={(pageNum:number, pageSize:number)=>{
                      hashHistory.push('/account/'+ account+ '?pageNum=' + pageNum +'&pageSize=' + pageSize + '&tabIndex=1')
                    }}/>
                  </div>
                </Tab>
              </Tabs>

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
import * as networkAction from '../../redux/actions/network'

import { IRootState } from '../../redux/states'
import { connect } from 'react-redux'

export default connect( (state:IRootState)=> ({app: state.app, account: state.account, network: state.network}), dispatch => ({
  appAction: bindActionCreators(appAction, dispatch),
  networkAction: bindActionCreators(networkAction, dispatch),
  accountAction: bindActionCreators(accountAction, dispatch)
}))(injectIntl(AccountDetail))
