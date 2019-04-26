import * as constants from '../actionTypes'
import { NetworkAction } from '../actions/network'
import { NetworkState } from '../states/network'

const initialState: NetworkState = {
  metaData: null,
  quotaPrice: null,
  rpcData: {
    input: null,
    output: null
  },
  rebirthData: {
    input: null,
    output: null
  }
}

export default function(
  state: NetworkState = initialState,
  action: NetworkAction
) {
  switch (action.type) {
    case constants.GET_NETWORK_METADATA:
      return {
        ...state,
        metaData: action.data
      }
    case constants.GET_NETWORK_RPC:
      return {
        ...state,
        rpcData: action.data
      }
    case constants.GET_NETWORK_REBIRTH:
      return {
        ...state,
        rebirthData: action.data
      }
    case constants.GET_QUOTA_PRICE:
      return {
        ...state,
        quotaPrice: action.data
      }
    default:
      return state
  }
}
