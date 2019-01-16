import queryString from 'query-string'
require('es6-promise').polyfill()
require('isomorphic-fetch')
import config from './config'

function filterStatus(res) {
  if (res.status >= 0xc8 && res.status < 0x12c) {
    return res
  }
  const error = new Error(
    typeof global.window === 'undefined' ? res.statusText : config.apiErrorMsg
  )
  error.name = config.apiErrorMsg
  error.res = res
  error.type = 'http'
  throw error
}

function filterJSON(res) {
  // return res.json();
  var r = res.text()
  r = r.then(function(text) {
    var result = {
      // code: -1
    }
    try {
      result = JSON.parse(text)
    } catch (e) {
      // result.retMsg = e.message;
      try {
        result = global.eval('(' + text + ')')
      } catch (e2) {
        // result.retMsg = e2.message;
      }
    }
    return result
  })
  return r
}
//
// function filterCode(json) {
//   if (json && json.code === 0) {
//     return json.data === undefined ? {} : json.data;
//   }
//   if (json.code === 10) {
//     const error = new Error(typeof global.window === 'undefined' ? json.retMsg : config.apiUnAuthMsg);
//     error.name = config.apiUnAuthMsg;
//     throw error;
//   } else {
//     const error = new Error(json.error);
//     error.name = config.apiErrorMsg;
//     throw error;
//   }
// }

function _fetch(fetchPromise, timeout) {
  var abortFn = null
  var abortPromise = new Promise(function(resolve, reject) {
    abortFn = function() {
      reject(config.apiTimeoutMsg || 'abort promise')
    }
  })

  var abortablePromise = Promise.race([fetchPromise, abortPromise]).catch(
    function(e) {
      const error = new Error(
        typeof global.window === 'undefined' ? e : config.apiErrorMsg
      )
      error.name = config.apiErrorMsg
      throw error
    }
  )

  setTimeout(function() {
    abortFn()
  }, timeout)

  return abortablePromise
}

function apiUrl(url) {
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
  if (typeof global.window !== 'undefined') {
    return global.location.protocol + url
  }
  return 'http:' + url
}

export function commonGet(
  url,
  params,
  headers = {},
  filterStatusFlag = true,
  filterJSONFlag = true,
  credentials = 'omit'
) {
  let _url = apiUrl(url)
  if (params) {
    _url += `?${queryString.stringify(params)}`
  }
  // delete headers.host;
  // delete headers.referer;
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
export function get(url, params) {
  return commonGet(url, params, {}, true, true)
}
//
// export function furtherGet(url, params) {
//   return get(url, params).then(filterCode);
// }

export function putAndPost(
  url,
  method,
  params = {},
  headers,
  credentials = 'omit'
) {
  var defHeader = {
    Accept: 'application/json',
    'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
  }

  if (headers && Object.assign) {
    defHeader = {
      ...defHeader,
      ...headers
    }
  }
  var _body = ''
  if (params) {
    var _bodyArr = []
    for (var key in params) {
      if (key !== 'timeout') {
        _bodyArr.push(key + '=' + params[key])
      }
    }
    _body = _bodyArr.join('&')
  }
  return (
    _fetch(
      fetch(apiUrl(url), {
        method: method,
        headers: defHeader,
        credentials: credentials,
        body: _body
      }),
      params['timeout'] || config.apiTimeout
    )
      // .then(filterStatus)
      .then(filterJSON)
  )
  // .then(function(json) {
  //   return jsonReplaceByUrl(url, json);
  // });
}

export function post(url, params, headers, credentials) {
  return putAndPost(url, 'POST', params, headers, credentials)
}

// export function put(url, params, headers) {
//   return putAndPost(url, 'PUT', params, headers);
// }
//
// export function furtherPost(url, params, headers, credentials) {
//   return post(url, params, headers, credentials)
//     .then(filterCode)
//     .catch(error => {
//       throw error;
//     })
// }
//
// export function postFile(url, body, headers, filterStatusFlag = true, filterJSONFlag = true, filterCodeFlag = false, credentials = 'include') {
//   var defHeader = {
//     'Accept': 'application/json'
//   }
//
//   if (headers && Object.assign) {
//     defHeader={
//       ...defHeader,
//       ...headers
//     }
//   }
//   var result = _fetch(fetch(apiUrl(url), { method: 'POST', headers: headers, body: body, credentials: credentials }), config.apiTimeout * 4);
//   if (filterStatusFlag === true) {
//     result = result.then(filterStatus);
//     if (filterJSONFlag === true) {
//       result = result.then(filterJSON)
//                      .then(function(json) {
//                        return jsonReplaceByUrl(apiUrl(url), json);
//                      });
//     }
//     if (filterCodeFlag === true) {
//       return result.then(filterCode).catch(error => { throw error; });
//     }
//   }
//   return result;
// }
