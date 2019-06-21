import React from 'react'
import './index.styl'
import Content from '../../components/content'
import hashHistory from '../../routes/history'
import queryString from 'query-string'

class SearchPage extends React.Component<any, any> {
  render() {
    var self = this
    return (
      <Content className="search" bgColor="white">
        <div
          className="container vhCenter"
          style={{ minHeight: self.props.app.appHeight - 80 }}
        >
          <div>
            <div className="searchLabel">
              您要搜索的资源
              <b>
                {self.props.location.search &&
                  queryString.parse(self.props.location.search).q}
              </b>
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
)(injectIntl(SearchPage))
