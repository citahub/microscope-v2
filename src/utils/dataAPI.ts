/*
 the main api for this application in fluture which currenlty based on rebirthApi
*/
import * as rebirthAPI from './rebirthAPI'

export function topTransactions() {
  return rebirthAPI.topTransactions()
}
export function getTransaction(key: string) {
  return rebirthAPI.getTransaction(key)
}
export function getTransactionReceipt(key: string) {
  return rebirthAPI.getTransactionReceipt(key)
}

export function getTransactionList(
  pageNum: number,
  pageSize: number,
  addressFrom: string,
  addressTo: string
) {
  return rebirthAPI.transactionList(
    pageNum,
    pageSize,
    '',
    addressFrom,
    addressTo
  )
}

export function getTransactionListByAccount(
  account: string,
  pageNum: number,
  pageSize: number
) {
  return rebirthAPI.transactionList(pageNum, pageSize, account, '', '')
}

export function getERC20TransactionListByAccount(
  account: string,
  pageNum: number,
  pageSize: number
) {
  return rebirthAPI.erc20TransactionList(pageNum, pageSize, account)
}

export function topBlocks(by: string, count: number) {
  return rebirthAPI.topBlocks(by, count)
}
export function getBlock(key: string) {
  return rebirthAPI.getBlock(key)
}
export function getBlockList(
  pageNum: number,
  pageSize: number,
  blockFrom: string,
  blockTo: string,
  transactionCountMin: string,
  transactionCountMax: string
) {
  return rebirthAPI.blockListV2(
    pageNum,
    pageSize,
    blockFrom,
    blockTo,
    transactionCountMin,
    transactionCountMax
  )
}


export function getMetaData() {
  return rebirthAPI.getMetaData()
}

export function getBalance(address: string) {
  return rebirthAPI.getBalance(address)
}

export function getBlockNumber() {
  return rebirthAPI.getBlockNumber()
}
export function getAbi(contractAddress: string) {
  return rebirthAPI.getAbi(contractAddress)
}

export function getCode(address: string) {
  return rebirthAPI.getCode(address)
}

export function rpc(json: string) {
  return rebirthAPI.rpc(json)
}

export function rebirth(url: string, params: any) {
  return rebirthAPI.rebirth(url, params)
}
export function statics(type:string){
  return rebirthAPI.statics(type)
}

export function getQuotaPrice(){
  return rebirthAPI.getQuotaPrice();
}