import  React from 'react'
import './index.styl'

interface Props {
  style: object;
}

export default class Footer extends React.Component<any, any> {
  constructor(props:Props) {
    super(props);
  }
  render() {
    return (
      <div className='footer' style = {{ ...this.props.style }}>
        {this.props.children}
      </div>
    )
  }
}
