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



class TransitionList  extends React.Component<any,any> {
  constructor(props) {
    super(props);
    this.state={
      data: null
    }
  }
  componentDidMount(){
    var self = this;
    cacheAPI.transactionList().then((d)=>{
      console.log(d);
      self.setState({
        data: d.result.transactions
      })
    })
  }
  render() {
    var self = this;
    return (
      <Layout className='transitionList' bgColor='white'>
        <Content style={{ width: '100%', height: '100%' }}>
          <CustomHeader/>
          <div className="container" style={{ minHeight: 863 }}>
            transitionList
            <table>
              <thead>
                  <th>Hash</th>
                  <th>from</th>
                  <th>to</th>
                  <th>value</th>
              </thead>
              <tbody>
              {
              self.state.data && self.state.data.map(function(d,i){
                return (
                  <tr>
                      <td>{d.hash}</td>
                      <td>{d.from}</td>
                      <td>{d.to}</td>
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
}))(injectIntl(TransitionList))
