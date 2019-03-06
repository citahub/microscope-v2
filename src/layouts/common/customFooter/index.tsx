import  React from 'react'
import './index.styl'
class CustomFooter  extends React.Component<any,any> {
  // constructor(props) {
  //   super(props);
  // }
  // componentDidMount(){
  // }
  render() {
    // var self = this;
    return (
      <div className='customFooter' style={{ color: "white"}}>
        <div className='container'>
          <div className='row'>
            <div className='col-xs-3 col-sm-3 col-md-3 col-12 intro' style={{ paddingTop: 34, paddingBottom: 34 }}>
              <div className='footTitle'>介绍</div>
              <div style={{ marginTop: 28 }}>Microscope is a blockchain explorer.Very Niubi</div>
              <div style={{ marginTop: 17 }}>This project is powered by Cryptape.One of the Nervos-CITA product</div>
            </div>

            <div className='col-xs-6 col-sm-6 col-md-6 col-12 otherProduct' style={{ margin: '0 auto', paddingTop: 34 , paddingBottom: 34}}>
              <div className='footTitle'>其他产品</div>
              <div  className='row'  style={{ marginTop: 28 }}>
                <div className='col-6'>
                  <img src="images/footer_nervos.png"/>
                  <div style={{ marginTop: 16, color: "#e3e3e3"}}>Nervos-CITA is a comprehensive solution to…</div>
                </div>
                <div className='col-6'>
                  <img src="images/footer_cita.png"/>
                  <div style={{ marginTop: 16, color: "#e3e3e3"}}>Nervos-CITA is a comprehensive solution to…</div>
                </div>
              </div>
            </div>

            <div className='col-xs-3 col-sm-3 col-md-3 col-12 contact' style={{ paddingTop: 34, paddingBottom: 34 }}>
              <div className='footTitle'>联系我们</div>
              <div style={{ marginTop: 28 }}>
                <img src='images/footer_mailbox.png' style={{ marginRight: 15 }}/>E-mail
              </div>
              <div style={{ marginTop: 13 }}>
                <img src='images/footer_group.png'  style={{ marginRight: 15 }}/>Nervos-CITA开发者群组
              </div>
              <div style={{ marginTop: 13 }}>
                <img src='images/footer_telegram.png'  style={{ marginRight: 15 }}/>Telegram
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default CustomFooter;
