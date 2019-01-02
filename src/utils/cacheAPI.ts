import * as request from './request'
import * as config from './config'
export function transactionList() {
  var params = {
    // "account":  "the addr transactions related to (from or to)", # hash string
    // "from":  "the addr transactions from", # hash string
    // "to":  "the addr transactions to", # hash string
    // "valueFormat": "decimal", # set value to decimal number, default hex number
    // "page": "1", //# integer, default 1
    // "perPage": "10", //# integer, default 10
    // //# offset and limit has lower priority than page and perPage
    // "offset":  "1",// # integer, default to 0
    // "limit":  "10", //# integer, default to 10
  }
  return request
    .get(config.queryServer + config.api.transactionList, params, {})
    .then(data => {
      return data
    })
    .catch(error => {
      throw error
    })
}
export function blockList() {
  var params = {
    // "account":  "the addr transactions related to (from or to)", # hash string
    // "from":  "the addr transactions from", # hash string
    // "to":  "the addr transactions to", # hash string
    // "valueFormat": "decimal", # set value to decimal number, default hex number
    // "page": "1", //# integer, default 1
    // "perPage": "10", //# integer, default 10
    // //# offset and limit has lower priority than page and perPage
    // "offset":  "1",// # integer, default to 0
    // "limit":  "10", //# integer, default to 10
  }
  return request
    .get(config.queryServer + config.api.blockList, params, {})
    .then(data => {
      return data
    })
    .catch(error => {
      throw error
    })
}
