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
//
//
export type NetworkAction = GET_NETWORK_METADATA | GET_NETWORK_RPC;

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

// export function getLatestBlock() {
//   return (dispatch:any) => {
//     return dataAPI.getLatestBlock().then((data:any) => {
//       console.log(data,"getLatestBlock");
//       // dispatch({
//       //   type: constants.GET_NETWORK_METADATA,
//       //   data: data
//       // });
//     }).catch((error:any) => {
//       dispatch({
//         type: constants.OPERATION_FAIL,
//         error: error
//       });
//     })
//   }
// }
