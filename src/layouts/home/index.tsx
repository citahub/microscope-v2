import * as React from 'react'
import './index.styl'
import Layout from '../../components/layout'
import Content from '../../components/content'
import CustomHeader from '../common/customHeader'
import CustomFooter from '../common/customFooter'


import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as appAction from '../../redux/actions/appAction'

// import { hashHistory } from 'react-router';

// import { FormattedMessage } from 'react-intl';

import * as citaAPI from '../../utils/citaAPI';

import { IRootState } from '../../redux/states'
class Home extends React.Component<any,any>{
  constructor(props:any) {
    super(props);
    this.state = {
      top10Blocks: [],
      metaData: null
    }

  }
  componentDidMount(){
    // citaAPI.base.getBlockNumber().then((d)=>{
    //   var blockId = d;
    //   // console.log(blockId);
    //   citaAPI.base.getBlock(blockId).then(function(block){
    //     console.log(block);
    //
    //   })
    //
    // })
    var self = this;
    console.log(citaAPI);
    citaAPI.newBlockFilter().then((filterId)=>{
      console.log(filterId);
      var newBlock = function(){
        citaAPI.getFilterChanges(filterId).then((newBlocks)=>{
          console.log(newBlocks,new Date());
          newBlocks.forEach(function(newBlock){
            citaAPI.getBlockByHash(newBlock).then(function(block){
              var newTop10Blocks = self.state.top10Blocks.concat([block]);
              newTop10Blocks.sort((b1,b2)=>{
                if(b1.header.timestamp<=b2.header.timestamp) {
                  return 1;
                }else{
                  return -1;
                }
              });
              newTop10Blocks = newTop10Blocks.slice(0,10);
              console.log(newTop10Blocks);
              self.setState({
                top10Blocks: newTop10Blocks
              })
            })
          })
          setTimeout(()=>{newBlock()},3000);
        })
      }
      newBlock();
    })

    // citaAPI.base.newBlockFilter().then((filterId)=>{
    //   console.log(filterId);
    //   var newBlock = function(){
    //     citaAPI.base.getFilterChanges(filterId).then((newBlocks)=>{
    //       console.log(newBlocks,new Date());
    //       newBlocks.forEach(function(newBlock){
    //         citaAPI.base.getBlockByHash(newBlock,true).then(function(block){
    //           var newTop10Blocks = self.state.top10Blocks.concat([block]);
    //           newTop10Blocks.sort((b1,b2)=>{
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
    // citaAPI.base.getMetaData().then((metaData)=>{
    //   console.log(metaData,"werwerewrewr");
    //   self.setState({
    //     metaData: metaData
    //   })
    // })

    // citaAPI.base.newMessageFilter().then((filterId)=>{
    //   console.log(filterId,"newFilter");
    //   var newChange = function(){
    //     citaAPI.base.getFilterChanges(filterId).then((d2)=>{
    //       console.log(d2,"newFilter");
    //       setTimeout(()=>{newChange()},3000);
    //     })
    //   }
    //   newChange();
    //
    // })
  }

  onScrollHander(event){
    var scrollTop = event.target.scrollTop;
  }


