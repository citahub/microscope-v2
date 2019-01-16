import * as React from 'react'
import './detail.styl'
import Layout from '../../components/layout'
import Content from '../../components/content'
import CustomHeader from '../common/customHeader'
import CustomFooter from '../common/customFooter'

import { hashHistory } from 'react-router';



class BlockDetail  extends React.Component<any,any> {
  componentDidMount(){
    var self = this;
    var params = self.props.params;
    self.props.blockAction.getBlock(params.hash || params.id);
  }
  render() {
    var self = this;
    var data = self.props.block.item;
    return (
      <Layout className='blockDetail' bgColor='#fbfbfb'>
        <Content style={{ width: '100%', height: '100%' }}>
          <CustomHeader/>
          <div style={{ width: '100%', backgroundImage: 'url("./images/list_bg.png")', backgroundRepeat: 'no-repeat', paddingTop: 96, paddingBottom: 85}}>
            <div className='container'>
              <div className='blockNav'>
                <div className='withRow blockBodyRow'>
                  <div style={{ color: '#47484a', fontSize: 16 }}>Block: # {data && parseInt(data.header.number)}</div>
                  <div className='withRowLeftAuto'>
                    
                  </div>
                </div>
              </div>
              <div  className='blockBody'>
                <div className='withRow blockBodyRow'>
                  <div className='blockDetailKey'>Block Hash:</div>
                  <div className='blockDetailValue withRowLeftAuto'>{data && data.hash}</div>
                </div>
                <div className='withRow blockBodyRow'>
                  <div className='blockDetailKey'>TimeStamp:</div>
                  <div className='blockDetailValue withRowLeftAuto'>{data && data.header.timestamp}</div>
                </div>
                <div className='withRow blockBodyRow'>
                  <div className='blockDetailKey'>Transactions</div>
                  <div className='blockDetailValue withRowLeftAuto'>{data && data.body.transactions.length}</div>
                </div>
                <div className='withRow blockBodyRow'>
                  <div className='blockDetailKey'>Proposer:</div>
                  <div className='blockDetailValue withRowLeftAuto'>{data && data.header.proposer}</div>
                </div>
                <div className='withRow blockBodyRow'>
                  <div className='blockDetailKey'>Quota Used:</div>
                  <div className='blockDetailValue withRowLeftAuto'>{data && data.header.quotaUsed}</div>
                </div>
                <div className='withRow blockBodyRow'>
                  <div className='blockDetailKey'>Quota price:</div>
                  <div className='blockDetailValue withRowLeftAuto'>{data && data.header.quotaUsed}</div>
                </div>
                <div className='withRow blockBodyRow'>
                  <div className='blockDetailKey'>Total handling fee:</div>
                  <div className='blockDetailValue withRowLeftAuto'>{data && data.hash}</div>
                </div>
                <div className='withRow blockBodyRow'>
                  <div className='blockDetailKey'>Parent Hash:</div>
                  <div className='blockDetailValue withRowLeftAuto'>{data && data.header.prevHash}</div>
                </div>
                <div className='withRow blockBodyRow'>
                  <div className='blockDetailKey'>Receipts Root:</div>
                  <div className='blockDetailValue withRowLeftAuto'>{data && data.header.receiptsRoot}</div>
                </div>
                <div className='withRow blockBodyRow'>
                  <div className='blockDetailKey'>State Root:</div>
                  <div className='blockDetailValue withRowLeftAuto'>{data && data.header.stateRoot}</div>
                </div>
                <div className='withRow blockBodyRow'>
                  <div className='blockDetailKey'>Transactions Root:</div>
                  <div className='blockDetailValue withRowLeftAuto'>{data && data.header.transactionsRoot}</div>
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
import * as blockAction from '../../redux/actions/block'

import { IRootState } from '../../redux/states'
import { connect } from 'react-redux'

export default connect( (state:IRootState)=> ({app: state.app,block:state.block}), dispatch => ({
  appAction: bindActionCreators(appAction, dispatch),
  blockAction: bindActionCreators(blockAction, dispatch)

}))(injectIntl(BlockDetail))
