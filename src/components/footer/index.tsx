import React from 'react'
import './index.styl'
import { injectIntl } from 'react-intl'
import config from '../../utils/config'

class Footer extends React.Component<any, any> {
  render() {
    var intl = this.props.intl
    return (
      <div className="footer" style={{ color: 'white' }}>
        <div className="container">
          <div className="row">
            <div className="col-xs-4 col-sm-4 col-md-4 col-12 intro vhCenter">
              <div style={{ padding: '0 0', lineHeight: 2, maxWidth: 300 }}>
                {intl.formatMessage({ id: 'app.footer.category.introcution' })}
              </div>
            </div>

            <div
              className="col-xs-4 col-sm-4 col-md-4 col-12 otherProduct"
              style={{ margin: '0 auto', paddingTop: 34, paddingBottom: 34 }}
            >
              <div className="footTitle">
                {intl.formatMessage({ id: 'app.footer.category.tech' })}
              </div>
              <div className="row" style={{ margin: 0, marginTop: 32 }}>
                <a
                  href="https://github.com/citahub/cita"
                  rel="noreferrer noopener"
                  target="_blank"
                >
                  <img src="images/footer_cita.png" />
                </a>
              </div>
            </div>

            <div
              className="col-xs-4 col-sm-4 col-md-4 col-12 contact"
              style={{ paddingTop: 34, paddingBottom: 34 }}
            >
              <div className="footTitle">
                {intl.formatMessage({ id: 'app.footer.category.contact' })}
              </div>
              <div style={{ marginTop: 28 }}>
                <a href="https://github.com/citahub/microscope-v2">
                  <img
                    src="images/footer_git.png"
                    style={{ marginRight: 15, width: 16, height: 16 }}
                  />
                  GitHub
                </a>
              </div>
              <div style={{ marginTop: 13 }}>
                <a href="mailto:contact@rivtower.com">
                  <img
                    src="images/footer_mailbox.png"
                    style={{ marginRight: 15 }}
                  />
                  E-mail: contact@rivtower.com
                </a>
              </div>
              <div style={{ marginTop: 13 }}>
                <a href="https://talk.citahub.com/">
                  <img
                    src="images/footer_group.png"
                    style={{ marginRight: 15 }}
                  />
                  {intl.formatMessage({
                    id: 'app.footer.category.contact.bbs'
                  })}
                </a>
              </div>
            </div>
          </div>
          <div className="row vhCenter">
            {config.icpRecordName && (
              <a href={config.icpRecordUrl} target="_blank">
                {config.icpRecordName}
              </a>
            )}
          </div>
        </div>
      </div>
    )
  }
}

export default injectIntl(Footer)
