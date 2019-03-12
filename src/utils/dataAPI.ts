/*
 the main api for this application in fluture which currenlty based on citaAPI and cacheAPI
*/
// import * as citaAPI from './citaAPI'
import * as cacheAPI from './cacheAPI'

export function topTransactions() {
  return cacheAPI.topTransactions()
}
export function getTransaction(key: string) {
  return cacheAPI.getTransaction(key)
}
export function getTransactionReceipt(key: string) {
  return cacheAPI.getTransactionReceipt(key)
}

export function getTransactionList(pageNum: number, pageSize: number,addressFrom:string, addressTo:string) {
  // alert(addressFrom)
  // alert(addressTo)
  return cacheAPI.transactionList(pageNum, pageSize, '', addressFrom, addressTo)
}

export function getTransactionListByAccount(
  account: string,
  pageNum: number,
  pageSize: number
) {
  return cacheAPI.transactionList(pageNum, pageSize, account,'','')
}

export function getERC20TransactionListByAccount(
  account: string,
  pageNum: number,
  pageSize: number
) {
  return cacheAPI.erc20TransactionList(pageNum, pageSize, account)
}

export function topBlocks() {
  return cacheAPI.topBlocks()
}
export function getBlock(key: string) {
  return cacheAPI.getBlock(key)
}
export function getBlockList(pageNum: number, pageSize: number) {
  return cacheAPI.blockList(pageNum, pageSize)
}

export function getMetaData() {
  return cacheAPI.getMetaData()
}

export function getBalance(address: string) {
  return cacheAPI.getBalance(address)
}

export function getBlockNumber() {
  return cacheAPI.getBlockNumber()
}
export function getAbi(contractAddress: string) {
  return cacheAPI.getAbi(contractAddress)
}
// export function listenBlock(){
//   return cacheAPI.listenBlock();
// }
//
// export function rpc(method:string,params:any){
//   return citaAPI.rpc(method,params)
// }
export function rpc(json: string) {
  return cacheAPI.rpc(json)
}

export function rebirth(url: string, params: any) {
  return cacheAPI.rebirth(url, params)
}
