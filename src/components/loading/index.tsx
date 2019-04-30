import React from 'react'
import './index.styl'

interface Props {
  loading: any
  onClose?: Function
}
class Loading extends React.Component<Props> {
  render() {
    if (!this.props.loading) return null
    return (
      <div className="loading" style={{ pointerEvents: 'none' }}>
        <div
          className="loading_content vhCenter"
          style={{
            marginTop: this.props.loading.maskTop || 0,
            backgroundColor: 'transparent',
            pointerEvents: 'all'
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
              // TODO: could just use onClick=this.props.onClose
              onClick={() => {
                this.props.onClose && this.props.onClose()
              }}
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
