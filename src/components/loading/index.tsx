import * as React from 'react'
import './index.styl'

interface Props {
  maskColor:string;
  maskTopPoz: number;
  show: boolean;
}
interface State {
  show: boolean;
  opacity: number;
}
class Loading extends React.Component<Props,State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      show: this.props.show ? true: false,
      opacity: this.props.show ? 1: 0
    }
  }
  static defaultProps = {
    maskColor: 'transparent',
    maskTopPoz: 0,
    show: false
  }

  componentWillReceiveProps(nextProps:Props){
    if(nextProps.show !== this.props.show){
      this.setState({
        show: nextProps.show ? true: false,
        opacity: nextProps.show ? 1: 0
      });
    }
  }
  closeLoading(){
    // var self = this;
    // this.setState({ opacity: 0 },function(){
    //   setTimeout(function(){
    //     self.setState({show: false});
    //   },200);
    // });
  }
  render() {
    if (this.state.show === false) return null;
    var style = {};
    if (this.state.opacity === 0) {
      style = {
        opacity: 0,
        WebkitAnimation: 'fadeOutAnimation 200ms linear'
      }
    } else {
      style = {
        opacity: 1,
        WebkitAnimation: 'fadeInAnimation 200ms linear'
      }
    };
    return (
      <div className='loading' style={style}>
        <div className='loading_content vhCenter' style={{ marginTop: this.props.maskTopPoz ,backgroundColor: this.props.maskColor }}>
          <div style={{ backgroundSize: '18px 18px', backgroundPosition: '50% 50%', backgroundRepeat: 'no-repeat', width: '36px', height: '36px', margin: '0 auto', backgroundImage: 'url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACQAAAAkCAYAAADhAJiYAAAAAXNSR0IArs4c6QAAAdZJREFUWAm91c1Kw0AQB/CmVgp5AhGPIkIvTfExPFrESsEX8yBCBUV60HvxBdpcAnmDPkKIqYkzIRO2H5v9mE0XwiabzZ8f7TLT6TgYURSdhWF46yCq0+WGICZN00We5/PVajXm5nmcAMJAxnWVs/E8bxIEwYdtrjXoAIYMLJQVqAHDRhmDNDAslNGhbsB8wdl5AskfaWDuFUUxMz3o2qAmTL/fv4OD/AKIKRel9ZepMIPB4Jd+meVy+QD3r3Cd0BrM2gddCTLBEICDagTZYLgoKYiD4aAOglxgbFF7IJcYG9QWqA2MKaoGtYkxQZWgY2B0Ud4xMTqobpZlN7DxkjbTDL3pU6zAtO5i9n3/B/LXO1k9eB53h8PhN7ycwMNG3ACN8bmquOIy+z6O4/MkSRaQfyGGgWEOlsf6UGNXxu4Mm1BKA7v3dDQavdECZxYwV2JOhbmHOatBuKFNlA4GDVugtlC6mIMg1ygTjBTkCmWKaQRxUTYYJcgWZYvRApmiOBhtkC6KizECqVDYDqoKLC16mKEae3VI9YGseEKVXUvaQVmBVbn03hiEH0pQlFnOYjvYeqF4sAJhZhPKFoO51iAZioNhg3ZRXAzmORn498H1Dof6lBv4D1YJD88XaW2tAAAAAElFTkSuQmCC)' }}>
            <img onClick={this.closeLoading.bind(this)} style={{ width: '36px', height: '36px'}} src='data:image/png;base64,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'></img>
          </div>
        </div>
      </div>
    )
  }
}

export default Loading
