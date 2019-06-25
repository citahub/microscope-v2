import React from 'react'
import './index.styl'
import hashHistory from '../../../routes/history'

class BlockSearchModal extends React.Component<any, any> {
  componentDidMount() {
    var self = this
    var from: HTMLInputElement = self.refs.from as HTMLInputElement
    var to: HTMLInputElement = self.refs.to as HTMLInputElement
    var min: HTMLInputElement = self.refs.min as HTMLInputElement
    var max: HTMLInputElement = self.refs.max as HTMLInputElement
    from.value = self.props.from
    to.value = self.props.to
    min.value = self.props.min
    max.value = self.props.max
  }
  render() {
    var self = this
    var intl = self.props.intl
    return (
      <div className="blockSearchModal">
        <h5 style={{ textAlign: 'center' }}>
          {intl.formatMessage({
            id: 'app.pages.common.blocksearchmodal.title'
          })}
        </h5>
        <div style={{ padding: 20 }}>
          <div className="form-group row">
            <label className="col-sm-2 col-form-label">
              {intl.formatMessage({
                id: 'app.pages.common.blocksearchmodal.blockheight'
              })}
            </label>
            <div className="col-sm-5">
              <input
                type="text"
                ref="from"
                className="form-control"
                placeholder={intl.formatMessage({
                  id: 'app.pages.common.blocksearchmodal.blockheight.from'
                })}
                maxLength={66}
              />
            </div>
            <div className="col-sm-5">
              <input
                type="text"
                ref="to"
                className="form-control"
                placeholder={intl.formatMessage({
                  id: 'app.pages.common.blocksearchmodal.blockheight.to'
                })}
                maxLength={66}
              />
            </div>
          </div>
          <div className="form-group row">
            <label className="col-sm-2 col-form-label">
              {intl.formatMessage({
                id: 'app.pages.common.blocksearchmodal.txscount'
              })}
            </label>
            <div className="col-sm-5">
              <input
                type="text"
                ref="min"
                className="form-control"
                placeholder={intl.formatMessage({
                  id: 'app.pages.common.blocksearchmodal.txscount.min'
                })}
                pattern="\d*"
                maxLength={16}
              />
            </div>
            <div className="col-sm-5">
              <input
                type="text"
                ref="max"
                className="form-control"
                placeholder={intl.formatMessage({
                  id: 'app.pages.common.blocksearchmodal.txscount.max'
                })}
                pattern="\d*"
                maxLength={16}
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
                var min: HTMLInputElement = self.refs.min as HTMLInputElement
                var max: HTMLInputElement = self.refs.max as HTMLInputElement
                self.props.appAction.hideModal()
                hashHistory.push(
                  '/block/list?blockFrom=' +
                    from.value +
                    '&blockTo=' +
                    to.value +
                    '&transactionCountMin=' +
                    min.value +
                    '&transactionCountMax=' +
                    max.value
                )
              }}
            >
              {intl.formatMessage({
                id: 'app.pages.common.blocksearchmodal.button'
              })}
            </button>
          </div>
        </div>
      </div>
    )
  }
}
export default BlockSearchModal
