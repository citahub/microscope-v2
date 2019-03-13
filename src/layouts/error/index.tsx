import React from 'react'
import './index.styl'
import Layout from '../../components/layout'
// import { hashHistory } from 'react-router';
import Header from '../common/Header'
import Footer from '../common/Footer'

class NotFoundPage extends React.Component<any, any> {
  constructor(props: any) {
    super(props)
  }
  componentDidMount() {}
  render() {
    var self = this
    return (
      <Layout className="error" bgColor="white">
        <Header location={self.props.location} app={self.props.app} />
        <div
          className="container"
          style={{ minHeight: self.props.app.appHeight - 338 }}
        >
          <div className="vhCenter" style={{ marginTop: 57 }}>
            <img
              src="images/404.png"
              srcSet="images/404@2x.png 2x, 404/logo@3x.png 3x"
              style={{ width: 130, height: 48 }}
            />
          </div>
          <div className="errorLabel">哎呀呀，你要访问的页面没有找到！</div>
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
)(injectIntl(NotFoundPage))
