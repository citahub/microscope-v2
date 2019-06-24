import React from 'react'
import './detail.styl'
import Layout from '../../components/layout'
import Header from '../common/header'
import Footer from '../common/footer'

import { hashHistory } from 'react-router'
import Tabs, { Tab } from '../../components/tab'

import {
  getContractData,
  valueFormat,
  toHex,
  scientificNotationToString
} from '../../utils/hex'

class TransactionDetail extends React.Component<any, any> {
  componentDidMount() {
    var self = this
    var params = self.props.params
    self.props.transactionAction.getTransaction(params.hash)
    self.props.transactionAction.getTransactionReceipt(params.hash)
  }
  componentWillReceiveProps(nextProps: any) {
    var self = this
    if (
      JSON.stringify(nextProps.params) !== JSON.stringify(self.props.params)
    ) {
      self.props.transactionAction.getTransaction(nextProps.params.hash)
      self.props.transactionAction.getTransactionReceipt(nextProps.params.hash)
    }
  }
  render() {
    var self = this
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
    var subData =
      data &&
      data.unsignedTransaction &&
      data.unsignedTransaction.transaction &&
      data.unsignedTransaction.transaction.data

    var errorMessage = dataReceipt && dataReceipt.errorMessage

    return (
      <Layout className="transactionDetail" bgColor="#fbfbfb">
        <Header location={self.props.location} app={self.props.app} />
        <div
          style={{
            width: '100%',
            backgroundImage: 'url("./images/list_bg.png")',
            backgroundRepeat: 'no-repeat',
            paddingBottom: 68
          }}
        >
          <div className="container">
            <div className="transactionNav vhCenter" style={{ fontSize: 20 }}>
              <img
                src="images/content_transaction.png"
                style={{
                  width: 16,
                  height: 18,
                  display: 'inline-block',
                  marginRight: 17
                }}
              />
              Transaction: {data && data.hash}
            </div>
            <div className="transactionBody">
              <div className="withRow transactionBodyRow">
                <div className="transactionDetailKey">Status:</div>
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
                <div className="transactionDetailKey">Type:</div>
                <div className="transactionDetailValue withRowLeftAuto">
                  {!data
                    ? ''
                    : !to
                    ? 'Contract Creation'
                    : subData && subData.replace(/^0x/, '')
                    ? 'Contract Call'
                    : 'Exchange'}
                </div>
              </div>

              <div className="withRow transactionBodyRow">
                <div className="transactionDetailKey">From:</div>
                <div
                  className="transactionDetailValue withRowLeftAuto operationItem"
                  style={{ fontSize: 16, color: '#5b8ee6' }}
                  onClick={() => {
                    if (from) hashHistory.push('/account/' + from)
                  }}
                >
                  {from}
                </div>
              </div>
              <div className="withRow transactionBodyRow">
                <div className="transactionDetailKey">To/Contract</div>
                <div
                  className="transactionDetailValue withRowLeftAuto operationItem"
                  style={{ fontSize: 16, color: '#5b8ee6' }}
                  onClick={() => {
                    var account =
                      to || (dataReceipt && dataReceipt.contractAddress)
                    if (account) hashHistory.push('/account/' + account)
                  }}
                >
                  {to || (dataReceipt && dataReceipt.contractAddress)}
                </div>
              </div>
              <div className="withRow transactionBodyRow">
                <div className="transactionDetailKey">Block Height:</div>
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
                <div className="transactionDetailKey">Version:</div>
                <div className="transactionDetailValue withRowLeftAuto">
                  {data &&
                    data.unsignedTransaction &&
                    data.unsignedTransaction.transaction &&
                    parseInt(data.unsignedTransaction.transaction.version)}
                </div>
              </div>
              <div className="withRow transactionBodyRow">
                <div className="transactionDetailKey">Nonce:</div>
                <div className="transactionDetailValue withRowLeftAuto">
                  {data &&
                    data.unsignedTransaction &&
                    data.unsignedTransaction.transaction &&
                    data.unsignedTransaction.transaction.nonce}
                </div>
              </div>
              <div className="withRow transactionBodyRow">
                <div className="transactionDetailKey">ValidUnitBlock:</div>
                <div className="transactionDetailValue withRowLeftAuto">
                  {data &&
                    data.unsignedTransaction &&
                    data.unsignedTransaction.transaction &&
                    data.unsignedTransaction.transaction.validUntilBlock}
                </div>
              </div>
              <div className="withRow transactionBodyRow">
                <div className="transactionDetailKey">Value:</div>
                <div className="transactionDetailValue withRowLeftAuto">
                  {data &&
                    data.unsignedTransaction &&
                    data.unsignedTransaction.transaction &&
                    valueFormat(
                      toHex(
                        scientificNotationToString(
                          data.unsignedTransaction.transaction.value
                        )
                      ),
                      self.props.network.metaData &&
                        self.props.network.metaData.tokenSymbol,
                      self.props.network.quotaPrice
                    )}
                </div>
              </div>
              <div className="withRow transactionBodyRow">
                <div className="transactionDetailKey">Quota Used:</div>
                <div className="transactionDetailValue withRowLeftAuto">
                  {dataReceipt && parseInt(dataReceipt.quotaUsed)} Quota
                </div>
              </div>
              <div className="withRow transactionBodyRow">
                <div className="transactionDetailKey">Quota Limit:</div>
                <div className="transactionDetailValue withRowLeftAuto">
                  {data &&
                    data.unsignedTransaction &&
                    data.unsignedTransaction.transaction &&
                    data.unsignedTransaction.transaction.quota}{' '}
                  Quota
                </div>
              </div>
              <div className="withRow transactionBodyRow">
                <div className="transactionDetailKey">Quota Price:</div>
                <div className="transactionDetailValue withRowLeftAuto">
                  1{' '}
                  {self.props.network.metaData &&
                    self.props.network.metaData.tokenSymbol}{' '}
                  = {self.props.network.quotaPrice} Quota
                </div>
              </div>
              <div
                className="withRow transactionBodyRow"
                style={{ minHeight: 160, height: 'auto' }}
              >
                <div className="transactionDetailKey">Data:</div>
                <div className="transactionDetailValue withRowLeftAuto">
                  <Tabs
                    key={data && data.hash}
                    headerWidthUnit="fixed"
                    initIndex={0}
                    onTabSwitchCallBack={(tabIndex: number) => {
                      if (tabIndex == 1) {
                        if (to && subData.replace(/^0x/, '')) {
                          getContractData(
                            to,
                            subData,
                            (error: any, data: any) => {
                              var dataUtf8: HTMLTextAreaElement = document.getElementById(
                                'dataUtf8'
                              ) as HTMLTextAreaElement
                              if (error) {
                                console.error(error)
                                if (dataUtf8) dataUtf8.value = error
                              } else {
                                if (dataUtf8) dataUtf8.value = data
                              }
                            }
                          )
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
                    {to && subData.replace(/^0x/, '') && dataReceipt ? (
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
        <Footer />
      </Layout>
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
