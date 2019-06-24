const queryString = require('query-string')
require('es6-promise').polyfill()
require('isomorphic-fetch')
import config from './config'

function filterStatus(res: any) {
  if (res.status >= 0xc8 && res.status < 0x12c) {
    return res
  }
  const error = new Error(
    typeof window === 'undefined' ? res.statusText : config.apiErrorMsg
  )
  error.name = config.apiErrorMsg
  throw error
}

function filterJSON(res: any) {
  var r = res.text()
  r = r.then(function(text: string) {
    var result = {}
    try {
      result = JSON.parse(text)
    } catch (e) {
      try {
        result = global.eval('(' + text + ')')
      } catch (e2) {}
    }
    return result
  })
  return r
}

function _fetch(fetchPromise: any, timeout: number) {
  var abortPromise = new Promise(function(resolve, reject) {
    setTimeout(reject, timeout)
  })

  var abortablePromise = Promise.race([fetchPromise, abortPromise]).catch(
    function(e) {
      const error = new Error(
        typeof window === 'undefined' ? e : config.apiErrorMsg
      )
      error.name = config.apiErrorMsg
      throw error
    }
  )
  return abortablePromise
}

function apiUrl(url: string) {
  if (url) {
    if (url.startsWith) {
      if (url.startsWith('http:') || url.startsWith('https:')) {
        return url
      }
    }
    if (new RegExp('^http[s]*').test(url)) {
      // hack for lower version device not support startsWith
      return url
    }
  }
  if (typeof window !== 'undefined') {
    return window.location.protocol + url
  }
  return 'http:' + url
}

export function commonGet(
  url: string,
  params: any,
  headers = {},
  filterStatusFlag = true,
  filterJSONFlag = true,
  credentials: any = 'omit'
) {
  let _url = apiUrl(url)
  if (params) {
    _url += `?${queryString.stringify(params)}`
  }

  var result = _fetch(
    fetch(_url, { method: 'GET', headers: headers, credentials: credentials }),
    config.apiTimeout
  )

  if (filterStatusFlag === true) {
    result = result.then(filterStatus)
    if (filterJSONFlag === true) {
      result = result.then(filterJSON)
    }
  }

  return result
}
export function get(url: string, params: any) {
  return commonGet(url, params, {}, true, true)
}

export function putAndPost(
  url: string,
  method: string,
  params: any,
  headers: any,
  credentials: any = 'omit'
) {
  var defHeader = {
    'Content-Type': 'application/json; charset=utf-8'
  }

  if (headers && Object.assign) {
    defHeader = {
      ...defHeader,
      ...headers
    }
  }

  return _fetch(
    fetch(apiUrl(url), {
      method: method,
      headers: defHeader,
      credentials: credentials,
      body: JSON.stringify(params)
    }),
    params['timeout'] || config.apiTimeout
  ).then(filterJSON)
}

export function post(
  url: string,
  params: any,
  headers: any,
  credentials: string
) {
  return putAndPost(url, 'POST', params, headers, credentials)
}
