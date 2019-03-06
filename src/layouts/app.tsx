import  React from 'react';
import 'bootstrap/dist/css/bootstrap.css'
import './app.styl'
import Loading from '../components/loading'
import Toast from '../components/toast'
import Modal from '../components/modal'

import { hashHistory } from 'react-router';

import { connect } from 'react-redux'
import { bindActionCreators, Dispatch } from 'redux'

import * as appAction from '../redux/actions/appAction'
import {  AppAction } from '../redux/actions/appAction'
import { IRootState } from '../redux/states'
import { AppState } from '../redux/states/appState'
import { IntlProvider, addLocaleData } from 'react-intl';

import * as enLocaleData from 'react-intl/locale-data/en';
import * as zhLocaleData from 'react-intl/locale-data/zh';

addLocaleData(enLocaleData);
addLocaleData(zhLocaleData);


import * as zh_CN from '../locale/zh_CN';
import * as en_US from '../locale/en_US';

// import "babel-polyfill";

function chooseLocale(language:string){
  var obj = en_US;
  if(language.indexOf('zh')>-1){
    obj= zh_CN;
  }else if(language.indexOf('en')>-1){
    obj= en_US;
  }
  return obj;
}

class App extends React.Component <any, any>{
  unlisten: any=null;
  tick:any;
  componentDidMount() {
    var self = this;
    self.props.appAction.resize(window.innerWidth,window.innerHeight);
    window.addEventListener('resize',function(){
      self.props.appAction.resize(window.innerWidth,window.innerHeight);
    },false)

    let lastLocation = ''; // hack hash history twice render bug on react-router 3.0
    this.unlisten = hashHistory.listen(location => {
      if (lastLocation !== location.pathname) {
        lastLocation = location.pathname;
      }
    });

    this.tick = setInterval(function(){
      self.props.appAction.tickTime();
    },3000)

    // ethereumAPI.paused().then(function(d){
    //   alert(d);
    //   console.log(JSON.stringify(d));
    // })
    // ethereumAPI.appToOwner(0).then(function(d){
    //   console.log(d,"appToOwner");
    // }).catch(function(e){
    //   console.log(e,"appToOwner");
    // })


  }
  componentDidCatch(error:any, info:any) {
    console.log(error,"componentDidCatch");
    console.log(info,"componentDidCatch");
    if(this.tick)window.clearInterval(this.tick)
  }
  render() {
    var modalUI = null;
    var modalUIShow = false;
    var modalUIStyle = {};
    var maskTopPoz = 0;
    var maskColor = 'rgba(0,0,0,0.7)';
    if (this.props.app.modal.ui !== null) {
      if (this.props.app.modal.uiProps && this.props.app.modal.uiProps.maskTopPoz) {
        maskTopPoz = this.props.app.modal.uiProps.maskTopPoz;
      }
      if (this.props.app.modal.uiProps && this.props.app.modal.uiProps.maskColor) {
        maskColor = this.props.app.modal.uiProps.maskColor;
      }
      modalUI = React.createElement(this.props.app.modal.ui, this.props.app.modal.uiProps, null);
      modalUIShow = true;
      modalUIStyle = this.props.app.modal.uiProps.style;
    }

    return (
      <IntlProvider locale={this.props.app.appLanguage} messages={chooseLocale(this.props.app.appLanguage)}>
        <div className='root'>
          {this.props.children}
          <Modal style={modalUIStyle} show={modalUIShow} maskTopPoz={maskTopPoz} maskColor={maskColor} hasClose={false}>
            {modalUI}
          </Modal>
          <Toast toastMessage={this.props.app.toast}/>
          <Loading show={this.props.app.showLoading}/>
        </div>
      </IntlProvider>
    );
  }
}
const mapStateToProps = function(state: IRootState):{app:AppState} {
  return {
    app: state.app
  }
};
const mapDispatchToProps = function(dispatch: Dispatch<AppAction>):any {
  return {
    appAction: bindActionCreators(appAction, dispatch)
  }
};
export default connect(mapStateToProps,mapDispatchToProps)(App)
