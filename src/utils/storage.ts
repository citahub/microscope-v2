import  { api, ServerNode  } from './config'

export function clearAll() {
  window.localStorage.removeItem('selectNetwork')
}

export function getSelectNetwork():ServerNode {
  var networkStr = window.localStorage.getItem('selectNetwork')
  var defaultNetwork = api.serverList[0]
  var result:ServerNode;
  if (networkStr) {
    try {
      result = JSON.parse(networkStr)
    } catch (e) {
      result = defaultNetwork
    }
  } else {
    result = defaultNetwork
  }
  return result
}

export function setSelectNetwork(network:ServerNode) {
  window.localStorage.setItem('selectNetwork', JSON.stringify(network))
}

/**
  joyride for newFunction guide relative info
*/
var JOYRIDE_PREFIX = 'joyride_'

export function getAlreadyJoyrideFlag(selector:string) {
  try {
    var value = window.localStorage.getItem(JOYRIDE_PREFIX + selector)
    if (value === 'true') return true
    return false
  } catch (e) {
    return false
  }
}
export function setAlreadyJoyrideFlag(selector:string) {
  try {
    window.localStorage.setItem(JOYRIDE_PREFIX + selector, true+"")
  } catch (e) {
    // if (e.name === 'QuotaExceededError') {
    //   // console.log('已经超出本地存储限定大小！')
    //   window.localStorage.setItem(JOYRIDE_PREFIX + selector, true+"")
    // }
  }
}
