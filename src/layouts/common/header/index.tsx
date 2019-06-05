import React from 'react'
import './index.styl'

import { hashHistory } from 'react-router'
import { api } from '../../../utils/config'
import { getSelectNetwork, setSelectNetwork } from '../../../utils/storage'

import { isAddress, isBlockHeight, isHash, format0x } from '../../../utils/hex'

class NetWork extends React.Component<any, any> {
  refs: {
    search: any
  } = {
    search: null
  }
  keyDownListener: any
  constructor(props: any) {
    super(props)
    this.state = {
      open: false
    }
  }

  render() {
    var self = this
    var networks = self.props.networks
    var selectNetwork = self.props.selectNetwork

    return (
      <div
        className="network"
        style={{ position: 'fixed', top: 20, width: 100 }}
      >
        <div
          className="withRow"
          style={{ width: '100%', paddingTop: 10 }}
          onClick={() => {
            self.setState({ open: !self.state.open })
          }}
        >
          <div className="operationItem networkName withRowLeftAuto">
            {selectNetwork.name}
          </div>
          <div
            className="operationItem vhCenter"
            style={{
              width: 16,
              height: 20,
              paddingLeft: 5,
              position: 'relative'
            }}
          >
            <div className={self.state.open ? 'topArrow' : 'bottomArrow'} />
          </div>
        </div>
        {self.state.open ? (
          <div
            className="networkOpen"
            onMouseLeave={() => {
              self.setState({ open: false })
            }}
          >
            <div>Switch Chain</div>
            <div className="withRow" style={{ marginTop: 14, height: 34 }}>
              <div className="withRowLeftAuto">
                <input
                  autoFocus
                  placeholder="Please input rebirth service address"
                  type="text"
                  ref="search"
                  className="form-control"
                  onFocus={() => {
                    self.keyDownListener = (event: any) => {
                      if (event.keyCode == 13) {
                        var u = self.refs.search.value
                        if (
                          !u.startsWith('http://') &&
                          !u.startsWith('https://')
                        ) {
                          u = 'http://' + u
                        }
                        setSelectNetwork({
                          name: 'customer',
                          url: u
                        })
                        window.location.reload()
                      }
                    }
                    window.addEventListener('keydown', self.keyDownListener)
                  }}
                  onBlur={() => {
                    window.removeEventListener('keydown', self.keyDownListener)
                  }}
                  style={{
                    height: '100%',
                    padding: '7px 15px 7px 15px',
                    fontSize: 14,
                    color: '#cacdd2'
                  }}
                />
              </div>
              <div
                className="networkSwitchButton vhCenter operationItem"
                onClick={() => {
                  var u = self.refs.search.value
                  if (!u.startsWith('http://') && !u.startsWith('https://')) {
                    u = 'http://' + u
                  }
                  setSelectNetwork({
                    name: 'customer',
                    url: u
                  })
                  window.location.reload()
                }}
              >
                switch
              </div>
            </div>
            <div style={{ marginTop: 9 }}>
              {networks.map(function(item: any) {
                return (
                  <div
                    className="withRow operationItem"
                    style={{ marginTop: 18 }}
                    onClick={() => {
                      setSelectNetwork(item)
                      window.location.reload()
                    }}
                  >
                    <div style={{ width: 20 }}>
                      <div
                        style={{
                          marginTop: 6,
                          width: 8,
                          height: 8,
                          backgroundColor:
                            item.url == selectNetwork.url ? '#5b8ee6' : 'grey',
                          WebkitBorderRadius: '50% 50%'
                        }}
                      />
                    </div>
                    <div className="withRowLeftAuto">
                      <div
                        style={{ color: '#6e737c', fontSize: 14, height: 20 }}
                      >
                        {item.name}
                      </div>
                      <div
                        style={{
                          marginTop: 6,
                          color: '#979a9e',
                          fontSize: 12,
                          height: 17
                        }}
                      >
                        {item.url}
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        ) : null}
      </div>
    )
  }
}

class MoreMenu extends React.Component<any, any> {
  refs: {
    parentMenu: any
  } = {
    parentMenu: null
  }
  clickListener: any
  constructor(props: any) {
    super(props)
    this.state = {
      open: false
    }
  }
  componentDidMount() {
    this.clickListener = () => {
      this.setState({ open: false })
    }
    window.addEventListener('click', this.clickListener)
  }
  componentWillUnmount() {
    if (this.clickListener) {
      window.removeEventListener('click', this.clickListener)
    }
  }
  render() {
    var self = this
    var data = self.props.data
    var className = 'menu operationItem'
    if (self.props.location.pathname.startsWith(data.path)) {
      className += ' active'
    }
    return (
      <div
        className="operationItem"
        style={{ position: 'relative', display: 'inline-block' }}
      >
        <div
          className="withRow"
          onMouseOver={() => {
            self.setState({ open: true })
          }}
        >
          <div className={className}>{data.name}</div>
          <div
            className="operationItem vhCenter"
            style={{
              width: 16,
              height: 20,
              paddingLeft: 5,
              position: 'relative'
            }}
          >
            <div
              className={self.state.open ? 'topArrow' : 'bottomArrow'}
              style={{ borderWidth: 3 }}
            />
          </div>
        </div>
        {self.state.open ? (
          <div
            ref="parentMenu"
            className="menuOpen"
            onMouseLeave={() => {
              self.setState({ open: false })
            }}
          >
            {data.subMenus.map(function(item: any) {
              var subClassName = 'subMenuItem'
              if (self.props.location.pathname == item.path) {
                subClassName += ' active'
              }
              return (
                <div
                  className={subClassName}
                  onClick={() => {
                    hashHistory.push(item.path)
                  }}
                >
                  {item.name}
                </div>
              )
            })}
          </div>
        ) : null}
      </div>
    )
  }
}

class Drawer extends React.Component<any, any> {
  constructor(props: any) {
    super(props)
    this.state = {
      open: false
    }
  }
  render() {
    return (
      <>
        <div
          className="drawer"
          onClick={() => {
            this.setState({ open: !this.state.open })
          }}
        >
          <svg
            xmlns="https://www.w3.org/2000/svg"
            viewBox="0 0 30 30"
            width="30"
            height="30"
            focusable="false"
          >
            <title>Menu</title>
            <path
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeMiterlimit="10"
              d="M4 7h22M4 15h22M4 23h22"
            />
          </svg>
        </div>
        {this.state.open ? (
          <div
            className="drawerMask"
            onClick={() => {
              this.setState({ open: false })
            }}
          >
            <div
              className="drawerContent"
              onClick={e => {
                e.stopPropagation()
              }}
            >
              {this.props.ui}
            </div>
          </div>
        ) : null}
      </>
    )
  }
}

const menus = [
  {
    name: '区块',
    path: '/block/list'
  },
  {
    name: '交易',
    path: '/transaction/list'
  },
  {
    name: 'API',
    path: '/api/',
    subMenus: [
      {
        name: 'RPC',
        path: '/api/rpc'
      },
      {
        name: 'Re-Birth',
        path: '/api/rebirth'
      }
    ]
  },
  {
    name: '统计',
    path: '/statics'
  }
]

class Header extends React.Component<any, any> {
  refs: {
    search: any
  } = {
    search: null
  }
  keyDownListener: any
  componentDidMount() {}
  onDropdownVisibleChange() {}
  onMenuSelectLanguage() {}
  query() {
    var self = this
    var inputValue = self.refs.search.value
    if (!inputValue) return

    if (isAddress(inputValue)) {
      hashHistory.push('/account/' + format0x(inputValue))
    } else if (isBlockHeight(inputValue)) {
      hashHistory.push('/block/id/' + Number(inputValue))
    } else if (isHash(inputValue)) {
      hashHistory.push('/transaction/hash/' + format0x(inputValue))
    } else {
      hashHistory.push('/404')
    }
  }
  render() {
    var self = this
    var networks = api.serverList
    // var languages = ["Chinese","English"];
    var selectNetwork = getSelectNetwork()
    var width = self.props.app.appWidth
    var logoUI = (
      <div
        className="operationItem"
        onClick={() => {
          hashHistory.push('/')
        }}
      >
        <img src="images/headLogo_Microscope.png" />
      </div>
    )
    var navUI = (
      <div
        className="withRowLeftAuto"
        style={{
          fontSize: 16,
          color: '#47484a',
          marginTop: 10,
          height: 20,
          lineHeight: '20px'
        }}
      >
        {menus.map(menu => {
          var className = 'menu operationItem'
          if (self.props.location.pathname == menu.path) {
            className += ' active'
          }
          if (menu.subMenus) {
            return <MoreMenu location={self.props.location} data={menu} />
          } else {
            return (
              <span
                className={className}
                onClick={() => {
                  hashHistory.push(menu.path)
                }}
              >
                {menu.name}
              </span>
            )
          }
        })}
      </div>
    )
    var networkUI = (
      <div style={{ width: 100 }}>
        <NetWork networks={networks} selectNetwork={selectNetwork} />
      </div>
    )

    var searchUI = (
      <div className="input-group">
        <input
          placeholder="Search by Address / Txhash / Block height"
          type="text"
          ref="search"
          className="form-control"
          onFocus={() => {
            self.keyDownListener = (event: any) => {
              if (event.keyCode == 13) {
                self.query()
              }
            }
            window.addEventListener('keydown', self.keyDownListener)
          }}
          onBlur={() => {
            window.removeEventListener('keydown', self.keyDownListener)
          }}
          style={{
            height: 34,
            padding: '9px 23px 8px 12px',
            fontSize: 12
          }}
        />
        <div className="input-group-append">
          <span
            className="input-group-text vhCenter operationItem"
            style={{
              height: 34,
              backgroundImage: 'linear-gradient(to left, #4eadf1, #6a96f0)'
            }}
            onClick={self.query.bind(self)}
          >
            <img
              src="images/head_Search.png"
              style={{ width: 20, height: 20 }}
            />
          </span>
        </div>
      </div>
    )

    var languageUI = (
      <div>
        {
          // <Menu
          //     onClick={()=>{}}
          //     mode="horizontal"
          //     triggerSubMenuAction="click"
          //     onSelect={(d:any)=>{
          //       console.log(d);
          //     }}
          //     >
          //   <SubMenu key={"Chinese"} title={"语言"}>
          //     {
          //       languages.map(function(language){
          //         return   <MenuItem key={language}>{language}</MenuItem>
          //       })
          //     }
          //
          //   </SubMenu>
          // </Menu>
        }
      </div>
    )

    if (width < 1200) {
      var drawerUI = (
        <div>
          <div style={{ marginTop: 50 }}>
            {menus.map((menu: any) => {
              var className = 'menu operationItem'

              if (menu.subMenus) {
                if (self.props.location.pathname.startsWith(menu.path)) {
                  className += ' active'
                }
                return (
                  <div
                    className={className}
                    style={{
                      display: 'block',
                      marginTop: 20,
                      textAlign: 'left'
                    }}
                  >
                    {menu.name}
                    {menu.subMenus.map((subMenu: any) => {
                      var subMenuClassName = 'menu operationItem'
                      if (self.props.location.pathname == subMenu.path) {
                        subMenuClassName += ' active'
                      }
                      return (
                        <div
                          className={subMenuClassName}
                          style={{
                            display: 'block',
                            marginLeft: 10,
                            marginTop: 20,
                            textAlign: 'left'
                          }}
                          onClick={() => {
                            hashHistory.push(subMenu.path)
                          }}
                        >
                          {subMenu.name}
                        </div>
                      )
                    })}
                  </div>
                )
              } else {
                if (self.props.location.pathname == menu.path) {
                  className += ' active'
                }
                return (
                  <div
                    className={className}
                    style={{
                      display: 'block',
                      marginTop: 20,
                      textAlign: 'left'
                    }}
                    onClick={() => {
                      hashHistory.push(menu.path)
                    }}
                  >
                    {menu.name}
                  </div>
                )
              }
            })}
          </div>
        </div>
      )
      return (
        <div className="header">
          <Drawer ui={drawerUI} />
          <div className="row" style={{ marginLeft: 10 }}>
            <div className="col-8">{searchUI}</div>
            <div className="col-4">{networkUI}</div>
          </div>
        </div>
      )
    }
    return (
      <div className="header">
        <div className="withRow container" style={{ height: 41 }}>
          {logoUI}
          {navUI}
          <div
            style={{ width: 360, marginTop: 3, marginBottom: 4, height: 34 }}
          >
            {searchUI}
          </div>
          {networkUI}
          {languageUI}
        </div>
      </div>
    )
  }
}
export default Header
