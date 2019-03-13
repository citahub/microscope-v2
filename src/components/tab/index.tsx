import React from 'react'
import './index.styl'

const style = {
  tabs: {
    base: {
      boxSizing: 'border-box',
      width: '100%',
      position: 'relative'
    }
  },
  tabHeader: {
    base: {
      width: '100%',
      height: 45,
      overflowX: 'auto',
      overflowY: 'hidden'
    },
    navbar: {
      boxSizing: 'inherit',
      borderTop: '1px solid rgb(238, 238, 238)',
      borderBottom: '1px solid rgb(238, 238, 238)'
    },
    item: {
      base: {
        boxSizing: 'inherit',
        textAlign: 'center',
        padding: '0 10px',
        lineHeight: '44px',
        color: '#999',
        width: 100,
        borderBottom: '1px solid transparent'
      },
      selected: {
        color: '#434343',
        borderBottom: '1px solid #f0594e'
      }
    }
  },
  tabContent: {
    base: {
      // width: '96%',
      // margin: '0 2% '
    }
  }
}

export class Tab extends React.Component<any, any> {
  render() {
    return <div>{this.props.children}</div>
  }
}
class Tabs extends React.Component<any, any> {
  refs: any
  constructor(props: any) {
    super(props)
    this.state = {
      selectIndex: props.initIndex
    }
  }
  static defaultProps = {
    headerDirection: 'top',
    headerWidthUnit: 'percent',
    style: {},
    onTabSwitchCallBack: null
  }

  switchTab(tabIndex: number, event: any) {
    var self = this
    try {
      if (self.props.headerWidthUnit === 'fixed') {
        self.refs.tabHeader.scrollLeft =
          event.currentTarget.offsetLeft -
          self.refs.tabHeader.clientWidth / 2 +
          event.currentTarget.clientWidth / 2
      }
    } catch (e) {
      // console.log(e);
    } finally {
      self.setState({ selectIndex: tabIndex }, function() {
        if (self.props.onTabSwitchCallBack) {
          self.props.onTabSwitchCallBack(tabIndex)
        }
      })
    }
  }
  componentWillReceiveProps(nextProps: any) {
    var self = this
    if (nextProps.initIndex !== self.props.initIndex) {
      var tabIndex = nextProps.initIndex
      self.setState({ selectIndex: tabIndex }, function() {
        if (self.props.onTabSwitchCallBack) {
          self.props.onTabSwitchCallBack(tabIndex)
        }
      })
    }
  }
  render() {
    var tabHeader: any[] = []
    var tabContent: any[] = []
    var self = this
    var children = React.Children.toArray(self.props.children || [])

    children.forEach(function(child: any, i) {
      var title = child.props.title
      var tabHeaderItemStyle: any = { ...style.tabHeader.item.base }
      var tabHeaderClassNames = 'tabHeader'
      if (self.props.headerWidthUnit === 'percent') {
        tabHeaderItemStyle.width = 100 / children.length + '%'
      }
      if (i === self.state.selectIndex) {
        tabHeaderClassNames = 'tabHeader tabHeaderSelected'
        tabHeaderItemStyle = {
          ...tabHeaderItemStyle,
          ...style.tabHeader.item.selected
        }
      }

      tabHeader.push(
        <div
          className={tabHeaderClassNames}
          key={'tabHeader_' + i}
          style={{ ...tabHeaderItemStyle }}
          onClick={self.switchTab.bind(self, i)}
        >
          <span>{title}</span>
        </div>
      )

      if (i === self.state.selectIndex) {
        tabContent.push(
          <div key={'tabContent_' + i} style={{ width: '100%' }}>
            {child.props.children}
          </div>
        )
      }
    })

    var tabsStyle = {
      ...style.tabs.base,
      ...this.props.style
    }
    var tabHeaderStyle: any = {
      ...style.tabHeader.base
    }
    var tabContentStyle: any = {
      ...style.tabContent.base
    }
    var tabHeaderContainerStyle: any = {
      ...style.tabHeader.base,
      ...style.tabHeader.navbar
    }
    if (self.props.headerDirection === 'bottom') {
      if (tabsStyle.height === undefined) {
        tabsStyle.height = window.innerHeight
      }
      tabHeaderStyle.position = 'absolute'
      tabHeaderStyle.bottom = 0
      tabHeaderStyle.zIndex = 9999

      tabContentStyle.height = tabsStyle.height - tabHeaderStyle.height
      tabContentStyle.overflowY = 'auto'
    }
    return (
      <div style={{ ...tabsStyle }}>
        <div style={{ ...tabHeaderStyle }}>
          <div
            className="tabHeaderContainer"
            ref="tabHeader"
            style={tabHeaderContainerStyle}
          >
            {tabHeader}
          </div>
        </div>
        <div style={{ ...tabContentStyle }}>{tabContent}</div>
      </div>
    )
  }
}

export default Tabs
