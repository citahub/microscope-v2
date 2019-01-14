import * as React from 'react'
import './detail.styl'
import Layout from '../../components/layout'
import Content from '../../components/content'
import CustomHeader from '../common/customHeader'
import CustomFooter from '../common/customFooter'

import { hashHistory } from 'react-router';

import * as citaAPI from '../../utils/citaAPI';


class AccountDetail  extends React.Component<any,any> {
  constructor(props:any) {
    super(props);
    this.state={
      data: null,
    }
  }
  componentDidMount(){
    var self = this;
    console.log(self.props.location);
    console.log(self.props.params);
    var params = self.props.params;
    // if(params && params.hash){
    //
    // }else if(params && params.id){
    //
    // }
    // citaAPI.getaccount(params.hash || params.id).then((account: any)=>{
    //   console.log(account);
    //   self.setState({
    //     data: account
    //   })
    // })
  }
  render() {
    var self = this;
    var data = self.state.data;
    return (
      <Layout className='accountDetail' bgColor='#fbfbfb'>
        <Content style={{ width: '100%', height: '100%' }}>
          <CustomHeader/>
          <div style={{ width: '100%', backgroundImage: 'url("./images/list_bg.png")', backgroundRepeat: 'no-repeat', paddingTop: 96, paddingBottom: 85}}>
            <div className='container'>
              <div className='accountNav row'>
                <div className='col-6'>
                  account: #
                </div>
                <div className='col-6'>
                  Balance: #
                </div>

              </div>
              <div  className='accountBody'>
                
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
import { IRootState } from '../../redux/states'
import { connect } from 'react-redux'

export default connect( (state:IRootState)=> ({app: state.app}), dispatch => ({
  appAction: bindActionCreators(appAction, dispatch)
}))(injectIntl(AccountDetail))
