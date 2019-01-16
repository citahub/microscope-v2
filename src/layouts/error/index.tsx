import * as React from 'react'
import './index.styl'
import Layout from '../../components/layout'
import Content from '../../components/content'
import { hashHistory } from 'react-router';
class NotFoundPage  extends React.Component<any,any> {
  constructor(props:any) {
    super(props);
  }
  componentDidMount(){
  }
  render() {
    // var self = this;
    return (
      <Layout className='error' bgColor='white'>
        <Content>
          <div className='container'>
            <div className='vhCenter' style={{ marginTop: 257}}>
              <img src='images/404.png' srcSet="images/404@2x.png 2x, 404/logo@3x.png 3x" style={{ width: 130, height: 48}}/>
            </div>
            <div className='errorLabel'>
              哎呀呀，你要访问的页面没有找到！
            </div>
            <div className='vhCenter' style={{  marginTop: 87, textAlign: 'center' }}>
              <button className='errorButton' onClick={()=>(hashHistory.push('/'))} >
                <span>返回首页</span>
              </button>
            </div>
          </div>
        </Content>
      </Layout>
    );
  }
}
import {injectIntl} from 'react-intl';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as appAction from '../../redux/actions/appAction'
import { IRootState } from '../../redux/states'

export default connect( (state:IRootState) => ({app: state.app}), dispatch => ({
  appAction: bindActionCreators(appAction, dispatch)
}))(injectIntl(NotFoundPage))
