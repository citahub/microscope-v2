import React from 'react'
import './detail.styl'
import Content from '../../components/content'
import Tabs, { Tab } from '../../components/tab'
import TransactionTable from '../common/transactionTable'

import hashHistory from '../../routes/history'
import queryString from 'query-string'
import { valueFormat } from '../../utils/hex'
import citaSDK from '../../utils/sdk'

class TabContractInfoContent extends React.Component<any, any> {
  componentDidMount() {
    var self = this
    var address = self.props.address

    self.props.accountAction.getAbi(address)
  }
  render() {
    var self = this
    var abi = self.props.abi
    return (
      <div className="container contractTabInfo">
        <div className="withRow" style={{ marginTop: 20 }}>
          <div className="withRowLeftAuto">ABI</div>
          <button
            style={{ width: 100 }}
            type="button"
            className="btn btn-primary"
            onClick={() => {
              var t = document.getElementById(
                'contractAbi'
              ) as HTMLTextAreaElement
              t.select()
              document.execCommand('copy')
            }}
          >
            Copy
          </button>
        </div>
        <div className="vhCenter" style={{ marginTop: 20 }}>
          <textarea
            readOnly
            id="contractAbi"
            value={JSON.stringify(abi, null, '\t')}
          />
        </div>

        <div className="withRow" style={{ marginTop: 40 }}>
          <div className="withRowLeftAuto">Original Data</div>
          <button
            style={{ width: 100 }}
            type="button"
            className="btn btn-primary"
            onClick={() => {
              var t = document.getElementById(
                'contractBinary'
              ) as HTMLTextAreaElement
              t.select()
              document.execCommand('copy')
            }}
          >
            Copy
          </button>
        </div>
        <div className="vhCenter" style={{ marginTop: 20 }}>
          <textarea readOnly id="contractBinary" value={self.props.code} />
        </div>
      </div>
    )
  }
}
class TabContractCallContent extends React.Component<any, any> {
  contract: any
  componentDidMount() {
    var self = this
    var address = self.props.address
    self.props.accountAction.getAbi(address)
  }
  componentWillReceiveProps(nextProps: any) {
    if (nextProps.abi != null && nextProps.abi != this.props.abi) {
      this.contract = new citaSDK.base.Contract(
        nextProps.abi,
        this.props.address
      )
    }
  }
  callMethod(methodName: string, params: any) {
    return this.contract.methods[methodName](...params).call({
      from: ''
    })
  }
  sendMethod(methodName: string, params: any) {
    var self = this
    var pk = window.prompt(
      'your privatekey for transactions(only for debugger)'
    )
    if (!pk) {
      throw new Error('pk could not be null')
      return
    }
    var accountInfo: any = (citaSDK as any).eth.accounts.privateKeyToAccount(pk)
    pk = null
    return citaSDK.base.getBlockNumber().then((current: any) => {
      return self.contract.methods[methodName](...params).send({
        nonce: 999999,
        quota: 1000000,
        chainId: 1,
        version: 2,
        validUntilBlock: current + 88,
        value: '0x0',
        from: accountInfo.address,
        privateKey: accountInfo.privateKey
      })
    })
  }
  renderAbi(d: any, type: string) {
    var self = this
    if (d.type === 'fallback' || d.type === 'event' || d.type === 'constructor')
      return
    return (
      <div style={{ marginTop: 30 }}>
        <h5>
          "{d.name}" method({d.stateMutability})
        </h5>
        <hr />
        <div className="withRow">
          <div style={{ width: 100 }}>Inputs:</div>
          <div className="withRowLeftAuto">
            {d.inputs &&
              d.inputs.map((input: any) => {
                return (
                  <input
                    className={d.name + '-input'}
                    style={{ marginLeft: 10 }}
                    type="text"
                    placeholder={input.name + '(' + input.type + ')'}
                  />
                )
              })}
          </div>
        </div>
        <div className="withRow" style={{ marginTop: 10 }}>
          <div style={{ width: 100 }}>Outputs:</div>
          <div className="withRowLeftAuto">
            {d.outputs &&
              d.outputs.map((output: any) => {
                return (
                  <input
                    className={d.name + '-output'}
                    readOnly
                    style={{ marginLeft: 10, color: 'red' }}
                    type="text"
                    placeholder={output.name + '(' + output.type + ')'}
                  />
                )
              })}
          </div>
        </div>

        <div style={{ textAlign: 'right' }}>
          <button
            style={{ width: 100, marginTop: 20 }}
            type="button"
            className="btn btn-primary"
            onClick={() => {
              var inputs = document.querySelectorAll('.' + d.name + '-input')
              var params: any = []
              for (var i: number = 0; i < inputs.length; i++) {
                var input = inputs[i] as HTMLInputElement
                params.push(input.value)
              }

              if (type === 'view') {
                self
                  .callMethod(d.name, params)
                  .then((result: any) => {
                    var outputs = document.querySelectorAll(
                      '.' + d.name + '-output'
                    )
                    for (var i: number = 0; i < outputs.length; i++) {
                      var output = outputs[i] as HTMLInputElement
                      output.value = result[i]
                    }
                  })
                  .catch((e: any) => {
                    self.props.appAction.toast(e.message, 5000)
                  })
              } else if (type === 'payable') {
                self
                  .sendMethod(d.name, params)
                  .then((result: any) => {
                    var outputs = document.querySelectorAll(
                      '.' + d.name + '-output'
                    )
                    for (var i: number = 0; i < outputs.length; i++) {
                      var output = outputs[i] as HTMLInputElement
                      output.value = result[i]
                    }
                  })
                  .catch((e: any) => {
                    self.props.appAction.toast(e.message, 5000)
                  })
              }
            }}
          >
            Call
          </button>
        </div>
      </div>
    )
  }
  render() {
    var self = this
    var viewAbis =
      (self.props.abi &&
        self.props.abi.filter((d: any) => {
          return d.stateMutability === 'view'
        })) ||
      []
    var payableAbis =
      (self.props.abi &&
        self.props.abi.filter((d: any) => {
          return d.stateMutability === 'nonpayable'
        })) ||
      []
    return (
      <div className="container contractTabCall">
        {viewAbis.map((d: any) => this.renderAbi(d, 'view'))}
        {payableAbis.map((d: any) => this.renderAbi(d, 'payable'))}
      </div>
    )
  }
}
class AccountDetail extends React.Component<any, any> {
  componentDidMount() {
    var self = this
    var address = self.props.match.params.address
    var params: any = queryString.parse(self.props.location.search)
    var pageNum = params.pageNum ? parseInt(params.pageNum) : 1
    var pageSize = params.pageSize ? parseInt(params.pageSize) : 10

    self.props.accountAction.getBalance(address)
    self.props.accountAction.getCode(address)

    self.props.accountAction.getTransactionListByAccount(
      address,
      pageNum,
      pageSize
    )

    self.props.accountAction.getERC20TransactionListByAccount(
      address,
      pageNum,
      pageSize
    )
  }
  componentWillReceiveProps(nextProps: any) {
    var self = this
    var address = self.props.match.params.address
    var params: any = queryString.parse(self.props.location.search)
    var pageNum = parseInt(params.pageNum) || 1
    var pageSize = parseInt(params.pageSize) || 10
    var tabIndex = parseInt(params.tabIndex) || 0

    var fetchData = false
    if (nextProps.match.params.address !== self.props.match.params.address) {
      address = nextProps.match.params.address
      self.props.accountAction.getBalance(address)
      self.props.accountAction.getCode(address)

      fetchData = true
    }
    if (nextProps.location.search !== this.props.location.search) {
      params = queryString.parse(nextProps.location.search)
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
    var intl = self.props.intl
    var account = self.props.match.params.address
    var data = self.props.account.trList
    var globalTickTime = self.props.app.globalTickTime
    var erc20Data = self.props.account.erc20List
    var params: any = queryString.parse(self.props.location.search)
    var tabIndex = params.tabIndex ? parseInt(params.tabIndex) : 0
    var balance = self.props.account.balance

    var isContract = self.props.account.code && self.props.account.code !== '0x'
    return (
      <Content className="accountDetail" bgColor="#fbfbfb">
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
                      {intl.formatMessage({
                        id: 'app.pages.addressdetail.account'
                      })}
                      :
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
                      <span className="hash">{account}</span>
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
                      {intl.formatMessage({
                        id: 'app.pages.addressdetail.balance'
                      })}
                      :
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
                      {valueFormat(
                        balance,
                        self.props.network.metaData &&
                          self.props.network.metaData.tokenSymbol,
                        self.props.network.quotaPrice
                      )}
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
              <Tab
                title={intl.formatMessage(
                  { id: 'app.pages.addressdetail.tabs.general' },
                  { key: data.total }
                )}
              >
                <div className="accountBody">
                  <TransactionTable
                    intl={intl}
                    data={data}
                    globalTickTime={globalTickTime}
                    network={self.props.network}
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
              <Tab
                title={intl.formatMessage(
                  { id: 'app.pages.addressdetail.tabs.erc20' },
                  { key: erc20Data.total }
                )}
              >
                <div className="accountBody">
                  <TransactionTable
                    intl={intl}
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
              {isContract ? (
                <Tab
                  title={intl.formatMessage({
                    id: 'app.pages.addressdetail.tabs.contractcall'
                  })}
                >
                  <TabContractCallContent
                    address={account}
                    code={self.props.account.code}
                    abi={self.props.account.abi}
                    accountAction={self.props.accountAction}
                    appAction={self.props.appAction}
                  />
                </Tab>
              ) : null}
              {isContract ? (
                <Tab
                  title={intl.formatMessage({
                    id: 'app.pages.addressdetail.tabs.contractinfo'
                  })}
                >
                  <TabContractInfoContent
                    address={account}
                    code={self.props.account.code}
                    abi={self.props.account.abi}
                    accountAction={self.props.accountAction}
                  />
                </Tab>
              ) : null}
            </Tabs>
          </div>
        </div>
      </Content>
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
