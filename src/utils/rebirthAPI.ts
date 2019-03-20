import * as request from './request'
import * as config from './config'
import { ServerNode } from './config'
import { getSelectNetwork } from './storage'
import AppChain from '@cryptape/cita-sdk'

var serverNode: ServerNode = getSelectNetwork()

export function topTransactions(): any {
  return request
    .get(serverNode.url + config.api.transactionList, {})
    .then((data: any) => {
      return data && data.result.transactions
    })
    .catch((error: object) => {
      throw error
    })
}
export function transactionList(
  pageNum: number,
  pageSize: number,
  account: string,
  addressFrom: string,
  addressTo: string
): any {
  var params = {
    account: account, //# hash string
    from: addressFrom, //"the addr transactions from", # hash string
    to: addressTo, //"the addr transactions to", # hash string
    // "valueFormat": "decimal", # set value to decimal number, default hex number
    page: pageNum, //# integer, default 1
    perPage: pageSize //# integer, default 10
    // //# offset and limit has lower priority than page and perPage
    // "offset":  "1",// # integer, default to 0
    // "limit":  "10", //# integer, default to 10
  }
  return request
    .get(serverNode.url + config.api.transactionList, params)
    .then((data: any) => {
      var list = data && data.result
      list.transactions.forEach((d: any) => {
        d.unsignedTransaction = appchain.base.unsigner(d.content)
      })
      return list
    })
    .catch((error: object) => {
      throw error
    })
}
export function erc20TransactionList(
  pageNum: number,
  pageSize: number,
  account: string | null
): any {
  var params = {
    address: account, //# hash
    // "from": "from address", //# hash
    // "to": "to address", //# hash
    page: pageNum, //# default 1
    perPage: pageSize //# default 10

    //# offset and limit has lower priority than page and perPage
    // "offset": 1, //# default 0
    // "limit": 10 //# default 10
  }
  return request
    .get(serverNode.url + config.api.ercTransactionList, params)
    .then((data: any) => {
      return data && data.result
    })
    .catch((error: object) => {
      throw error
    })
}
export function topBlocks(by: string, count: number): any {
  return request
    .get(serverNode.url + config.api.blockList, {
      page: 1,
      limit: count,
      numberFrom: parseInt(by) - 10,
      numberTo: by
    })
    .then((data: any) => {
      return data && data.result.blocks
    })
    .catch((error: object) => {
      throw error
    })
}
export function blockList(
  pageNum: number,
  pageSize: number,
  blockFrom: string,
  blockTo: string,
  transactionCountMin: string,
  transactionCountMax: string
): any {
  var params = {
    numberFrom: blockFrom, //"10" or "0xa", #  integer or string of hex number
    numberTo: blockTo, //"20" or "0xa", # integer or string of hex number
    transactionFrom: transactionCountMin, // "min transaction count", # integer or string of hex number
    transactionTo: transactionCountMax, // "max transaction count", # integer or string of hex number
    page: pageNum, //# integer, default 1
    perPage: pageSize //# integer, default 10
    // # offset and limit has lower priority than page and perPage
    // "offset": "1", # integer, database offset for pagination
    // "limit": "10", # integer, database limit for pagination
  }
  return request
    .get(serverNode.url + config.api.blockList, params)
    .then((data: any) => {
      return data && data.result
    })
    .catch((error: object) => {
      throw error
    })
}

const appchain = AppChain(serverNode.url)

export function getMetaData() {
  return appchain.base.getMetaData()
}

export function getBalance(address: string) {
  return appchain.base.getBalance(address)
}

export function getBlockByHash(hash: any) {
  return appchain.base.getBlockByHash(hash)
}
export function getBlock(key: number | string) {
  return appchain.base.getBlock(key)
}

export function getTransaction(hash: string) {
  return appchain.base.getTransaction(hash)
}
export function getTransactionReceipt(hash: string) {
  return appchain.base.getTransactionReceipt(hash)
}
export function getAbi(contractAddress: string) {
  return appchain.base.getAbi(contractAddress, 'pending')
}
export function getCode(address: string){
  return appchain.base.getCode(address)
}
export function getBlockNumber(): any {
  return appchain.base.getBlockNumber()
}

export function rpc(json: any) {
  return request
    .post(serverNode.url + config.api.jsonRpc, json, {}, 'omit')
    .then((data: any) => {
      return data
    })
    .catch((error: object) => {
      throw error
    })
}

export function rebirth(url: string, params: object) {
  return request
    .get(url, params)
    .then((data: any) => {
      return data
    })
    .catch((error: object) => {
      throw error
    })
}
export function statics(type:string){
  return request
    .get(serverNode.url + config.api.statistics, {type:type})
    .then((data: any) => {
      return data.result
    })
    .catch((error: object) => {
      throw error
    })
}
