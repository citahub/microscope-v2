import { api } from './config'

exports.clearAll = () => {
  window.localStorage.removeItem('selectNetwork')
}

exports.getSelectNetwork = () => {
  var network = window.localStorage.getItem('selectNetwork')
  var defaultNetwork = api.serverList[0]
  if (network) {
    try {
      network = JSON.parse(network)
    } catch (e) {
      network = defaultNetwork
    }
  } else {
    network = defaultNetwork
  }
  return network
}
exports.setSelectNetwork = network => {
  window.localStorage.setItem('selectNetwork', JSON.stringify(network))
}

/**
  joyride for newFunction guide relative info
*/
var JOYRIDE_PREFIX = 'joyride_'

export function getAlreadyJoyrideFlag(selector) {
  try {
    var value = window.localStorage.getItem(JOYRIDE_PREFIX + selector)
    if (value === 'true') return true
    return false
  } catch (e) {
    return false
  }
}
export function setAlreadyJoyrideFlag(selector) {
  try {
    window.localStorage.setItem(JOYRIDE_PREFIX + selector, true)
  } catch (e) {
    if (e.name === 'QuotaExceededError') {
      console.log('已经超出本地存储限定大小！')
      freeLocalStorage()
      window.localStorage.setItem(JOYRIDE_PREFIX + selector, true)
    }
  }
}
