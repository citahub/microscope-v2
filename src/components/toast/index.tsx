import  React from 'react'
import './index.styl'


interface ToastMessage{
  id: number;
  text: string;
  timeout: number;
}

interface ToastItemProps{
  disappearDuration: number;
  data: ToastMessage;
  willLeave: ()=>void;
  style: object;
}
interface ToastItemState{
  opacity: number;
}
class ToastItem extends React.Component<ToastItemProps, ToastItemState> {
  constructor(props:ToastItemProps) {
    super(props);
    this.state = {
      opacity: 1
    }
  }
  _animationFun: any = null;
  static defaultProps = {
    disappearDuration: 2000,
    data: {},
    willLeave: null,
    style: {
      bottom: 50
    }
  }
  componentDidMount() {
    var self = this;
    var requestAnimationFrame = window["requestAnimationFrame"] || window["webkitRequestAnimationFrame"]
    setTimeout(function() {
      var maxFrame = self.props.disappearDuration / 1000 * 40; // suppose fps = 40
      var count = 0;
      var update = function() {
        count++;
        self.setState(function() {
          // console.log(count / maxFrame);
          return { opacity: 1 - count / maxFrame }
        });
        if (count < maxFrame) {
          self["_animationFun"] = requestAnimationFrame(update)
        } else {
          self.props.willLeave();
        }
      }
      update();
    }, this.props.data.timeout)
  }
  componentWillUnmount() {
    if (this["_animationFun"]) {
      var cancelAnimationFrame = window["cancelAnimationFrame"] || window["webkitCancelAnimationFrame"]
      cancelAnimationFrame(this["_animationFun"]);
    }
  }
  render() {
    var item = this.props.data;
    return (
      <div className='toast_item_container' key={'toast_' + item.id} style={{ ...this.props.style, opacity: this.state.opacity }}>
        <div className='toast_item_text'>{item.text}</div>
      </div>
    )
  }
}

interface ToastProps{
  style?: object;
  toastMessage: ToastMessage
}
interface ToastState{
  items: Array<ToastMessage>;
}
class Toast extends React.Component<ToastProps,ToastState> {
  constructor(props:ToastProps) {
    super(props);
    this.state = {
      items: []
    }
  }
  static defaultProps = {
    toastMessage: {
      id: -1,
      text: 'Hello,world',
      timeout: 2000
    }
  }
  addMessage(toastMessage:ToastMessage) {
    var self = this;
    self.setState(function(prevState:ToastState) {
      return { items: prevState.items.concat([toastMessage]) }
    });
  }
  componentWillReceiveProps(nextProps:ToastProps) {
    if (this.props.toastMessage !== nextProps.toastMessage) {
      this.addMessage(nextProps.toastMessage);
    }
  }

  willLeave(id:number) {
    this.setState(function(prevState:ToastState) {
      var newItems = prevState.items;
      for (var i = 0; i < newItems.length; i++) {
        if (newItems[i].id === id) {
          newItems.splice(i, 1);
          break;
        }
      }
      return { items: newItems }
    });
  }
  render() {
    var data = this.state.items || [];
    if (data.length === 0) return null;
    data = data.reverse();
    var self = this;
    return (
      <div className='toast'>
        {
          data.map(item => {
            return (
                      <ToastItem willLeave={self.willLeave.bind(self, item.id)} key={item.id} data={item} style={self.props.style}></ToastItem>
                    )
          })
        }
      </div>

    )
  }
}

export default Toast
