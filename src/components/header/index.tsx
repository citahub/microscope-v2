import React from 'react'
import './index.styl'

import hashHistory from '../../routes/history'
import { api } from '../../utils/config'
import { languages } from '../../locale/i18n'
import {
  defaultNetwork,
  getSelectNetwork,
  setSelectNetwork,
  getNetworks,
  addNetwork,
  removeNetwork,
  getSelectLanguage,
  setSelectLanguage
} from '../../utils/storage'
import * as dataAPI from '../../utils/dataAPI'
import { isAddress, isBlockHeight, isHash, format0x } from '../../utils/hex'

class NodeItem extends React.Component<any, any> {
  render() {
    var item = this.props.data
    var selected = this.props.selected
    var removable = this.props.removable
    return (
      <div className="withRow operationItem" style={{ marginTop: 18 }}>
        <div style={{ width: 20 }}>
          <div
            style={{
              marginTop: 6,
              width: 8,
              height: 8,
              backgroundColor: selected ? '#5b8ee6' : 'grey',
              WebkitBorderRadius: '50% 50%'
            }}
          />
        </div>
        <div
          className="withRowLeftAuto"
          onClick={() => {
            setSelectNetwork(item)
            window.location.reload()
          }}
        >
          <div style={{ color: '#6e737c', fontSize: 14, height: 20 }}>
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
        {removable ? (
          <div
            onClick={() => {
              removeNetwork(item)
              if (selected) {
                setSelectNetwork(defaultNetwork)
                window.location.reload()
              }
            }}
          >
            X
          </div>
        ) : null}
      </div>
    )
  }
}
class Language extends React.Component<any, any> {
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
    var intl = self.props.intl
    var selectLanguage = getSelectLanguage()
    return (
      <div
        className="language"
        style={{ position: 'fixed', top: 20, width: 60 }}
      >
        <div
          className="withRow"
          style={{ width: '100%', paddingTop: 10 }}
          onMouseOver={() => {
            self.setState({ open: true })
          }}
        >
          <div className="operationItem languageName withRowLeftAuto">
            {intl.formatMessage({ id: 'app.languages.' + selectLanguage })}
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
            className="languageOpen"
            onMouseLeave={() => {
              self.setState({ open: false })
            }}
          >
            {languages.map((language: string) => {
              var className = 'languageItem'
              if (language === selectLanguage) {
                className += ' languageItemSelected'
              }
              return (
                <div
                  onClick={() => {
                    self.props.appAction.switchLanguage(language)
                    setSelectLanguage(language)
                    self.setState({
                      open: false
                    })
                  }}
                  className={className}
                >
                  {intl.formatMessage({ id: 'app.languages.' + language })}
                </div>
              )
            })}
          </div>
        ) : null}
      </div>
    )
  }
}
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
    var intl = self.props.intl
    return (
      <div
        className="network"
        style={{ position: 'fixed', top: 20, width: 120 }}
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
            <div style={{ display: 'none' }}>
              {intl.formatMessage({ id: 'app.header.network.title' })}
            </div>
            <div className="withRow" style={{ marginTop: 14, height: 34 }}>
              <div className="withRowLeftAuto">
                <input
                  autoFocus
                  placeholder={intl.formatMessage({
                    id: 'app.header.network.placeholder'
                  })}
                  type="text"
                  ref="search"
                  className="form-control"
                  onFocus={() => {
                    self.keyDownListener = (event: any) => {
                      if (event.keyCode == 13) {
                        var u = self.refs.search.value
                        if (!u) {
                          self.props.appAction.toast(
                            intl.formatMessage({
                              id: 'app.header.network.placeholder'
                            })
                          )
                          return
                        }
                        if (
                          !u.startsWith('http://') &&
                          !u.startsWith('https://')
                        ) {
                          u = 'http://' + u
                        }
                        var newNetwork = {
                          name: 'customer',
                          url: u
                        }
                        addNetwork(newNetwork)
                        setSelectNetwork(newNetwork)
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
                  if (!u) {
                    self.props.appAction.toast(
                      intl.formatMessage({
                        id: 'app.header.network.placeholder'
                      }),
                      3000
                    )
                    return
                  }
                  if (!u.startsWith('http://') && !u.startsWith('https://')) {
                    u = 'http://' + u
                  }
                  var newNetwork = {
                    name: 'customer',
                    url: u
                  }
                  addNetwork(newNetwork)
                  setSelectNetwork(newNetwork)
                  window.location.reload()
                }}
              >
                {intl.formatMessage({ id: 'app.header.network.button' })}
              </div>
            </div>
            <div style={{ marginTop: 9 }}>
              {api.serverList.map(function(item: any) {
                return (
                  <NodeItem
                    key={`server-${item.url}`}
                    selected={item.url == selectNetwork.url}
                    data={item}
                  />
                )
              })}
              {networks.map(function(item: any) {
                return (
                  <NodeItem
                    key={`network-${item.url}`}
                    selected={item.url == selectNetwork.url}
                    data={item}
                    removable={true}
                  />
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
    var intl = self.props.intl
    var data = self.props.data
    var className = 'menu operationItem'
    if (self.props.location.pathname.startsWith(data.path)) {
      className += ' active'
    }
    return (
      <div
        className="operationItem"
        style={{
          width: 35,
          height: 20,
          marginLeft: 40,
          position: 'relative',
          display: 'inline-block'
        }}
      >
        <div style={{ position: 'fixed', width: 35, top: 30 }}>
          <div
            className="withRow"
            onMouseOver={() => {
              self.setState({ open: true })
            }}
          >
            <div className={className} style={{ marginLeft: 0 }}>
              {intl.formatMessage({ id: data.id })}
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
                    {intl.formatMessage({ id: item.id })}
                  </div>
                )
              })}
            </div>
          ) : null}
        </div>
      </div>
    )
  }
}
const menus = [
  {
    id: 'app.header.menus.block',
    path: '/block/list'
  },
  {
    id: 'app.header.menus.transaction',
    path: '/transaction/list'
  },
  {
    id: 'app.header.menus.api',
    path: '/api/',
    subMenus: [
      {
        id: 'app.header.menus.api.rpc',
        path: '/api/rpc'
      },
      {
        id: 'app.header.menus.api.rebirth',
        path: '/api/rebirth'
      }
    ]
  },
  {
    id: 'app.header.menus.static',
    path: '/statics'
  }
]

