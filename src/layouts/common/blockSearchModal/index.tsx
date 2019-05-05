import React from 'react'
import './index.styl'
import { hashHistory } from 'react-router'

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
    return (
      <div className="blockSearchModal">
        <h5 style={{ textAlign: 'center' }}>高级选择器</h5>
        <div style={{ padding: 20 }}>
          <div className="form-group row">
            <label className="col-sm-2 col-form-label">Block Height</label>
            <div className="col-sm-5">
              <input
                type="text"
                ref="from"
                className="form-control"
                placeholder="From"
              />
            </div>
            <div className="col-sm-5">
              <input
                type="text"
                ref="to"
                className="form-control"
                placeholder="To"
              />
            </div>
          </div>
          <div className="form-group row">
            <label className="col-sm-2 col-form-label">Transaction Count</label>
            <div className="col-sm-5">
              <input
                type="text"
                ref="min"
                className="form-control"
                placeholder="Min"
              />
            </div>
            <div className="col-sm-5">
              <input
                type="text"
                ref="max"
                className="form-control"
                placeholder="Max"
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
              Submit
            </button>
          </div>
        </div>
      </div>
    )
  }
}
export default BlockSearchModal
