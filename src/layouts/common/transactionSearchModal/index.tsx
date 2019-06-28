import React from 'react'
import './index.styl'
import hashHistory from '../../../routes/history'

class TransactionSearchModal extends React.Component<any, any> {
  componentDidMount() {
    var self = this
    var from: HTMLInputElement = self.refs.from as HTMLInputElement
    var to: HTMLInputElement = self.refs.to as HTMLInputElement
    from.value = self.props.from
    to.value = self.props.to
  }
  render() {
    var self = this
    var intl = self.props.intl
    return (
      <div className="transactionSearchModal">
        <h5 style={{ textAlign: 'center' }}>
          {intl.formatMessage({ id: 'app.pages.common.txsearchmodal.title' })}
        </h5>
        <div style={{ padding: 20 }}>
          <div className="form-group row">
            <label className="col-sm-2 col-form-label">
              {intl.formatMessage({
                id: 'app.pages.common.txsearchmodal.address.from'
              })}
            </label>
            <div className="col-sm-10">
              <input
                type="text"
                ref="from"
                className="form-control hash"
                placeholder={intl.formatMessage({
                  id: 'app.pages.common.txsearchmodal.address.from'
                })}
                maxLength={66}
              />
            </div>
          </div>
          <div className="form-group row">
            <label className="col-sm-2 col-form-label">
              {intl.formatMessage({
                id: 'app.pages.common.txsearchmodal.address.to'
              })}
            </label>
            <div className="col-sm-10">
              <input
                type="text"
                ref="to"
                className="form-control hash"
                placeholder={intl.formatMessage({
                  id: 'app.pages.common.txsearchmodal.address.to'
                })}
                maxLength={66}
              />
            </div>
          </div>
          <div style={{ textAlign: 'right' }}>
            <button
              type="button"
              className="btn btn-primary"
              onClick={() => {
                var from: HTMLInputElement = self.refs.from as HTMLInputElement
                var to: HTMLInputElement = self.refs.to as HTMLInputElement
                self.props.appAction.hideModal()
                hashHistory.push(
                  '/transaction/list?addressFrom=' +
                    from.value +
                    '&addressTo=' +
                    to.value
                )
              }}
            >
              {intl.formatMessage({
                id: 'app.pages.common.txsearchmodal.button'
              })}
            </button>
          </div>
        </div>
      </div>
    )
  }
}
export default TransactionSearchModal
