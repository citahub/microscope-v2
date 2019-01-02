import { api } from './config'

function getKeyStores() {
  var result = []
  var stores = window.localStorage.getItem('stores')
  if (stores) {
    try {
      result = JSON.parse(stores)
    } catch (e) {
      console.log(e)
      window.localStorage.removeItem('stores')
    } finally {
      return result
    }
  } else {
    return result
  }
}
exports.getKeyStores = getKeyStores
exports.getKeyStore = function getKeyStore(address) {
  var stores = getKeyStores()
  for (var i = 0; i < stores.length; i++) {
    var item = stores[i]
    if (item.keystore.address === address) {
      return item.keystore
    }
  }
  return null
}
exports.addKeyStore = (type, keyObject) => {
  var result = []
  var item = {
    type: type,
    keystore: keyObject
  }
  var stores = window.localStorage.getItem('stores')
  if (stores) {
    try {
      result = JSON.parse(stores)
    } catch (e) {
      console.log(e)
      window.localStorage.removeItem('stores')
    } finally {
      result.push(item)
    }
  } else {
    result.push(item)
  }
  window.localStorage.setItem('stores', JSON.stringify(result))
}
exports.getSelectAddress = () => {
  return window.localStorage.getItem('selectAddress')
}
exports.setSelectAddress = address => {
  window.localStorage.setItem('selectAddress', address)
}
exports.clearAll = () => {
  window.localStorage.removeItem('selectAddress')
  window.localStorage.removeItem('stores')
}

exports.getSelectNetwork = () => {
  var network = window.localStorage.getItem('selectNetwork')
  var defaultNetwork = api.appWeb3AllPrivders[0]
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
