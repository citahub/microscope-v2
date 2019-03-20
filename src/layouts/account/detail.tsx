import React from 'react'
import './detail.styl'
import Layout from '../../components/layout'
import Tabs, { Tab } from '../../components/tab'
import Header from '../common/Header'
import Footer from '../common/Footer'
import TransactionTable from '../common/transactionTable'

import { hashHistory } from 'react-router'

import { valueFormat } from '../../utils/hex'
class TabContractInfoContent extends React.Component<any,any>{
  componentDidMount(){
    var self = this;
    var address = self.props.address;

    self.props.accountAction.getAbi(address)

  }
  render(){
    var self = this;
    var abi = self.props.abi;
    return (
      <div className='container contractTabInfo'>
        <div className='withRow'  style={{ marginTop: 20 }}>
          <div className='withRowLeftAuto'>合约ABI</div>
          <button
              style={{ width: 100 }}
              type="button"
              className="btn btn-primary"
              onClick={() => {
                var t=  document.getElementById('contractAbi') as HTMLTextAreaElement
                t.select()
                document.execCommand('copy')
              }}
            >
              Copy
            </button>
        </div>
        <div className='vhCenter' style={{ marginTop: 20 }}>
            <textarea id="contractAbi" value={JSON.stringify(abi,null, "\t")}/>
        </div>
        
        <div className='withRow'  style={{ marginTop: 40 }}>
          <div className='withRowLeftAuto'>合约原始数据</div>
          <button
              style={{ width: 100 }}
              type="button"
              className="btn btn-primary"
              onClick={() => {
                var t=  document.getElementById('contractBinary') as HTMLTextAreaElement
                t.select()
                document.execCommand('copy')
              }}
            >
              Copy
            </button>
        </div>
        <div className='vhCenter' style={{ marginTop: 20 }}>
          <textarea id="contractBinary"  value={self.props.code}/>
        </div>

        
      </div>
    )
  }
}
class TabContractCallContent extends React.Component<any,any>{
  componentDidMount(){
    var self = this;
    var address = self.props.address;

    console.log(address)

  }
  render(){
    var self = this;
    return (
      <div className='container contractTabCall'>
        {self.props.address}
      </div>
    )
  }
}
class AccountDetail extends React.Component<any, any> {
  componentDidMount() {
    var self = this
    var address = self.props.params.address
    var params = self.props.location.query
    var pageNum = params.pageNum ? parseInt(params.pageNum) : 1
    var pageSize = params.pageSize ? parseInt(params.pageSize) : 10

    if (!self.props.network.metaData) self.props.networkAction.getMetaData()

    self.props.accountAction.getBalance(address)
    self.props.accountAction.getCode(address)

    // var tabIndex = params.tabIndex ? parseInt(params.tabIndex): 0;
    // if(tabIndex == 0){
    self.props.accountAction.getTransactionListByAccount(
      address,
      pageNum,
      pageSize
    )
    // } else{
    self.props.accountAction.getERC20TransactionListByAccount(
      address,
      pageNum,
      pageSize
    )
    // }
  }
  componentWillReceiveProps(nextProps: any) {
    var self = this
    var address = self.props.params.address
    var pageNum = parseInt(self.props.location.query.pageNum) || 1
    var pageSize = parseInt(self.props.location.query.pageSize) || 10
    var tabIndex = parseInt(self.props.location.query.tabIndex) || 0

    var fetchData = false
    if (nextProps.params.address !== self.props.params.address) {
      address = nextProps.params.address
      self.props.accountAction.getBalance(address)
      self.props.accountAction.getCode(address)

      fetchData = true
    }
    if (
      JSON.stringify(nextProps.location.query) !==
      JSON.stringify(this.props.location.query)
    ) {
      var params = nextProps.location.query
      pageNum = params.pageNum ? parseInt(params.pageNum) : 1
      pageSize = params.pageSize ? parseInt(params.pageSize) : 10
      tabIndex = params.tabIndex ? parseInt(params.tabIndex) : 0
      fetchData = true
    }
    if (fetchData) {
      if (tabIndex == 0) {
        self.props.accountAction.getTransactionListByAccount(
          address,
          pageNum,
          pageSize
        )
      } else if (tabIndex == 1) {
        self.props.accountAction.getERC20TransactionListByAccount(
          address,
          pageNum,
          pageSize
        )
      }
    }
  }
  render() {
    var self = this
    var account = self.props.params.address
    var data = self.props.account.trList
    var globalTickTime = self.props.app.globalTickTime
    var erc20Data = self.props.account.erc20List
    var params = self.props.location.query
    var tabIndex = params.tabIndex ? parseInt(params.tabIndex) : 0
    var balance = self.props.account.balance
    var metaData = self.props.network.metaData

    var isContract = self.props.account.code && self.props.account.code !=='0x'
    return (
      <Layout className="accountDetail" bgColor="#fbfbfb">
        <Header location={self.props.location} app={self.props.app} />
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
            <div className="row" style={{ marginLeft: -20, marginRight: -20 }}>
              <div className="col-xs-12 col-sm-12 col-md-6 col-lg-6">
                <div className="accountNav">
                  <div className="withRow" style={{ height: 22 }}>
                    <div
                      style={{
                        marginTop: 7,
                        width: 8,
                        height: 8,
                        backgroundColor: '#5b8ee6',
                        WebkitBorderRadius: '50% 50%'
                      }}
                    />
                    <div
                      style={{
                        marginLeft: 20,
                        fontSize: 16,
                        color: '#47484a'
                      }}
                    >
                      account:
                    </div>
                    <div
                      className="withRowLeftAuto"
                      style={{
                        marginLeft: 10,
                        fontSize: 16,
                        width: '100%',
                        color: '#6f747a',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap'
                      }}
                    >
                      {' '}
                      # {account}
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-xs-12 col-sm-12 col-md-6 col-lg-6">
                <div className="accountNav">
                  <div className="withRow" style={{ height: 22 }}>
                    <div
                      style={{
                        marginTop: 7,
                        width: 8,
                        height: 8,
                        backgroundColor: '#3dd895',
                        WebkitBorderRadius: '50% 50%'
                      }}
                    />
                    <div
                      style={{
                        marginLeft: 20,
                        fontSize: 16,
                        color: '#47484a'
                      }}
                    >
                      {' '}
                      Balance:{' '}
                    </div>
                    <div
                      className="withRowLeftAuto"
                      style={{
                        marginLeft: 10,
                        fontSize: 16,
                        color: '#6f747a',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap'
                      }}
                    >
                      #{' '}
                      {metaData
                        ? valueFormat(balance, metaData.tokenSymbol)
                        : valueFormat(balance)}{' '}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <Tabs
              style={{ marginTop: 50 }}
              headerWidthUnit="fixed"
              initIndex={tabIndex}
              onTabSwitchCallBack={(index: number) => {
                  hashHistory.push(
                    '/account/' +
                      account +
                      '?pageNum=' +
                      1 +
                      '&pageSize=' +
                      10 +
                      '&tabIndex=' +
                      index
                  )
              }}
            >
              <Tab title={'普通(' + data.total + ')'}>
                <div className="accountBody">
                  <TransactionTable
                    data={data}
                    globalTickTime={globalTickTime}
                    onChange={(pageNum: number, pageSize: number) => {
                      hashHistory.push(
                        '/account/' +
                          account +
                          '?pageNum=' +
                          pageNum +
                          '&pageSize=' +
                          pageSize +
                          '&tabIndex=0'
                      )
                    }}
                  />
                </div>
              </Tab>
              <Tab title={'ERC20(' + erc20Data.total + ')'}>
                <div className="accountBody">
                  <TransactionTable
                    data={erc20Data}
                    globalTickTime={globalTickTime}
                    onChange={(pageNum: number, pageSize: number) => {
                      hashHistory.push(
                        '/account/' +
                          account +
                          '?pageNum=' +
                          pageNum +
                          '&pageSize=' +
                          pageSize +
                          '&tabIndex=1'
                      )
                    }}
                  />
                </div>
              </Tab>
              {isContract?<Tab title="合约调用">
                <TabContractCallContent address={account} code={self.props.account.code} abi={self.props.account.abi} accountAction={self.props.accountAction}/>

              </Tab>:null}
              {isContract?<Tab title="合约信息">
                <TabContractInfoContent address={account} code={self.props.account.code} abi={self.props.account.abi} accountAction={self.props.accountAction}/>
              </Tab>:null}
            </Tabs>
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
import * as accountAction from '../../redux/actions/account'
import * as networkAction from '../../redux/actions/network'

import { IRootState } from '../../redux/states'
import { connect } from 'react-redux'

export default connect(
  (state: IRootState) => ({
    app: state.app,
    account: state.account,
    network: state.network
  }),
  dispatch => ({
    appAction: bindActionCreators(appAction, dispatch),
    networkAction: bindActionCreators(networkAction, dispatch),
    accountAction: bindActionCreators(accountAction, dispatch)
  })
)(injectIntl(AccountDetail))
