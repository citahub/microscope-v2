import React from 'react'
import './index.styl'

interface Props {
  maskColor: string
  maskTopPoz: number
  show: boolean
}
interface State {
  show: boolean
  opacity: number
}
class Loading extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = {
      show: this.props.show ? true : false,
      opacity: this.props.show ? 1 : 0
    }
  }
  static defaultProps = {
    maskColor: 'transparent',
    maskTopPoz: 0,
    show: false
  }

  componentWillReceiveProps(nextProps: Props) {
    if (nextProps.show !== this.props.show) {
      this.setState({
        show: nextProps.show ? true : false,
        opacity: nextProps.show ? 1 : 0
      })
    }
  }
  closeLoading() {
    // var self = this;
    // this.setState({ opacity: 0 },function(){
    //   setTimeout(function(){
    //     self.setState({show: false});
    //   },200);
    // });
  }
  render() {
    if (this.state.show === false) return null
    var style = {}
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
    }
    return (
      <div className="loading" style={style}>
        <div
          className="loading_content vhCenter"
          style={{
            marginTop: this.props.maskTopPoz,
            backgroundColor: this.props.maskColor
          }}
        >
          <div
            style={{
              backgroundSize: '18px 18px',
              backgroundPosition: '50% 50%',
              backgroundRepeat: 'no-repeat',
              width: '36px',
              height: '36px',
              margin: '0 auto'
            }}
          >
            <img
              onClick={this.closeLoading.bind(this)}
              style={{ width: '36px', height: '36px' }}
              src="images/loading.svg"
            />
          </div>
        </div>
      </div>
    )
  }
}

export default Loading
