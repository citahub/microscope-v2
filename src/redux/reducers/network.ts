import * as constants from '../actionTypes'
import { NetworkAction } from '../actions/network'
import { NetworkState } from '../states/network'

const initialState: NetworkState = {
  metaData:  null,
}

export default function(state:NetworkState = initialState, action: NetworkAction) {
  switch (action.type) {
    case constants.GET_NETWORK_METADATA:
      return {
        ...state,
        metaData: action.data
      }
    default:
      return state
  }
}
