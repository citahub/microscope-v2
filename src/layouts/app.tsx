import React from 'react'
import 'bootstrap/dist/css/bootstrap.css'
import './app.styl'
import Loading from '../components/loading'
import Toast from '../components/toast'
import Modal from '../components/modal'

import hashHistory from '../routes/history'

import { IntlProvider, addLocaleData } from 'react-intl'
import enLocaleData from 'react-intl/locale-data/en'
import zhLocaleData from 'react-intl/locale-data/zh'

addLocaleData(enLocaleData)
addLocaleData(zhLocaleData)

import * as zh_CN from '../locale/zh_CN'
import * as en_US from '../locale/en_US'

function chooseLocale(language: string) {
  var obj = en_US
  if (language.indexOf('zh') > -1) {
    obj = zh_CN
  } else if (language.indexOf('en') > -1) {
    obj = en_US
  }
  return obj
}

class App extends React.Component<any, any> {
  unlisten: any = null
  tick: any
  resizeListener: any = null
  componentDidMount() {
    var self = this
    self.props.networkAction.getMetaData()
    self.props.networkAction.getQuotaPrice()

    this.unlisten = hashHistory.listen(() => {
      window.scroll(0, 0)
    })

    this.tick = setInterval(function() {
      self.props.appAction.tickTime()
    }, 3000)
    this.resizeListener = () => {
      self.props.appAction.resize(window.innerWidth, window.innerHeight)
    }
    window.addEventListener('resize', this.resizeListener)
  }
  componentDidCatch(error: any, info: any) {
    console.error(error, 'componentDidCatch')
    console.error(info, 'componentDidCatch')
  }
  componentWillUnmount() {
    if (this.tick) window.clearInterval(this.tick)
    if (this.unlisten) this.unlisten()
    if (this.resizeListener)
      window.removeEventListener('resize', this.resizeListener)
  }
  render() {
    var language = this.props.app.appLanguage
    return (
      <IntlProvider locale={language} messages={chooseLocale(language)}>
        <div className="root">
          {this.props.children}
          <Modal
            onClose={() => this.props.appAction.hideModal()}
            ui={
              this.props.app.modal
                ? React.createElement(
                    this.props.app.modal.ui,
                    this.props.app.modal.uiProps
                  )
                : null
            }
          />
          <Toast toastMessage={this.props.app.toast} />
          <Loading
            onClose={() => this.props.appAction.hideLoading()}
            loading={this.props.app.loading}
          />
        </div>
      </IntlProvider>
    )
  }
}

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import * as appAction from '../redux/actions/appAction'
import { IRootState } from '../redux/states'
import * as networkAction from '../redux/actions/network'

export default connect(
  (state: IRootState) => ({
    app: state.app,
    network: state.network
  }),
  dispatch => ({
    appAction: bindActionCreators(appAction, dispatch),
    networkAction: bindActionCreators(networkAction, dispatch)
  })
)(App)
