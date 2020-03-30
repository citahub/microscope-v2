import React from 'react'
import './detail.styl'
import Content from '../../components/content'
import hashHistory from '../../routes/history'
import Tabs, { Tab } from '../../components/tab'

import {
  getContractData,
  toHex,
  hex2Utf8,
  scientificNotationToString, toCTT
} from '../../utils/hex'

class TransactionDetail extends React.Component<any, any> {
  componentDidMount() {
    var self = this
    var params = self.props.match.params
    self.props.transactionAction
      .getTransaction(params.hash)
      .then((transaction: any) => {
        if (!transaction) {
          hashHistory.replace('/search?q=' + params.hash)
        }
      })
    self.props.transactionAction.getTransactionReceipt(params.hash)
  }
  componentWillReceiveProps(nextProps: any) {
    var self = this
    if (
      JSON.stringify(nextProps.match.params) !==
      JSON.stringify(self.props.match.params)
    ) {
      self.props.transactionAction
        .getTransaction(nextProps.match.params.hash)
        .then((transaction: any) => {
          if (!transaction) {
            hashHistory.replace('/search?q=' + nextProps.match.params.hash)
          }
        })
      self.props.transactionAction.getTransactionReceipt(
        nextProps.match.params.hash
      )
    }
  }
  render() {
    var self = this
    var intl = self.props.intl
    var data = self.props.transaction.item
    var dataReceipt = self.props.transaction.itemReceipt
    var from =
      (data && data.from) ||
      (data &&
        data.unsignedTransaction &&
        data.unsignedTransaction.sender &&
        data.unsignedTransaction.sender.address)
    var to =
      (data && data.to) ||
      (data &&
        data.unsignedTransaction &&
        data.unsignedTransaction.transaction &&
        data.unsignedTransaction.transaction.to)
    var toIsContract =
      (data && data.to) ||
      (data &&
        data.unsignedTransaction &&
        data.unsignedTransaction.transaction &&
        data.unsignedTransaction.transaction.toIsContract)
    var subData =
      data &&
      data.unsignedTransaction &&
      data.unsignedTransaction.transaction &&
      data.unsignedTransaction.transaction.data

    var errorMessage = dataReceipt && dataReceipt.errorMessage

    return (
      <Content className="transactionDetail" bgColor="#fbfbfb">
        <div
          style={{
            width: '100%',
            backgroundImage: 'url("./images/list_bg.png")',
            backgroundRepeat: 'no-repeat',
            paddingBottom: 68
          }}
        >
          <div className="container">
            <div
              className="transactionNav"
              style={{ fontSize: 20, paddingTop: 60 }}
            >
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexWrap: 'wrap'
                }}
              >
                <img
                  src="images/content_transaction.png"
                  style={{
                    width: 16,
                    height: 18
                  }}
                />
                <span style={{ marginLeft: 20 }}>
                  {intl.formatMessage({ id: 'app.pages.txdetail.title' })}
                </span>
                <span className="hash">{data && data.hash}</span>
              </div>
            </div>
            <div className="transactionBody">
              <div className="withRow transactionBodyRow">
                <div className="transactionDetailKey">
                  {intl.formatMessage({ id: 'app.pages.txdetail.status' })}:
                </div>
                <div className="transactionDetailValue withRowLeftAuto">
                  {!data ? (
                    ''
                  ) : errorMessage ? (
                    <span style={{ color: '#ff8181' }}>
                      Failure({errorMessage})
                    </span>
                  ) : (
                    <span style={{ color: '#3dd895' }}>Success</span>
                  )}
                </div>
              </div>

              <div className="withRow transactionBodyRow">
                <div className="transactionDetailKey">
                  {intl.formatMessage({ id: 'app.pages.txdetail.type' })}:
                </div>
                <div className="transactionDetailValue withRowLeftAuto">
                  {!data
                    ? ''
                    : !to
                    ? 'Contract Creation'
                    : subData && toIsContract && subData.replace(/^0x/, '')
                    ? 'Contract Call'
                    : 'Exchange'}
                </div>
              </div>

