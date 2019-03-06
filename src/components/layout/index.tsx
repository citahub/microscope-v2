import  React from 'react'
import { ReactElement } from 'react'
import './index.styl'

interface FloatAboveLayoutProps {
  style: object;
}
class FloatAboveLayout extends React.Component<FloatAboveLayoutProps,object> {
  static defaultProps = {
    style: {

    }
  }
  render() {
    return (
        <div className='layout_floatAboveLayout' style={this.props.style}>
          {this.props.children}
        </div>
    )
  }
}
exports.FloatAboveLayout = FloatAboveLayout;

interface DrawerStyleObject{
  width: number | string;
}

interface Props {
  style?: object;
  bgColor?: string;
  drawer?: ReactElement<any>;
  drawerOpen?: boolean;
  drawerStyle?: DrawerStyleObject;
  className?: string|null;
}
interface State {
  drawerOpen: boolean;
}
export default class Layout extends React.Component<Props,State> {
  constructor(props:Props) {
    super(props);
    this.state = {
      drawerOpen: props.drawerOpen || false
    }
  }

  static defaultProps = {
    bgColor: '#F6F6F6',
    drawer: null,
    drawerOpen: false,
    drawerStyle: {
      width: '80%'
    },
    className: null
  }
  switchDrawer(){
    this.setState({ drawerOpen: !this.state.drawerOpen });
  }
  closeDrawer(){
    if(this.state.drawerOpen === true){
      this.setState({ drawerOpen: false });
    }
  }
  componentWillReceiveProps(nextProps:Props){
    if(this.props.drawerOpen !== nextProps.drawerOpen){
      this.setState({ drawerOpen: nextProps.drawerOpen || false });
    }
  }
  render() {
    var hasDrawer = this.props.drawer ? true: false;
    var drawerUI = null;

    var layoutHasDrawerStyle = {};


    if(hasDrawer){
      var style = {};
      if (this.state.drawerOpen) {
        var outTransition = {
          WebkitTransition: 'transform 600ms ease-out'
        }
        layoutHasDrawerStyle = {
          ...outTransition,
          transform: 'translateX(' + (this.props.drawerStyle?this.props.drawerStyle.width: '80%') + ')',
        };
        style = {
          ...outTransition,
          transform: 'translateX(0)'
        }
      } else {
        var inTransition = {
          WebkitTransition: 'transform 600ms ease-in-out'
        }
        layoutHasDrawerStyle = {
          ...inTransition,
          transform: 'translateX(0)'
        };
        style = {
          ...inTransition,
          transform: 'translateX(-100%)'
        }
      }
      drawerUI =  <div className='layout_drawer' style={{ ...style, ...this.props.drawerStyle }}>
                    {this.props.drawer}
                  </div>


    }
    var drawerSwitch = null;
    if (hasDrawer) {
      drawerSwitch = (
        <div className='layout_drawer_menu' onClick={this.switchDrawer.bind(this)}>
          <svg xmlns="https://www.w3.org/2000/svg" viewBox="0 0 30 30" width="30" height="30" focusable="false"><title>Menu</title><path stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeMiterlimit="10" d="M4 7h22M4 15h22M4 23h22"></path></svg>
        </div>
      )
    }
    return (
      <div className={this.props.className?'layout_container ' + this.props.className: 'layout_container'} >
        <div className='layout' style={{ ...layoutHasDrawerStyle, backgroundColor: this.props.bgColor}} onFocus={this.closeDrawer.bind(this)}>
          {drawerSwitch}
          {this.props.children}
        </div>
        {drawerUI}
      </div>
    )
  }
}
