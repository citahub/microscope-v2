import React from 'react'
import './index.styl'
import Content from '../../components/content'
import hashHistory from '../../routes/history'

class NotFoundPage extends React.Component<any, any> {
  constructor(props: any) {
    super(props)
  }
  componentDidMount() {}
  render() {
    return (
      <Content className="error" bgColor="white">
        <div className="container">
          <div className="vhCenter" style={{ marginTop: 57 }}>
            <img
              src="images/404.png"
              style={{ width: '80%', height: 'auto' }}
            />
          </div>
          <div className="errorLabel">哎呀呀，你要访问的页面没有找到！</div>
          <div
            className="goBackButton"
            onClick={() => {
              hashHistory.push('/')
            }}
          >
            返回首页
          </div>
        </div>
      </Content>
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
