import * as constants from '../actionTypes'
import { MetaData,RPCData } from '../states/network'

import {showLoading, hideLoading} from './appAction'
import * as dataAPI from '../../utils/dataAPI';

interface GET_NETWORK_METADATA {
    type: constants.GET_NETWORK_METADATA;
    data: MetaData;
}

interface GET_NETWORK_RPC {
    type: constants.GET_NETWORK_RPC;
    data: {
      input: RPCData,
      output: RPCData
    };
}

interface GET_NETWORK_REBIRTH {
    type: constants.GET_NETWORK_REBIRTH;
    data: {
      input: string,
      output: string
    };
}


//
//
export type NetworkAction = GET_NETWORK_METADATA | GET_NETWORK_RPC | GET_NETWORK_REBIRTH;

//
// export function getMetaData() {
//
//   return dataAPI.getMetaData();
// }

export function getMetaData() {
  return (dispatch:any) => {
    dispatch(showLoading())
    return dataAPI.getMetaData().then((data:MetaData) => {
      dispatch(hideLoading())
      dispatch({
        type: constants.GET_NETWORK_METADATA,
        data: data
      });
    }).catch((error:any) => {
      dispatch(hideLoading())
      dispatch({
        type: constants.OPERATION_FAIL,
        error: error
      });
    })
  }
}

export function rpc(jsonRpc) {
  return (dispatch:any) => {
    dispatch(showLoading())
    return dataAPI.rpc(jsonRpc).then((data:RPCData) => {
      dispatch(hideLoading())
      dispatch({
        type: constants.GET_NETWORK_RPC,
        data: {
          input: jsonRpc,
          output: data
        }
      });
    }).catch((error:any) => {
      dispatch(hideLoading())
      dispatch({
        type: constants.OPERATION_FAIL,
        error: error
      });
    })
  }
}

export function rebirth(url,params) {
  // var url = method ;
  return (dispatch:any) => {
    dispatch(showLoading())
    return dataAPI.rebirth(url,params).then((data:any) => {
      dispatch(hideLoading())
      dispatch({
        type: constants.GET_NETWORK_REBIRTH,
        data: {
          input: params,
          output: data
        }
      });
    }).catch((error:any) => {
      dispatch(hideLoading())
      dispatch({
        type: constants.OPERATION_FAIL,
        error: error
      });
    })
  }
}

export function getBlockNumber() {
  //
  return (dispatch:any) => {
    return dataAPI.getBlockNumber().then((data:any) => {
      // console.log(data,"getLatestBlock");
      // setInterval(function(){
      //   getBlock().then(function(d){
      //     console.log(d);
      //   })
      // },3000);
      console.log(data);


      // dispatch({
      //   type: constants.GET_NETWORK_METADATA,
      //   data: data
      // });
    }).catch((error:any) => {
      alert(error);
      dispatch({
        type: constants.OPERATION_FAIL,
        error: error
      });
    })
  }
}

// bad practice
// export function listenBlock() {
//   //
//   return (dispatch:any) => {
//     return dataAPI.listenBlock().then((tick:any) => {
//       // console.log(data,"getLatestBlock");
//       // setInterval(function(){
//       //   getBlock().then(function(d){
//       //     console.log(d);
//       //   })
//       // },3000);
//       // console.log(tick);
//
//       setInterval(()=>{
//         tick().then((hashes:Array<string>)=>{
//           console.log(hashes);
//           hashes.forEach((hash)=>{
//             console.log(hash);
//           })
//         })
//       },3000)
//
//
//       // dispatch({
//       //   type: constants.GET_NETWORK_METADATA,
//       //   data: data
//       // });
//     }).catch((error:any) => {
//       alert(error);
//       dispatch({
//         type: constants.OPERATION_FAIL,
//         error: error
//       });
//     })
//   }
// }
