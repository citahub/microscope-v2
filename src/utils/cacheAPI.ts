import * as request from './request'
import * as config from './config'
import { ServerNode } from './config'
import { getSelectNetwork } from './storage'
import AppChain from '@cryptape/cita-sdk'

var serverNode:ServerNode = getSelectNetwork()

export function topTransactions():any{
  return request
    .get(serverNode.url + config.api.transactionList, {})
    .then((data:any) => {
      return data && data.result.transactions
    })
    .catch((error:object) => {
      throw error
    })
}
export function transactionList(pageNum:number,pageSize:number,account:string | null):any {
  var params = {
    "account":  account,  //# hash string
    // "from":  "the addr transactions from", # hash string
    // "to":  "the addr transactions to", # hash string
    // "valueFormat": "decimal", # set value to decimal number, default hex number
    "page": pageNum, //# integer, default 1
    "perPage":pageSize, //# integer, default 10
    // //# offset and limit has lower priority than page and perPage
    // "offset":  "1",// # integer, default to 0
    // "limit":  "10", //# integer, default to 10
  }
  return request
    .get(serverNode.url + config.api.transactionList, params)
    .then((data:any) => {
      var list = data && data.result
      console.log(list)
      list.transactions.forEach((d:any)=>{
        // d = {
        //   ...d,
        //   unsignedTransaction: unsigner(d.content)
        // }
        d.unsignedTransaction = appchain.base.unsigner(d.content)
      })
      console.log(list)
      return list
    })
    .catch((error:object) => {
      throw error
    })
}
export function erc20TransactionList(pageNum:number,pageSize:number,account:string | null):any{
  var params = {
    "address": account, //# hash
     // "from": "from address", //# hash
     // "to": "to address", //# hash
     "page": pageNum, //# default 1
     "perPage": pageSize, //# default 10

     //# offset and limit has lower priority than page and perPage
     // "offset": 1, //# default 0
     // "limit": 10 //# default 10
  }
  return request
    .get(serverNode.url + config.api.ercTransactionList, params)
    .then((data:any) => {
      return data && data.result
    })
    .catch((error:object) => {
      throw error
    })
}
export function topBlocks():any{
  return request
    .get(serverNode.url + config.api.blockList, {})
    .then((data:any) => {
      return data && data.result.blocks
    })
    .catch((error:object) => {
      throw error
    })
}
export function blockList(pageNum:number,pageSize:number):any{
  var params = {
    // "account":  "the addr transactions related to (from or to)", # hash string
    // "from":  "the addr transactions from", # hash string
    // "to":  "the addr transactions to", # hash string
    // "valueFormat": "decimal", # set value to decimal number, default hex number
    "page": pageNum, //# integer, default 1
    "perPage": pageSize, //# integer, default 10
    // //# offset and limit has lower priority than page and perPage
    // "offset":  "1",// # integer, default to 0
    // "limit":  "10", //# integer, default to 10
  }
  return request
    .get(serverNode.url + config.api.blockList, params)
    .then((data:any) => {
      return data && data.result
    })
    .catch((error:object) => {
      throw error
    })
}

const appchain = AppChain(serverNode.url)

export function getMetaData(){
  return appchain.base.getMetaData()
}

export function getBalance(address:string){
  return appchain.base.getBalance(address)
}

export function getBlockByHash(hash:any){
  return appchain.base.getBlockByHash(hash)
}
export function getBlock(key:number|string){
  return appchain.base.getBlock(key)
}

export function getTransaction(hash:string){
  return appchain.base.getTransaction(hash)
}
export function getTransactionReceipt(hash:string){
  return appchain.base.getTransactionReceipt(hash)
}


// export function getLatestBlock():any{
//   return request.get(serverNode.url + config.api.url, {})
//           .then((data:any) => {
//             // alert(data);
//             var appchain2 = AppChain(data.result.ws_url || data.result.http_url);
//             return appchain2.base.newBlockFilter().then((filterId:string)=>{
//               var newBlock = function(){
//                 appchain2.base.getFilterChanges(filterId).then((newBlocks: Array<any>)=>{
//                   console.log(newBlocks,new Date());
//                   setTimeout(()=>{newBlock()},3000);
//                 })
//               }
//               return newBlock();
//             })
//           })
//           .catch((error:Error) => {
//             throw error;
//           })
//
//
// }
export function getBlockNumber():any{
  return appchain.base.getBlockNumber()
}

export function listenBlock(){
  return appchain.base.newBlockFilter().then((filterId:any)=>{
        var tick = function(){
          return appchain.base.getFilterChanges(filterId).then((newBlocks: Array<any>)=>{
            console.log(newBlocks,new Date());
            return newBlocks;
            // setTimeout(()=>{newBlock()},3000);
          })
        }
        return tick
  }).catch((e:Error)=>{
    console.log(e);
    throw e;
  })
}

export function rpc(json:any){
  return request
    .post(serverNode.url + config.api.jsonRpc, json,{},'omit')
    .then((data:any) => {
      return data
    })
    .catch((error:object) => {
      throw error
    })
}

export function rebirth(url:string,params:object){
  return request
    .get(url,params)
    .then((data:any) => {
      return data
    })
    .catch((error:object) => {
      throw error
    })
}
