import * as React from 'react'
import './detail.styl'
import Layout from '../../components/layout'
import Content from '../../components/content'
import CustomHeader from '../common/customHeader'
import CustomFooter from '../common/customFooter'

import { hashHistory } from 'react-router';



class TransactionDetail  extends React.Component<any,any> {
  componentDidMount(){
    var self = this;
    // console.log(self.props.location);
    // console.log(self.props.params);
    var params = self.props.params;
    // if(params && params.hash){
    //
    // }else if(params && params.id){
    //
    // }
    // citaAPI.getTransaction(params.hash).then((transaction: any)=>{
    //   console.log(transaction);
    //   self.setState({
    //     data: transaction
    //   })
    // })
    self.props.transactionAction.getTransaction(params.hash);
  }
  componentWillReceiveProps(nextProps:any){
    var self = this;
    if(JSON.stringify(nextProps.params) !== JSON.stringify(self.props.params)){
      self.props.transactionAction.getTransaction(nextProps.params.hash);
    }
  }
  render() {
    var self = this;
    var data = self.props.transaction.item;
    return (
      <Layout className='transactionDetail' bgColor='#fbfbfb'>
        <Content style={{ width: '100%', height: '100%' }}>
          <CustomHeader/>
          <div style={{ width: '100%', backgroundImage: 'url("./images/list_bg.png")', backgroundRepeat: 'no-repeat',  paddingBottom: 68}}>
            <div className='container'>
              <div className='transactionNav vhCenter'>
                Transaction {data && data.hash}
              </div>
              <div  className='transactionBody'>
                <div className='withRow transactionBodyRow'>
                  <div className='transactionDetailKey'>Status:</div>
                  <div className='transactionDetailValue withRowLeftAuto'>{data && data.index}</div>
                </div>
                <div className='withRow transactionBodyRow'>
                  <div className='transactionDetailKey'>From:</div>
                  <div className='transactionDetailValue withRowLeftAuto'>{data &&  data.unsignedTransaction && data.unsignedTransaction.sender.address}</div>
                </div>
                <div className='withRow transactionBodyRow'>
                  <div className='transactionDetailKey'>To/Contract</div>
                  <div className='transactionDetailValue withRowLeftAuto'>{data &&  data.unsignedTransaction && data.unsignedTransaction.transaction.to}</div>
                </div>
                <div className='withRow transactionBodyRow'>
                  <div className='transactionDetailKey'>Block Height:</div>
                  <div className='transactionDetailValue withRowLeftAuto' onClick={()=>{ data && hashHistory.push('/block/id/'+ parseInt(data.blockNumber))}}>{data && parseInt(data.blockNumber)}</div>
                </div>
                <div className='withRow transactionBodyRow'>
                  <div className='transactionDetailKey'>Nonce:</div>
                  <div className='transactionDetailValue withRowLeftAuto'>{data  &&  data.unsignedTransaction && data.unsignedTransaction.transaction.nonce}</div>
                </div>
                <div className='withRow transactionBodyRow'>
                  <div className='transactionDetailKey'>ValidUnitBlock:</div>
                  <div className='transactionDetailValue withRowLeftAuto'>{data &&  data.unsignedTransaction && data.unsignedTransaction.transaction.validUntilBlock}</div>
                </div>
                <div className='withRow transactionBodyRow'>
                  <div className='transactionDetailKey'>Value:</div>
                  <div className='transactionDetailValue withRowLeftAuto'>{data &&  data.unsignedTransaction && data.unsignedTransaction.transaction.value}</div>
                </div>
                <div className='withRow transactionBodyRow'>
                  <div className='transactionDetailKey'>Quota Limit:</div>
                  <div className='transactionDetailValue withRowLeftAuto'>{data &&  data.unsignedTransaction && data.unsignedTransaction.transaction.quota}</div>
                </div>
                <div className='withRow transactionBodyRow'>
                  <div className='transactionDetailKey'>Quota Price:</div>
                  <div className='transactionDetailValue withRowLeftAuto'>{data && data.quotaPrice}</div>
                </div>
                <div className='withRow transactionBodyRow'>
                  <div className='transactionDetailKey'>Quota used:</div>
                  <div className='transactionDetailValue withRowLeftAuto'>{data && data.quotaUsed}</div>
                </div>
                <div className='withRow transactionBodyRow'>
                  <div className='transactionDetailKey'>Fee:</div>
                  <div className='transactionDetailValue withRowLeftAuto'>{data && data.fee}</div>
                </div>
                <div className='withRow transactionBodyRow'>
                  <div className='transactionDetailKey'>Data:</div>
                  <div className='transactionDetailValue withRowLeftAuto'>

                    <textarea value=  {data &&  data.content}>

                    </textarea>

                  </div>
                </div>
              </div>
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
import * as transactionAction from '../../redux/actions/transaction'

import { IRootState } from '../../redux/states'
import { connect } from 'react-redux'

export default connect( (state:IRootState)=> ({app: state.app,transaction: state.transaction}), dispatch => ({
  appAction: bindActionCreators(appAction, dispatch),
  transactionAction: bindActionCreators(transactionAction, dispatch),
}))(injectIntl(TransactionDetail))
