import React from 'react'
import './list.styl'
import Content from '../../components/content'

import TransactionTable from '../common/transactionTable'
import TransactionSearchModal from '../common/transactionSearchModal'

import hashHistory from '../../routes/history'
import queryString from 'query-string'

class TransitionList extends React.Component<any, any> {
  componentDidMount() {
    var self = this
    var params: any = queryString.parse(self.props.location.search)
    var pageNum = params.pageNum ? parseInt(params.pageNum) : 1
    var pageSize = params.pageSize ? parseInt(params.pageSize) : 10
    var addressFrom = params.addressFrom || ''
    var addressTo = params.addressTo || ''
    self.props.transactionAction.getTransactionList(
      pageNum,
      pageSize,
      addressFrom,
      addressTo
    )
  }
  componentWillReceiveProps(nextProps: any) {
    var self = this
    if (nextProps.location.search !== this.props.location.search) {
      var params: any = queryString.parse(nextProps.location.search)
      var pageNum = params.pageNum ? parseInt(params.pageNum) : 1
      var pageSize = params.pageSize ? parseInt(params.pageSize) : 10
      var addressFrom = params.addressFrom || ''
      var addressTo = params.addressTo || ''
      self.props.transactionAction.getTransactionList(
        pageNum,
        pageSize,
        addressFrom,
        addressTo
      )
    }
  }
  render() {
    var self = this
    var intl = self.props.intl
    var data = self.props.transaction.list
    var globalTickTime = self.props.app.globalTickTime
    var params: any = queryString.parse(self.props.location.search)
    var addressFrom = params.addressFrom || ''
    var addressTo = params.addressTo || ''
    return (
      <Content className="transactionList" bgColor="white">
        <div
          style={{
            width: '100%',
            backgroundImage: 'url("./images/list_bg.png")',
            backgroundRepeat: 'no-repeat',
            paddingTop: 75,
            paddingBottom: 98
          }}
        >
          <div
            className="container transactionListBody"
            style={{ padding: '47px 20px' }}
          >
            <div className="withRow" style={{ minHeight: 36 }}>
              <div
                className="queryCondition withRowLeftAuto"
                style={{ color: '#868b92', fontSize: 14 }}
              >
                {intl.formatMessage(
                  { id: 'app.pages.transactionlist.search.parameters' },
                  {
                    addressFrom: addressFrom,
                    addressTo: addressTo
                  }
                )}
              </div>
              <div
                className="queryButton operationItem"
                onClick={() => {
                  self.props.appAction.showModal({
                    ui: TransactionSearchModal,
                    uiProps: {
                      style: {
                        width: '60%'
                      },
                      from: addressFrom,
                      to: addressTo,
                      appAction: self.props.appAction,
                      intl: intl
                    }
                  })
                }}
              >
                {intl.formatMessage({
                  id: 'app.pages.transactionlist.search.button'
                })}
              </div>
            </div>
            <div style={{ marginTop: 14 }}>
              <TransactionTable
                intl={intl}
                data={data}
                globalTickTime={globalTickTime}
                network={self.props.network}
                onChange={(page: number, pageSize: number) => {
                  hashHistory.push(
                    '/transaction/list?pageNum=' +
                      page +
                      '&pageSize=' +
                      pageSize +
                      '&addressFrom=' +
                      addressFrom +
                      '&addressTo=' +
                      addressTo
                  )
                }}
              />
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
    network: state.network,
    transaction: state.transaction
  }),
  dispatch => ({
    appAction: bindActionCreators(appAction, dispatch),
    transactionAction: bindActionCreators(transactionAction, dispatch)
  })
)(injectIntl(TransitionList))
