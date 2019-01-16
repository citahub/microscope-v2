import * as React from 'react'
import './index.styl'
import Layout from '../../components/layout'
import Content from '../../components/content'
import CustomHeader from '../common/customHeader'
import CustomFooter from '../common/customFooter'
import { CSSTransitionGroup } from 'react-transition-group' // ES6

import { hashHistory } from 'react-router';
// import { FormattedMessage } from 'react-intl';
// import * as citaAPI from '../../utils/citaAPI';
// import * as cacheAPI from '../../utils/cacheAPI';

import { timePassed } from '../../utils/time'

import { valueFormat } from '../../utils/hex'

// import * as Web3Utils from 'web3-utils';
class Home extends React.Component<any, any>{
  topBlocksTimer: any;
  topTransactionsTimer: any;
  componentDidMount(){

    var self = this;
    self.props.networkAction.getMetaData();
    self.props.blockAction.topBlocks();
    self.props.transactionAction.topTransactions();
    // self.topBlocksTimer = setInterval(()=>{
    //   self.props.blockAction.topBlocks();
    // },3000)
    // self.topTransactionsTimer = setInterval(()=>{
    //   self.props.transactionAction.topTransactions();
    // },3000)

    // self.props.networkAction.getLatestBlock();
    // citaAPI.newBlockFilter().then((filterId:string)=>{
    //   console.log(filterId);
    //   var newBlock = function(){
    //     citaAPI.getFilterChanges(filterId).then((newBlocks: Array<any>)=>{
    //       console.log(newBlocks,new Date());
    //       newBlocks.forEach(function(newBlock: any){
    //         citaAPI.getBlockByHash(newBlock).then(function(block: any){
    //           var newTop10Blocks = self.state.top10Blocks.concat([block]);
    //           newTop10Blocks.sort((b1:any,b2:any)=>{
    //             if(b1.header.timestamp<=b2.header.timestamp) {
    //               return 1;
    //             }else{
    //               return -1;
    //             }
    //           });
    //           newTop10Blocks = newTop10Blocks.slice(0,10);
    //           console.log(newTop10Blocks);
    //           self.setState({
    //             top10Blocks: newTop10Blocks
    //           })
    //         })
    //       })
    //       setTimeout(()=>{newBlock()},3000);
    //     })
    //   }
    //   newBlock();
    // })
    // citaAPI.getMetaData().then((metaData:object)=>{
    //   console.log(metaData,"werwerewrewr");
    //   self.setState({
    //     metaData: metaData
    //   })
    // })
    // cacheAPI.topTransactions().then((data:Array<any>)=>{
    //   self.setState({
    //     top10Transactions: data || []
    //   })
    // })

  }

  // onScrollHander(event){
  //   var scrollTop = event.target.scrollTop;
  // }


