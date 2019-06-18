import React from 'react'
import './index.styl'
import Layout from '../../components/layout'
import { hashHistory } from 'react-router'
import Header from '../common/header'
import Footer from '../common/footer'

class SearchPage extends React.Component<any, any> {
  render() {
    var self = this
    return (
      <Layout className="search" bgColor="white">
        <Header location={self.props.location} app={self.props.app} />
        <div
          className="container vhCenter"
          style={{ minHeight: self.props.app.appHeight - 80 }}
        >
          <div>
            <div className="searchLabel">
              您要搜索的资源
              <b>{self.props.location.query && self.props.location.query.q}</b>
              没有找到！
            </div>
            <div
              className="goBackButton"
              onClick={() => {
                hashHistory.push('/')
              }}
            >
              返回首页
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
import { IRootState } from '../../redux/states'

export default connect(
  (state: IRootState) => ({ app: state.app }),
  dispatch => ({
    appAction: bindActionCreators(appAction, dispatch)
  })
)(injectIntl(SearchPage))
