import * as React from 'react'
import './index.styl'

interface Props {
  style: object;
}

export default class Footer extends React.Component<Props, object> {
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