  render() {
    var self = this;
    // var bgWidth = self.props.app.appWidth;
    var metaData = self.props.network.metaData;
    var topBlocks = self.props.block.topList;
    var topTransactions = self.props.transaction.topList;
    var globalTickTime = self.props.app.globalTickTime;
    return (
      <Layout className='home' bgColor="rgba(249, 249, 249, 0.56)">
        <Content style={{ width: '100%', height: '100%' }}>
          <CustomHeader/>
          <div className="container">
            <div style={{ marginTop: 20 }}>
              <div className="row" style={{ marginLeft: -15, marginRight: -15 }}>
                <div className='generalItem col-xs-12 col-sm-9 col-md-6 col-lg-4'>
                  <div style={{ position:'relative', background: "url('./images/content1_bg.png') no-repeat"}}>
                    <div className='generalItemIcon'>
                      <img src="./images/content1_high.png"/>
                    </div>
                    <div className='generalItem1Label'>{topBlocks && topBlocks[0]? parseInt(topBlocks[0].header.number):"?"}</div>
                    <div className='generalItem2Label'>区块高度</div>
                  </div>
                </div>
                <div className='generalItem col-xs-12 col-sm-9 col-md-6 col-lg-4'>
                  <div style={{ background: "url('./images/content1_bg.png') no-repeat"}}>
                    <div className='generalItemIcon'>
                      <img src="./images/content1_spacing.png"/>
                    </div>
                    <div className='generalItem1Label'>{metaData?metaData.blockInterval:"?"}</div>
                    <div className='generalItem2Label'>出块间隔</div>
                  </div>
                </div>
                <div className='generalItem col-xs-12 col-sm-9 col-md-6 col-lg-4'>
                  <div style={{ background: "url('./images/content1_bg.png') no-repeat"}}>
                    <div className='generalItemIcon'>
                      <img src="./images/content1_node.png"/>
                    </div>
                    <div className='generalItem1Label'>{metaData?metaData.validators.length:"?"}</div>
                    <div className='generalItem2Label'>共识节点</div>
                  </div>
                </div>
              </div>
              <div className="row" style={{ marginLeft: 0, marginRight: 0, marginTop: 30, paddingTop: 8, paddingBottom: 8, minHeight: 150, backgroundColor: "white", borderRadius: 6, boxShadow: "0 4px 16px 0 rgba(86, 129, 204, 0.1)" }}>
                <div className='col-xs-12 col-sm-6 col-md-6 col-lg-4' style={{ marginTop: 12 }}>
                  <div className='withRow'>
                    <div className='generalInfoItemIcon' style={{ width: 80 }}>
                      <img src="images/general_info_name.png"/>
                    </div>
                    <div className='withRowLeftAuto' style={{ paddingLeft: 20 }}>
                      <div className='generalInfoItemName'>{metaData?metaData.chainName:"?"}</div>
                      <div className='generalInfoItemLabel'>名称</div>
                    </div>
                  </div>
                </div>
                <div className='col-xs-12 col-sm-6 col-md-6 col-lg-4' style={{ marginTop: 12 }}>
                  <div className='withRow'>
                    <div className='generalInfoItemIcon' style={{ width: 80 }}>
                      <img src="images/general_info_operator.png"/>
                    </div>
                    <div className='withRowLeftAuto' style={{ paddingLeft: 20 }}>
                      <div className='generalInfoItemName'>{metaData?metaData.operator:"?"}</div>
                      <div className='generalInfoItemLabel'>运营方</div>
                    </div>
                  </div>
                </div>
                <div className='col-xs-12 col-sm-6 col-md-6 col-lg-4' style={{ marginTop: 12 }}>
                  <div className='withRow'>
                    <div className='generalInfoItemIcon' style={{ width: 80 }}>
                      <img src="images/general_info_mode.png"/>
                    </div>
                    <div className='withRowLeftAuto' style={{ paddingLeft: 20 }}>
                      <div className='generalInfoItemName'>{metaData?metaData.economicalModel:"?"}</div>
                      <div className='generalInfoItemLabel'>经济模型</div>
                    </div>
                  </div>
                </div>
                <div className='col-xs-12 col-sm-6 col-md-6 col-lg-4' style={{ marginTop: 12 }}>
                  <div className='withRow'>
                    <div className='generalInfoItemIcon' style={{ width: 80 }}>
                      <img src="images/general_info_token.png"/>
                    </div>
                    <div className='withRowLeftAuto' style={{ paddingLeft: 20 }}>
                      <div className='generalInfoItemName'>{metaData?metaData.tokenSymbol:"?"}</div>
                      <div className='generalInfoItemLabel'>代币名称</div>
                    </div>
                  </div>
                </div>
                <div className='col-xs-12 col-sm-6 col-md-6 col-lg-4' style={{ marginTop: 12 }}>
                  <div className='withRow'>
                    <div className='generalInfoItemIcon' style={{ width: 80 }}>
                      <img src="images/general_info_chain.png"/>
                    </div>
                    <div className='withRowLeftAuto' style={{ paddingLeft: 20 }}>
                      <div className='generalInfoItemName'>{metaData?metaData.chainId:"?"}</div>
                      <div className='generalInfoItemLabel'>链ID</div>
                    </div>
                  </div>
                </div>
                <div className='col-xs-12 col-sm-6 col-md-6 col-lg-4' style={{ marginTop: 12 }}>
                  <div className='withRow'>
                    <div className='generalInfoItemIcon' style={{ width: 80 }}>
                      <img src="images/general_info_version.png"/>
                    </div>
                    <div className='withRowLeftAuto' style={{ paddingLeft: 20 }}>
                      <div className='generalInfoItemName'>{metaData?metaData.version:"?"}</div>
                      <div className='generalInfoItemLabel'>版本号</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div style={{ marginBottom: 179, marginTop: 30 }}>
              <div className="row" style={{ backgroundColor: "transparent", marginLeft: -15, marginRight: -15 }}>
                <div className='col-xs-12 col-sm-9 col-md-6 col-lg-6' style={{  marginTop:30 }}>
                  <div className='row' style={{ height: 25 }}>
                    <div className='col-6' style={{ textAlign: "left", fontSize: 18, lineHeight: "18px", color: "#47484a"}}>最近10个块</div>
                    <div className='col-6 operationItem' style={{ textAlign: "right", fontSize: 14,lineHeight: "14px", color: "#979a9e"}} onClick={()=>{hashHistory.push('/block/list')}}>查看更多 &gt;</div>
                  </div>
                  <div style={{ overflow: 'hidden'}}>

                        {
                          topBlocks && topBlocks.map(function(block:any,i:number){
                            var blockNumber = parseInt(block.header.number);
                            return (
                              <div key={block.hash} className='blockItem withRow'>
                                <div style={{ width: 138 }}>
                                  <div className="blockItemNumber vhCenter operationItem" style={{ backgroundImage: 'url("./images/block_header.svg")'}} onClick={()=>{hashHistory.push("/block/id/" + blockNumber)}}>
                                    块<br/>#{blockNumber}
                                  </div>
                                </div>
                                <div className='withRowLeftAuto'>
                                  <div className='blockItemHashLabel'>Hash:</div>
                                  <div className='blockItemHash operationItem'  onClick={()=>{hashHistory.push("/block/hash/" + block.hash)}}>{block.hash}</div>
                                  <div className='blockItemTranscation'>包含 {block.transactionsCount} 笔交易</div>
                                  <div className='blockItemFrom'>提案来自…{block.header.proposer}…</div>
                                  <div className='blockItemReward'>Block Reward ??? Ether</div>

                                </div>
                                <div className='blockItemTime' style={{ width: 53 }}>
                                  {timePassed( globalTickTime - block.header.timestamp )}
                                </div>
                              </div>
                            )
                          })
                        }
                  </div>
                </div>
                <div className='col-xs-12 col-sm-9 col-md-6 col-lg-6' style={{  marginTop: 30 }}>
                  <div className='row' style={{ height: 25 }}>
                    <div className='col-6' style={{ textAlign: "left", fontSize: 18, lineHeight: "18px",color: "#47484a"}}>最近10笔交易</div>
                    <div className='col-6 operationItem' style={{ textAlign: "right", fontSize: 14, lineHeight: "14px",color: "#979a9e"}}  onClick={()=>{hashHistory.push('/transaction/list')}}>查看更多 &gt;</div>
                  </div>
                  <div>

                      {
                        topTransactions && topTransactions.map(function(d:any,i:number){
                          return (
                            <div key={i} className='transactionItem withRow'>
                              <div style={{ width: 88 }}>
                                <div className='transactionItemIcon'>
                                  <img src='images/content2_contract.png'/>
                                </div>
                              </div>
                              <div className='withRowLeftAuto'>
                                <div className='transactionItemTxLabel'>
                                  TX#：
                                </div>
                                <div className='transactionItemTxHash operationItem'  onClick={()=>{hashHistory.push("/transaction/hash/" + d.hash)}}>{d.hash}</div>
                                <div className='row' style={{ margin: 0, marginTop: 4 }}>
                                  <div className='col-6' style={{ padding: 0 , paddingRight: 6}}>
                                    <div className='transactionItemFromLabel'>
                                      From：
                                    </div>
                                    <div className='transactionItemFrom operationItem' onClick={()=>{hashHistory.push("/account/" + d.from)}}>
                                      {d.from}
                                    </div>
                                  </div>
                                  <div className='col-6' style={{ padding: 0, paddingLeft: 6 }}>
                                    <div className='transactionItemToLabel'>
                                      To：
                                    </div>
                                    <div className='transactionItemTo operationItem' onClick={()=>{hashHistory.push("/account/" + d.to)}}>
                                      {d.to}
                                    </div>
                                  </div>
                                </div>
                                <div className='transactionItemValue' style={{ marginTop: 4 }}>value: {metaData? valueFormat(d.value,metaData.tokenSymbol):valueFormat(d.value)}</div>
                              </div>
                              <div className='transactionItemTime' style={{ width: 53 }}>
                                {timePassed( globalTickTime - d.timestamp )}
                              </div>
                            </div>
                          )
                        })
                      }
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
import * as networkAction from '../../redux/actions/network'
import * as blockAction from '../../redux/actions/block'
import * as transactionAction from '../../redux/actions/transaction'

import { IRootState } from '../../redux/states'
import { connect } from 'react-redux'

export default connect( (state:IRootState)=> ({app: state.app,network: state.network,block:state.block,transaction: state.transaction}), (dispatch) => ({
  appAction: bindActionCreators(appAction, dispatch),
  networkAction: bindActionCreators(networkAction, dispatch),
  blockAction: bindActionCreators(blockAction, dispatch),
  transactionAction: bindActionCreators(transactionAction, dispatch),
}))(injectIntl(Home))
