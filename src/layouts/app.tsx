import React from 'react'
import 'bootstrap/dist/css/bootstrap.css'
import './app.styl'
import Layout from '../components/layout'
import Header from '../components/header'
import Footer from '../components/footer'
import Loading from '../components/loading'
import Toast from '../components/toast'
import Modal from '../components/modal'

import hashHistory from '../routes/history'

import { IntlProvider } from 'react-intl'
import { chooseLocale } from '../locale/i18n'
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
          <Layout>
            <Header
              location={hashHistory.location}
              appAction={this.props.appAction}
            />
            {this.props.children}
            <Footer />
          </Layout>
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
