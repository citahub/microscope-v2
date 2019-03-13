import { api, ServerNode } from './config'

export function clearAll() {
  window.localStorage.removeItem('selectNetwork')
  window.localStorage.removeItem('networks')
}

export function getSelectNetwork(): ServerNode {
  var networkStr = window.localStorage.getItem('selectNetwork')
  var defaultNetwork = api.serverList[0]
  var result: ServerNode
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

export function getNetworks(): Array<ServerNode> {
  var result: any[] = []
  var networks = window.localStorage.getItem('networks')
  if (networks) {
    try {
      result = JSON.parse(networks)
    } catch (e) {
      console.log(e)
      window.localStorage.removeItem('networks')
    } finally {
      return result
    }
  } else {
    return result
  }
}

export function addNetwork(network: ServerNode) {
  var result = []
  var networks = window.localStorage.getItem('networks')
  if (networks) {
    try {
      result = JSON.parse(networks)
    } catch (e) {
      console.log(e)
      window.localStorage.removeItem('networks')
    } finally {
      result.push(network)
    }
  } else {
    result.push(network)
  }
  window.localStorage.setItem('networks', JSON.stringify(result))
}

export function removeNetwork(network: ServerNode) {
  var result = []
  var networks = window.localStorage.getItem('networks')
  if (networks) {
    try {
      result = JSON.parse(networks)
    } catch (e) {
      console.log(e)
      window.localStorage.removeItem('networks')
    } finally {
      result.push(network)
    }
  } else {
    result.push(network)
  }
  window.localStorage.setItem('networks', JSON.stringify(result))
}

export function setSelectNetwork(network: ServerNode) {
  window.localStorage.setItem('selectNetwork', JSON.stringify(network))
}