class SearchBar extends React.Component<any, any> {
  refs: {
    search: any
  } = {
    search: null
  }
  keyDownListener: any
  query() {
    var self = this
    var inputValue = self.refs.search.value
    if (!inputValue) return

    if (isAddress(inputValue)) {
      hashHistory.push('/account/' + format0x(inputValue))
    } else if (isBlockHeight(inputValue)) {
      dataAPI.getBlock(inputValue).then((block: any) => {
        if (block) {
          hashHistory.push('/block/id/' + Number(inputValue))
        } else {
          hashHistory.push('/search?q=' + inputValue)
        }
      })
    } else if (isHash(inputValue)) {
      dataAPI.getTransaction(inputValue).then((transaction: any) => {
        if (transaction) {
          hashHistory.push('/transaction/hash/' + format0x(inputValue))
        } else {
          dataAPI.getBlock(inputValue).then((block: any) => {
            if (block) {
              hashHistory.push('/block/hash/' + format0x(inputValue))
            } else {
              hashHistory.push('/search?q=' + inputValue)
            }
          })
        }
      })
    } else {
      hashHistory.push('/search?q=' + inputValue)
    }
  }
  render() {
    var self = this
    var intl = self.props.intl
    return (
      <div className="input-group">
        <input
          placeholder={intl.formatMessage({
            id: 'app.header.search.placeholder'
          })}
          type="text"
          ref="search"
          maxLength={66}
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
            fontSize: 12,
            flex: 1
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
  }
}

class MobileHeader extends React.Component<any, any> {
  constructor(props: any) {
    super(props)
    this.state = {
      open: false
    }
  }
  render() {
    var self = this
    var intl = self.props.intl
    var networks = getNetworks()
    var selectNetwork = getSelectNetwork()

    return (
      <div className="header">
        <div
          className="drawer"
          onClick={() => {
            self.setState({ open: !this.state.open })
          }}
        >
          <svg
            xmlns="https://www.w3.org/2000/svg"
            viewBox="0 0 30 30"
            width="30"
            height="30"
            focusable="false"
          >
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
              <div
                className="headerLogo operationItem"
                style={{
                  textAlign: 'center',
                  marginBottom: -20,
                  marginTop: 40
                }}
                onClick={() => {
                  hashHistory.push('/')
                  self.setState({
                    open: false
                  })
                }}
              >
                <img src="images/headLogo_Microscope.png" />
              </div>
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
                          {intl.formatMessage({ id: menu.id })}
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
                                  self.setState({
                                    open: false
                                  })
                                }}
                              >
                                {intl.formatMessage({ id: subMenu.id })}
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
                            self.setState({
                              open: false
                            })
                          }}
                        >
                          {intl.formatMessage({ id: menu.id })}
                        </div>
                      )
                    }
                  })}
                </div>
              </div>
            </div>
          </div>
        ) : null}
        <div className="withRow container" style={{ height: 41 }}>
          <div className="withRowLeftAuto" style={{ marginLeft: 20 }}>
            <SearchBar intl={self.props.intl} />
          </div>
          <div style={{ width: 120 }}>
            <NetWork
              intl={self.props.intl}
              networks={networks}
              selectNetwork={selectNetwork}
              appAction={self.props.appAction}
            />
          </div>
        </div>
      </div>
    )
  }
}

