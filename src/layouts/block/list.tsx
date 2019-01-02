import * as React from 'react'
import './list.styl'
import Layout from '../../components/layout'
import Header from '../../components/header'
import Content from '../../components/content'
import CustomHeader from '../common/customHeader'
import CustomFooter from '../common/customFooter'

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as appAction from '../../redux/actions/appAction'
import { hashHistory } from 'react-router';

import * as cacheAPI from '../../utils/cacheAPI';

class BlockList  extends React.Component<any,any> {
  constructor(props) {
    super(props);
    this.state={
      data: []
    }
  }
  componentDidMount(){
    var self = this;
    cacheAPI.blockList().then((d)=>{
      console.log(d);
      self.setState({
        data: d.result.blocks
      })
    })
  }
  render() {
    var self = this;
    return (
      <Layout className='blockList' bgColor='white'>
        <Content style={{ width: '100%', height: '100%' }}>
          <CustomHeader/>
          <div className="container" style={{ minHeight: 863 }}>
            <table>
              <thead>
                  <th>高度</th>
                  <th>Hash</th>
                  <th>Age</th>
                  <th>交易</th>
                  <th>Quota 消耗</th>
              </thead>
              <tbody>
              {
              self.state.data && self.state.data.map(function(d,i){
                return (
                  <tr>
                      <td>{d.blockNumber}</td>
                      <td>{d.hash}</td>
                      <td>{d.blockNumber}</td>
                      <td>{d.blockNumber}</td>
                      <td>{d.quotaUsed}</td>
                  </tr>
                )
              })
            }
              </tbody>
            </table>
          </div>
          <CustomFooter/>
        </Content>
      </Layout>
    );
  }
}
import {injectIntl} from 'react-intl';

export default connect(state => ({}), dispatch => ({
  appAction: bindActionCreators(appAction, dispatch)
}))(injectIntl(BlockList))
