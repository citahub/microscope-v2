import React from 'react'
import './index.styl'
interface Props {
  maskColor: string
  maskTopPoz: number
  show: boolean
  hasClose: boolean
  style: object
  closeModal?: () => void
}

interface State {
  show: boolean
  opacity: number
}
class Modal extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = {
      opacity: 0,
      show: this.props.show ? true : false
    }
  }
  static defaultProps = {
    maskColor: 'rgba(0, 0, 0, 0.7)',
    maskTopPoz: 0,
    show: false,
    hasClose: true,
    style: {}
  }
  componentWillReceiveProps(nextProps: Props) {
    if (nextProps.show !== this.props.show) {
      this.setState({
        show: nextProps.show ? true : false
      })
    }
  }
  closeModal() {
    this.props.closeModal && this.props.closeModal()
  }
  render() {
    if (this.state.show === false) return null
    return (
      <div className="modal" onClick={() => this.closeModal()}>
        <div
          className="modal_content vhCenter"
          style={{
            marginTop: this.props.maskTopPoz,
            backgroundColor: this.props.maskColor
          }}
        >
          <div style={this.props.style} onClick={e => e.stopPropagation()}>
            {this.props.children}
            <div
              className="modal_close"
              style={{ display: this.props.hasClose ? 'block' : 'none' }}
              onClick={this.closeModal.bind(this)}
            >
              x
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Modal
