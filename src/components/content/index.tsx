import React from 'react'
import './index.styl'

export default class Content extends React.Component<any, any> {
  render() {
    return (
      <div
        className={
          this.props.className ? 'content ' + this.props.className : 'content'
        }
      >
        {this.props.children}
      </div>
    )
  }
}
