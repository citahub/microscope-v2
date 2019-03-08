import * as constants from '../actionTypes'
import { BlockAction } from '../actions/block'
import { BlockState } from '../states/block'

const initialState: BlockState = {
  topList: null,
  latest: null,
  item:  null,
  list: {
    pageNum:  1,
    pageSize:  10,
    total:  0,
    list: null
  }
}

function insertAndRemove(list:any,element:any){
  var result = list || []
  result.unshift(element);
  if(result.length>10){
    result.pop();
  }
  return result
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
    case constants.GET_LATEST_BLOCK:
      return {
        ...state,
        latest: action.data
      }
    case constants.APPEND_LATEST_BLOCK:
      return {
        ...state,
        topList: insertAndRemove(state.topList,action.data)
      }
    default:
      return state
  }
}
