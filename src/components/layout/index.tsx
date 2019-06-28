import React from 'react'
import './index.styl'

export default class Layout extends React.Component<any, any> {
  render() {
    return <div className="layout">{this.props.children}</div>
  }
}
