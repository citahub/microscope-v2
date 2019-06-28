import * as constants from '../actionTypes'
import { MetaData, RPCData } from '../states/network'

import { showLoading, hideLoading } from './appAction'
import * as dataAPI from '../../utils/dataAPI'

export type NetworkAction = {
  type: string
  data:
    | MetaData
    | {
        input: RPCData
        output: RPCData
      }
    | {
        input: string
        output: string
      }
    | number
}

export function getMetaData() {
  return (dispatch: any) => {
    dispatch(showLoading())
    return dataAPI
      .getMetaData()
      .then((data: MetaData) => {
        dispatch(hideLoading())
        dispatch({
          type: constants.GET_NETWORK_METADATA,
          data: data
        })
        return data
      })
      .catch((error: any) => {
        dispatch(hideLoading())
        dispatch({
          type: constants.OPERATION_FAIL,
          error: error
        })
      })
  }
}

export function getQuotaPrice() {
  return (dispatch: any) => {
    return dataAPI
      .getQuotaPrice()
      .then((data: number) => {
        dispatch({
          type: constants.GET_QUOTA_PRICE,
          data: data
        })
        return data
      })
      .catch((error: any) => {
        dispatch({
          type: constants.OPERATION_FAIL,
          error: error
        })
      })
  }
}

export function rpc(jsonRpc: string) {
  return (dispatch: any) => {
    dispatch(showLoading())
    return dataAPI
      .rpc(jsonRpc)
      .then((data: RPCData) => {
        dispatch(hideLoading())
        dispatch({
          type: constants.GET_NETWORK_RPC,
          data: {
            input: jsonRpc,
            output: data
          }
        })
      })
      .catch((error: any) => {
        dispatch(hideLoading())
        dispatch({
          type: constants.OPERATION_FAIL,
          error: error
        })
      })
  }
}

export function rebirth(url: string, params: any) {
  return (dispatch: any) => {
    dispatch(showLoading())
    return dataAPI
      .rebirth(url, params)
      .then((data: any) => {
        dispatch(hideLoading())
        dispatch({
          type: constants.GET_NETWORK_REBIRTH,
          data: {
            input: params,
            output: data
          }
        })
      })
      .catch((error: any) => {
        dispatch(hideLoading())
        dispatch({
          type: constants.OPERATION_FAIL,
          error: error
        })
      })
  }
}
