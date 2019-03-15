import React from 'react'
import './index.styl'
class Footer extends React.Component<any, any> {
  render() {
    return (
      <div className="footer" style={{ color: 'white' }}>
        <div className="container">
          <div className="row">
            <div
              className="col-xs-4 col-sm-4 col-md-4 col-12 intro"
              style={{ paddingTop: 34, paddingBottom: 34 }}
            >
              <div className="footTitle">介绍</div>
              <div style={{ marginTop: 28 }}>
                Microscope is a blockchain explorer.
              </div>
              <div style={{ marginTop: 17 }}>
                This project is powered by Cryptape. One of the Nervos-CITA
                product
              </div>
            </div>

            <div
              className="col-xs-4 col-sm-4 col-md-4 col-12 otherProduct"
              style={{ margin: '0 auto', paddingTop: 34, paddingBottom: 34 }}
            >
              <div className="footTitle">其他产品</div>
              <div className="row" style={{ marginTop: 28 }}>
                <div className="col-6">
                  <img src="images/footer_nervos.png" />
                  <div style={{ marginTop: 16, color: '#e3e3e3' }}>Nervos</div>
                </div>
                <div className="col-6">
                  <img src="images/footer_cita.png" />
                  <div style={{ marginTop: 16, color: '#e3e3e3' }}>CITA</div>
                </div>
              </div>
            </div>

            <div
              className="col-xs-4 col-sm-4 col-md-4 col-12 contact"
              style={{ paddingTop: 34, paddingBottom: 34 }}
            >
              <div className="footTitle">联系我们</div>
              <div style={{ marginTop: 28 }}>
                <a href="https://github.com/cryptape/microscope">
                  <img
                    src="images/footer_git.png"
                    style={{ marginRight: 15, width: 16, height: 16 }}
                  />
                  Github
                </a>
              </div>
              <div style={{ marginTop: 13 }}>
                <a href="mailto:citahub-team@cryptape.com">
                  <img
                    src="images/footer_mailbox.png"
                    style={{ marginRight: 15 }}
                  />
                  E-mail: citahub-team@cryptape.com
                </a>
              </div>
              <div style={{ marginTop: 13 }}>
                <a href="https://talk.citahub.com/">
                  <img
                    src="images/footer_group.png"
                    style={{ marginRight: 15 }}
                  />
                  CITAHub 开发者论坛
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
export default Footer