class Header extends React.Component<any, any> {
  render() {
    var self = this
    var networks = getNetworks()
    var selectNetwork = getSelectNetwork()
    var intl = self.props.intl
    if (window.innerWidth < 1000) {
      return (
        <MobileHeader
          location={self.props.location}
          key="mobile_header"
          appAction={self.props.appAction}
          intl={self.props.intl}
        />
      )
    } else {
      return (
        <div className="header">
          <div className="withRow container" style={{ height: 41 }}>
            <div
              className="headerLogo operationItem"
              onClick={() => {
                hashHistory.push('/')
              }}
            >
              <img src="images/headLogo_Microscope.png" />
            </div>
            <div
              className="withRowLeftAuto"
              style={{
                fontSize: 16,
                color: '#47484a',
                marginTop: 10,
                height: 20,
                lineHeight: '20px',
                overflow: 'hidden'
              }}
            >
              {menus.map(menu => {
                var className = 'menu operationItem'
                if (self.props.location.pathname == menu.path) {
                  className += ' active'
                }
                if (menu.subMenus) {
                  return (
                    <MoreMenu
                      location={self.props.location}
                      data={menu}
                      intl={intl}
                    />
                  )
                } else {
                  return (
                    <span
                      className={className}
                      onClick={() => {
                        hashHistory.push(menu.path)
                      }}
                    >
                      {intl.formatMessage({ id: menu.id })}
                    </span>
                  )
                }
              })}
            </div>
            <div
              style={{
                width: (360 / 1200) * 100 + '%',
                marginTop: 3,
                marginBottom: 4,
                height: 34
              }}
            >
              <SearchBar intl={self.props.intl} />
            </div>
            <div style={{ width: 120 }}>
              <NetWork
                intl={self.props.intl}
                networks={networks}
                selectNetwork={selectNetwork}
                appAction={self.props.appAction}
              />
            </div>
            <div style={{ width: 60, marginLeft: 10 }}>
              <Language
                intl={self.props.intl}
                appAction={self.props.appAction}
              />
            </div>
          </div>
        </div>
      )
    }
  }
}
import { injectIntl } from 'react-intl'
export default injectIntl(Header)
