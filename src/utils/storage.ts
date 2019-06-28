import { api, ServerNode } from './config'
import { defaultLanguage } from '../locale/i18n'

export const defaultNetwork: ServerNode = api.serverList[0]
export function clearAll() {
  window.localStorage.removeItem('selectNetwork')
  window.localStorage.removeItem('networks')
  window.localStorage.removeItem('selectLanguage')
}

export function getSelectNetwork(): ServerNode {
  var networkStr = window.localStorage.getItem('selectNetwork')
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
      console.error(e)
      window.localStorage.removeItem('networks')
    } finally {
      return result
    }
  } else {
    return result
  }
}

export function addNetwork(network: ServerNode) {
  removeNetwork(network)
  var result = []
  var networks = window.localStorage.getItem('networks')
  if (networks) {
    try {
      result = JSON.parse(networks)
    } catch (e) {
      console.error(e)
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
      console.error(e)
      window.localStorage.removeItem('networks')
    } finally {
      result = result.filter((node: any) => {
        return JSON.stringify(node) !== JSON.stringify(network)
      })
      window.localStorage.setItem('networks', JSON.stringify(result))
    }
  }
}

export function setSelectNetwork(network: ServerNode) {
  window.localStorage.setItem('selectNetwork', JSON.stringify(network))
}

export function setSelectLanguage(language: any) {
  window.localStorage.setItem('selectLanguage', JSON.stringify(language))
}

export function getSelectLanguage(): any {
  var languageStr = window.localStorage.getItem('selectLanguage')
  var result: any
  if (languageStr) {
    try {
      result = JSON.parse(languageStr)
    } catch (e) {
      result = defaultLanguage
    }
  } else {
    result = defaultLanguage
  }
  return result
}
