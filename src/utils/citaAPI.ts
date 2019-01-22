import AppChain from '@appchain/base'
import { getSelectNetwork } from './storage'
// import * as request from './request'

import { ServerNode } from './config'

const serverNode:ServerNode = getSelectNetwork()
const appchain = AppChain(serverNode.url)

// appchain.base.peerCount().then(d => {
//   console.log(d)
// })
// appchain.base.getMetaData().then(d => {
//   console.log(d)
// })

// export function getMetaData(){
//   return appchain.base.getMetaData()
// }

export function newBlockFilter(){
  return appchain.base.newBlockFilter()
}

export function getFilterChanges(filterId:any){
  return appchain.base.getFilterChanges(filterId)
}

export function rpc(method:string,params:any|null){
  try{
    console.log(params);
    if(params){
      return appchain.base[method](params);
    }
    return appchain.base[method]();
  }catch(e){
    throw e
  }

}

// export function getBlockByHash(hash:any){
//   return appchain.base.getBlockByHash(hash)
// }
// export function getBlock(key:number|string){
//   return appchain.base.getBlock(key)
// }
// export function getTransaction(hash:string){
//   return appchain.base.getTransaction(hash)
// }
