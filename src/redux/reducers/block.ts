import * as constants from '../actionTypes'
import { BlockAction } from '../actions/block'
import { BlockState } from '../states/block'

const initialState: BlockState = {
  topList: null,
  item:  null,
  list: {
    pageNum:  1,
    pageSize:  10,
    total:  0,
    list: null
  }
}

export default function(state:BlockState = initialState, action: BlockAction) {
  switch (action.type) {
    case constants.GET_TOP_BLOCKS:
      return {
        ...state,
        topList: action.data
      }
    case constants.GET_BLOCK_ITEM:
      return {
        ...state,
        item: action.data
      }
    case constants.GET_BLOCK_LIST:
      return {
        ...state,
        list: action.data
      }
    default:
      return state
  }
}