              <div className="withRow transactionBodyRow">
                <div className="transactionDetailKey">
                  {intl.formatMessage({ id: 'app.pages.txdetail.from' })}:
                </div>
                <div
                  className="transactionDetailValue withRowLeftAuto operationItem"
                  style={{ fontSize: 16, color: '#5b8ee6' }}
                  onClick={() => {
                    if (from) hashHistory.push('/account/' + from)
                  }}
                >
                  <span className="hash">{from}</span>
                </div>
              </div>
              <div className="withRow transactionBodyRow">
                <div className="transactionDetailKey">
                  {intl.formatMessage({ id: 'app.pages.txdetail.to' })}:
                </div>
                <div
                  className="transactionDetailValue withRowLeftAuto operationItem"
                  style={{ fontSize: 16, color: '#5b8ee6' }}
                  onClick={() => {
                    var account =
                      to || (dataReceipt && dataReceipt.contractAddress)
                    if (account) hashHistory.push('/account/' + account)
                  }}
                >
                  <span className="hash">
                    {to || (dataReceipt && dataReceipt.contractAddress)}
                  </span>
                </div>
              </div>
              <div className="withRow transactionBodyRow">
                <div className="transactionDetailKey">
                  {intl.formatMessage({ id: 'app.pages.txdetail.blockheight' })}
                  :
                </div>
                <div
                  className="transactionDetailValue withRowLeftAuto operationItem"
                  style={{ fontSize: 16, color: '#5b8ee6' }}
                  onClick={() => {
                    data &&
                      hashHistory.push(
                        '/block/id/' + parseInt(data.blockNumber)
                      )
                  }}
                >
                  {data && parseInt(data.blockNumber)}
                </div>
              </div>
              <div className="withRow transactionBodyRow">
                <div className="transactionDetailKey">
                  {intl.formatMessage({ id: 'app.pages.txdetail.version' })}:
                </div>
                <div className="transactionDetailValue withRowLeftAuto">
                  {data &&
                    data.unsignedTransaction &&
                    data.unsignedTransaction.transaction &&
                    parseInt(data.unsignedTransaction.transaction.version)}
                </div>
              </div>
              <div className="withRow transactionBodyRow">
                <div className="transactionDetailKey">
                  {intl.formatMessage({ id: 'app.pages.txdetail.nonce' })}:
                </div>
                <div className="transactionDetailValue withRowLeftAuto">
                  {data &&
                    data.unsignedTransaction &&
                    data.unsignedTransaction.transaction &&
                    data.unsignedTransaction.transaction.nonce}
                </div>
              </div>
              <div className="withRow transactionBodyRow">
                <div className="transactionDetailKey">
                  {intl.formatMessage({
                    id: 'app.pages.txdetail.validuntilblock'
                  })}
                  :
                </div>
                <div className="transactionDetailValue withRowLeftAuto">
                  {data &&
                    data.unsignedTransaction &&
                    data.unsignedTransaction.transaction &&
                    data.unsignedTransaction.transaction.validUntilBlock}
                </div>
              </div>
              <div className="withRow transactionBodyRow">
                <div className="transactionDetailKey">
                  {intl.formatMessage({ id: 'app.pages.txdetail.value' })}:
                </div>
                <div className="transactionDetailValue withRowLeftAuto">
                  {data &&
                    data.unsignedTransaction &&
                    data.unsignedTransaction.transaction &&
                    toCTT(
                      toHex(
                        scientificNotationToString(
                          data.unsignedTransaction.transaction.value
                        )
                      )
                    )}
                </div>
              </div>
              <div className="withRow transactionBodyRow">
                <div className="transactionDetailKey">
                  {intl.formatMessage({ id: 'app.pages.txdetail.quotaused' })}:
                </div>
                <div className="transactionDetailValue withRowLeftAuto">
                  {dataReceipt && parseInt(dataReceipt.quotaUsed)} Quota
                </div>
              </div>
              <div className="withRow transactionBodyRow">
                <div className="transactionDetailKey">
                  {intl.formatMessage({ id: 'app.pages.txdetail.quotalimit' })}:
                </div>
                <div className="transactionDetailValue withRowLeftAuto">
                  {data &&
                    data.unsignedTransaction &&
                    data.unsignedTransaction.transaction &&
                    data.unsignedTransaction.transaction.quota}
                  &nbsp; Quota
                </div>
              </div>
              <div className="withRow transactionBodyRow">
                <div className="transactionDetailKey">
                  {intl.formatMessage({ id: 'app.pages.txdetail.quotaprice' })}:
                </div>
                <div className="transactionDetailValue withRowLeftAuto">
                  1&nbsp;
                  {self.props.network.metaData &&
                    self.props.network.metaData.tokenSymbol}
                  &nbsp; = {self.props.network.quotaPrice} Quota
                </div>
              </div>
              <div
                className="withRow transactionBodyRow"
                style={{ minHeight: 160, height: 'auto' }}
              >
                <div className="transactionDetailKey">
                  {intl.formatMessage({ id: 'app.pages.txdetail.data' })}:
                </div>
                <div className="transactionDetailValue withRowLeftAuto">
                  <Tabs
                    key={data && data.hash}
                    headerWidthUnit="fixed"
                    initIndex={0}
                    onTabSwitchCallBack={(tabIndex: number) => {
                      if (tabIndex == 1) {
                        var dataUtf8: HTMLTextAreaElement = document.getElementById(
                          'dataUtf8'
                        ) as HTMLTextAreaElement
                        if (toIsContract && subData.replace(/^0x/, '')) {
                          // if (dataReceipt && dataReceipt.contractAddress) {
                          getContractData(
                            to || (dataReceipt && dataReceipt.contractAddress),
                            subData,
                            (error: any, data: any) => {
                              console.log(error)
                              if (error) {
                                if (dataUtf8) dataUtf8.value = error
                              } else {
                                if (dataUtf8) dataUtf8.value = data
                              }
                            }
                          )
                        } else {
                          dataUtf8.value = hex2Utf8(subData)
                        }
                      }
                    }}
                  >
                    <Tab title="HEX">
                      <textarea
                        value={subData}
                        style={{
                          padding: 10,
                          borderRadius: '5px 5px',
                          width: '100%'
                        }}
                      />
                    </Tab>
                    {data && to ? (
                      <Tab title="UTF8">
                        <textarea
                          id="dataUtf8"
                          ref="dataUtf8"
                          style={{
                            padding: 10,
                            borderRadius: '5px 5px',
                            width: '100%'
                          }}
                        />
                      </Tab>
                    ) : null}
                  </Tabs>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Content>
    )
  }
}
import { injectIntl } from 'react-intl'
import { bindActionCreators } from 'redux'
import * as appAction from '../../redux/actions/appAction'
import * as transactionAction from '../../redux/actions/transaction'

import { IRootState } from '../../redux/states'
import { connect } from 'react-redux'

export default connect(
  (state: IRootState) => ({
    app: state.app,
    transaction: state.transaction,
    network: state.network
  }),
  dispatch => ({
    appAction: bindActionCreators(appAction, dispatch),
    transactionAction: bindActionCreators(transactionAction, dispatch)
  })
)(injectIntl(TransactionDetail))
