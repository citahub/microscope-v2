import  React from 'react'
import './index.styl'


interface HeaderBackProps {
  onBack: ()=> void;
}
class HeaderBackButton extends React.Component<HeaderBackProps, object> {
  onBack() {
    if (this.props.onBack) {
      this.props.onBack();
    }
  }
  render() {
    return (
        <div className='header_backButtonArea' onClick={this.onBack.bind(this)}>
          <div className='header_backButton'>
          </div>
        </div>
    )
  }
}

interface Props {
  bgColor: string;
  title: object;
  onBack: ()=> void;
  style: object;
}

class Header extends React.Component<Props, object> {
  static defaultProps = {
    bgColor: 'white',
    title: 'Hello, world',
    onBack: null,
    style: {

    }
  }
  onBack() {
    if (this.props.onBack) {
      this.props.onBack();
    }
  }

  render() {
    return (
      <div className='header' style = {{ ...this.props.style, backgroundColor: this.props.bgColor }}>
        <HeaderBackButton onBack={this.onBack.bind(this)}></HeaderBackButton>
        <div className='header_title'>
          {this.props.title}
        </div>
      </div>
    )
  }
}

export default Header;
exports.HeaderBackButton = HeaderBackButton;
