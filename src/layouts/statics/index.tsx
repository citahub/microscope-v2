import React from 'react'
import './index.styl'
import Layout from '../../components/layout'
// import { hashHistory } from 'react-router';
import Header from '../common/Header'
import Footer from '../common/Footer'
import ReactEcharts from 'echarts-for-react'

class Statics extends React.Component<any, any> {
  timer: any
  componentWillMount() {
    var self = this
    self.props.blockAction.topBlocks()
    self.props.transactionAction.topTransactions()
    self.props.staticsAction.staticsProposals()
  }
  componentDidMount() {
    var self = this

    // currently no websocket
    self.timer = setInterval(() => {
      if (self.props.block.latest) {
        var nextBlockId = null
        try {
          nextBlockId = parseInt(self.props.block.latest.header.number) + 1
        } catch (e) {}
        self.props.blockAction.updateNextBlock(nextBlockId)
      } else {
        self.props.blockAction.updateNextBlock(null)
      }
      self.props.staticsAction.staticsProposals()
    }, 3000)
  }
  componentWillUnmount() {
    var self = this
    clearInterval(self.timer)
  }
  render() {
    var self = this
    var blocks = self.props.block.topList || []
    var transactions = self.props.transaction.topList || []

    var blockHeightsArray = blocks.map((block: any) => {
      return parseInt(block.header.number)
    })
    var blockTransactionCountArray = blocks.map((block: any) => {
      return (
        (block.body &&
          block.body.transactions &&
          block.body.transactions.length) ||
        0
      )
    })
    var blockQuotoUsedArray = blocks.map((block: any) => {
      return block.header.quotaUsed || 0
    })
    var transactionHashArray = transactions.map((transaction: any) => {
      return transaction.hash
    })
    var transactionQuotoUsedArray = transactions.map((transaction: any) => {
      return parseInt(transaction.gasUsed,16) || 0
    })

    var blockDurationArray = []
    for (var i = 0; i < blocks.length; i++) {
      if (i == 0) {
        blockDurationArray[i] = 3000
      } else {
        blockDurationArray[i] =
          blocks[i - 1].header.timestamp - blocks[i].header.timestamp
      }
    }
    blockHeightsArray.reverse()
    blockDurationArray.reverse()
    blockTransactionCountArray.reverse()
    transactionHashArray.reverse()
    transactionQuotoUsedArray.reverse()
    blockQuotoUsedArray.reverse()

    var proposals = self.props.statics.proposals || []
    var proposalsArray = proposals.map((p:any)=>{ return  { value: p.count,name: p.validator}})
    
    return (
      <Layout className="statics" bgColor="white">
        <Header location={self.props.location} app={self.props.app} />
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
            className="container staticsBody"
            style={{ minHeight: 690, paddingTop: 47 }}
          >
            <div className="row">
              <div className="col-xs-12 col-sm-12 col-md-6 col-lg-6">
                <ReactEcharts
                  option={{
                    title: {
                      text: 'Interval(ms) for Latest 10 Blocks'
                    },
                    tooltip: {},
                    color: ['#415dfc', ],
                    xAxis: {
                      data: blockHeightsArray
                    },
                    yAxis: {},
                    series: [
                      {
                        type: 'bar',
                        data: blockDurationArray,
                      },
                    ]
                  }}
                  style={{ height: '400px', width: '100%' }}
                  opts={{ renderer: 'svg' }}
                  className="react_for_echarts"
                />
              </div>
              <div className="col-xs-12 col-sm-12 col-md-6 col-lg-6">
                <ReactEcharts
                  option={{
                    title: {
                      text: 'Transaction Count in Latest 10 Blocks'
                    },
                    tooltip: {},
                    color: ['#fca441', ],
                    xAxis: {
                      data: blockHeightsArray
                    },
                    yAxis: {},
                    series: [
                      {
                        type: 'bar',
                        data: blockTransactionCountArray
                      }
                    ]
                  }}
                  style={{ height: '400px', width: '100%' }}
                  opts={{ renderer: 'svg' }}
                  className="react_for_echarts"
                />
              </div>
              <div className="col-xs-12 col-sm-12 col-md-6 col-lg-6">
                <ReactEcharts
                  option={{
                    title: {
                      text: 'Quoto Used in Latest 10 Blocks'
                    },
                    tooltip: {},
                    color: ['#4db7f8', ],
                    xAxis: {
                      data: blockHeightsArray
                    },
                    yAxis: {},
                    series: [
                      {
                        type: 'bar',
                        data: blockQuotoUsedArray
                      }
                    ]
                  }}
                  style={{ height: '400px', width: '100%' }}
                  opts={{ renderer: 'svg' }}
                  className="react_for_echarts"
                />
              </div>
              <div className="col-xs-12 col-sm-12 col-md-6 col-lg-6">
                <ReactEcharts
                  option={{
                    title: {
                      text: 'Gas Used in Latest 10 Transactions'
                    },
                    tooltip : {
                      trigger: 'item',
                      formatter: "<div style='max-width: 100px;overflow: hidden;text-overflow:ellipsis;white-space:nowrap;'>{b}:</div> {c} "
                    },
                    color: ['#ab62f1', ],
                    xAxis: {
                      data: transactionHashArray,
                      axisLabel: {
                        show: false,
                      },
                    },
                    yAxis: {},
                    series: [
                      {
                        type: 'bar',
                        data: transactionQuotoUsedArray
                      }
                    ]
                  }}
                  style={{ height: '400px', width: '100%' }}
                  opts={{ renderer: 'svg' }}
                  className="react_for_echarts"
                />
              </div>

              <div className="col-xs-12 col-sm-12 col-md-6 col-lg-6">
                <ReactEcharts
                  option={
                    {
                      title: {
                        text: "Proposal Distribution"
                      },
                      tooltip : {
                        trigger: 'item',
                        formatter: "{a}<br/><div style='max-width: 100px;overflow: hidden;text-overflow:ellipsis;white-space:nowrap;'>{b}:</div> {c} ({d}%)"
                      },
                      calculable : true,
                      series : [
                          {
                              name:'Proposal',
                              type:'pie',
                              color: ['#415dfc', '#ab62f1', '#fca441', '#4db7f8', ],
                              radius : ['50%', '70%'],
                              itemStyle : {
                                  normal : {
                                      label : {
                                          show : false
                                      },
                                      labelLine : {
                                          show : false
                                      }
                                  },
                                  emphasis : {
                                      label : {
                                          show : true,
                                          position : 'center',
                                          textStyle : {
                                              fontSize : '10',
                                              fontWeight : 'bold'
                                          }
                                      }
                                  }
                              },
                              data: proposalsArray
                          }
                      ]
                  }
                  }
                  style={{ height: '400px', width: '100%' }}
                  opts={{ renderer: 'svg' }}
                  className="react_for_echarts"
                />
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
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as appAction from '../../redux/actions/appAction'
import * as staticsAction from '../../redux/actions/statics'
import * as blockAction from '../../redux/actions/block'
import * as transactionAction from '../../redux/actions/transaction'
import { IRootState } from '../../redux/states'

export default connect(
  (state: IRootState) => ({
    app: state.app,
    block: state.block,
    transaction: state.transaction,
    statics: state.statics
  }),
  dispatch => ({
    appAction: bindActionCreators(appAction, dispatch),
    staticsAction: bindActionCreators(staticsAction, dispatch),
    blockAction: bindActionCreators(blockAction, dispatch),
    transactionAction: bindActionCreators(transactionAction, dispatch)
  })
)(injectIntl(Statics))
