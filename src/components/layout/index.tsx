import React from 'react'
import './index.styl'

export default class Layout extends React.Component<any, any> {
  static defaultProps = {
    bgColor: '#F6F6F6',
    className: null,
    onScroll: null
  }
  render() {
    return (
      <div
        className={
          this.props.className ? 'layout ' + this.props.className : 'layout'
        }
        onScroll={e => {
          this.props.onScroll && this.props.onSCroll(e)
        }}
      >
        <div
          style={{
            backgroundColor: this.props.bgColor
          }}
        >
          {this.props.children}
        </div>
      </div>
    )
  }
}