  render() {
    var self = this;
    var bgWidth = self.props.app.appWidth;
    var metaData = self.state.metaData;
    return (
      <Layout className='home' bgColor="rgba(249, 249, 249, 0.56)">
        <Content style={{ width: '100%', height: '100%' }} onScroll={self.onScrollHander.bind(self)}>
          <CustomHeader/>
          <div className="container">
            <div style={{ marginTop: 20 }}>
              <div className="row" style={{ marginLeft: -15, marginRight: -15 }}>
                <div className='generalItem col-xs-12 col-sm-9 col-md-6 col-lg-4'>
                  <div style={{ position:'relative', background: "url('./images/content1_bg.png') no-repeat"}}>
                    <div className='generalItemIcon'>
                      <img src="./images/content1_high.png"/>
                    </div>
                    <div className='generalItem1Label'>{self.state.top10Blocks && self.state.top10Blocks[0]? self.state.top10Blocks[0].header.number:"?"}</div>
                    <div className='generalItem2Label'>Block Height</div>
                  </div>
                </div>
                <div className='generalItem col-xs-12 col-sm-9 col-md-6 col-lg-4'>
                  <div style={{ background: "url('./images/content1_bg.png') no-repeat"}}>
                    <div className='generalItemIcon'>
                      <img src="./images/content1_spacing.png"/>
                    </div>
                    <div className='generalItem1Label'>{metaData?metaData.blockInterval:"?"}</div>
                    <div className='generalItem2Label'>Block Interval</div>
                  </div>
                </div>
                <div className='generalItem col-xs-12 col-sm-9 col-md-6 col-lg-4'>
                  <div style={{ background: "url('./images/content1_bg.png') no-repeat"}}>
                    <div className='generalItemIcon'>
                      <img src="./images/content1_node.png"/>
                    </div>
                    <div className='generalItem1Label'>{metaData?metaData.validators.length:"?"}</div>
                    <div className='generalItem2Label'>Validators</div>
                  </div>
                </div>
              </div>
              <div className="row" style={{  marginTop: 30, minHeight: 150, backgroundColor: "white" }}>
                <div className='col-xs-12 col-sm-9 col-md-6 col-lg-4'>
                  <div>{metaData?metaData.chainName:"?"}</div>
                  <div>Chain Name</div>
                  <div>{metaData?metaData.tokenSymbol:"?"}</div>
                  <div>Token Symbol</div>
                </div>
                <div className='col-xs-12 col-sm-9 col-md-6 col-lg-4'>
                  <div>{metaData?metaData.operator:"?"}</div>
                  <div>Operator</div>
                  <div>{metaData?metaData.chainId:"?"}</div>
                  <div>Chain ID</div>
                </div>
                <div className='col-xs-12 col-sm-9 col-md-6 col-lg-4'>
                  <div>{metaData?metaData.economicalModel:"?"}</div>
                  <div>Economical Model</div>
                  <div>{metaData?metaData.version:"?"}</div>
                  <div>Version</div>
                </div>
              </div>
            </div>
            <div style={{ marginBottom: 179, marginTop: 60 }}>
              <div className="row" style={{ backgroundColor: "transparent" }}>
                <div className='col-6' style={{ margin: 0, padding: 0, paddingRight: 16 }}>
                  <div className='row' style={{ height: 25 }}>
                    <div className='col-6' style={{ textAlign: "left", fontSize: 18, lineHeight: "18px", color: "#47484a"}}>最近10个块</div>
                    <div className='col-6' style={{ textAlign: "right", fontSize: 14,lineHeight: "14px", color: "#979a9e"}}>查看更多 &gt;</div>
                  </div>
                  <div>
                    {
                      self.state.top10Blocks.map(function(block,i){
                        return (
                          <div className='blockItem'>
                            <div >
                              <div className="vhCenter">
                                块#{block.header.number}
                              </div>
                              <div>
                                <div style={{ color: "#47484a"}}>Hash:</div>
                                <div style={{  color: "#5b8ee6" }}>{block.hash}</div>
                                <div style={{ marginTop: 9, color: "#47484a"}}>包含 {block.body.transactions.length} 笔交易</div>
                                <div style={{ color: "#979a9e", marginTop:3 }}>提案来自…{block.header.proposer}…</div>

                              </div>
                              <div>
                                3s
                              </div>
                            </div>
                          </div>
                        )
                      })
                    }
                  </div>
                </div>
                <div className='col-6' style={{ margin: 0, padding: 0, paddingLeft: 16 }}>
                  <div className='row' style={{ height: 25 }}>
                    <div className='col-6' style={{ textAlign: "left", fontSize: 18, lineHeight: "18px",color: "#47484a"}}>最近10笔交易</div>
                    <div className='col-6' style={{ textAlign: "right", fontSize: 14, lineHeight: "14px",color: "#979a9e"}}>查看更多 &gt;</div>
                  </div>
                  <div>
                    {
                      // new Array(10).fill(0).map(function(d,i){
                      //   return (
                      //     <div className='transactionItem'>
                      //       {i}
                      //     </div>
                      //   )
                      // })
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

export default connect( (state:IRootState)=> ({app: state.app}), dispatch => ({
  appAction: bindActionCreators(appAction, dispatch)
}))(injectIntl(Home))
