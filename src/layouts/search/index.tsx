import React from 'react'
import './index.styl'
import Content from '../../components/content'
import hashHistory from '../../routes/history'
import queryString from 'query-string'

class SearchPage extends React.Component<any, any> {
  render() {
    var self = this
    var intl = self.props.intl
    return (
      <Content className="search vhCenter" bgColor="white">
        <div className="container">
          <div>
            <div className="searchLabel">
              {intl.formatMessage(
                {
                  id: 'app.page.search.label'
                },
                {
                  key:
                    self.props.location.search &&
                    queryString.parse(self.props.location.search).q
                }
              )}
            </div>
            <div
              className="goBackButton"
              onClick={() => {
                hashHistory.push('/')
              }}
            >
              {intl.formatMessage({ id: 'app.page.search.goback' })}
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
