import * as request from './request'
import * as config from './config'
import { getSelectNetwork } from './storage'
import AppChain from '@appchain/base'

var queryServer = getSelectNetwork()
export function topTransactions() {
  return request
    .get(queryServer + config.api.transactionList, {}, {})
    .then((data:any) => {
      return data && data.result.transactions
    })
    .catch((error:object) => {
      throw error
    })
}
export function transactionList(pageNum:number,pageSize:number,account:string | null) {
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
    .get(queryServer + config.api.transactionList, params, {})
    .then((data:any) => {
      return data && data.result
    })
    .catch((error:object) => {
      throw error
    })
}

export function topBlocks() {
  return request
    .get(queryServer + config.api.blockList, {}, {})
    .then((data:any) => {
      return data && data.result.blocks
    })
    .catch((error:object) => {
      throw error
    })
}
export function blockList(pageNum:number,pageSize:number) {
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
    .get(queryServer + config.api.blockList, params, {})
    .then((data:any) => {
      return data && data.result
    })
    .catch((error:object) => {
      throw error
    })
}

const appchain = AppChain(queryServer)

export function getMetaData(){
  return appchain.base.getMetaData()
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

export function getLatestBlock(){
  return request.get(queryServer + config.api.status, {}, {})
          .then((data:any) => {
            // alert(data);
            var appchain2 = AppChain(data.result.ws_url || data.result.http_url);
            return appchain2.base.newBlockFilter().then((filterId:string)=>{
              var newBlock = function(){
                appchain2.base.getFilterChanges(filterId).then((newBlocks: Array<any>)=>{
                  console.log(newBlocks,new Date());
                  setTimeout(()=>{newBlock()},3000);
                })
              }
              return newBlock();
            })
          })
          .catch((error:Error) => {
            throw error;
          })


}
