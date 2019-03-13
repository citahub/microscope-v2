import React from 'react'
import './index.styl'
import { hashHistory } from 'react-router'

class TransactionSearchModal extends React.Component<any, any> {
  componentDidMount(){
    var self = this;
    var from: HTMLInputElement = self.refs.from as HTMLInputElement;
    var to: HTMLInputElement = self.refs.to as HTMLInputElement;
    from.value = self.props.from;
    to.value = self.props.to;
  }
  render() {
    var self = this;
    return (
      <div className="transactionSearchModal">
        <h5 style={{ textAlign: 'center' }}>高级选择器</h5>
        <div style={{ padding: 20 }}>
          <div className="form-group row">
            <label className="col-sm-2 col-form-label">Address From</label>
            <div className="col-sm-10">
              <input type="text" ref="from" className="form-control"  placeholder="Address From" />
            </div>
          </div>
          <div className="form-group row">
            <label className="col-sm-2 col-form-label">Address To</label>
            <div className="col-sm-10">
              <input type="text" ref="to" className="form-control" placeholder="Address To" />
            </div>
          </div>
          <div style={{ textAlign: 'right' }}> 
            <button type="button" className="btn btn-primary" onClick={()=>{
              var from: HTMLInputElement = self.refs.from as HTMLInputElement;
              var to: HTMLInputElement = self.refs.to as HTMLInputElement;
              // self.props.transactionAction.getTransactionList(1,10, from.value,to.value)
              self.props.appAction.hideModal();
              hashHistory.push(
                '/transaction/list?addressFrom=' +
                  from.value +
                  '&addressTo=' +
                  to.value
              )

            }}>Submit</button>
          </div>
        </div>
      </div>
    )
  }
}
export default TransactionSearchModal
