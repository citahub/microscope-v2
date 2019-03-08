import * as constants from '../actionTypes'
import { TransactionAction } from '../actions/transaction'
import { TransactionState } from '../states/transaction'

function insertAndRemove(list:any,element:any){
  var result = list || []
  result.unshift(element);
  if(result.length>10){
    result.pop();
  }
  return result
}

const initialState: TransactionState = {
  topList: null,
  latest: null,
  item:  null,
  itemReceipt: null,
  list: {
    pageNum:  1,
    pageSize:  10,
    total:  0,
    list: null
  }
}

export default function(state:TransactionState = initialState, action: TransactionAction) {
  switch (action.type) {
    case constants.GET_TOP_TRANSACTIONS:
      return {
        ...state,
        topList: action.data
      }
    case constants.GET_TRANSACTION_ITEM:
      return {
        ...state,
        item: action.data
      }
    case constants.GET_TRANSACTION_RECEIPT_ITEM:
      return {
      ...state,
      itemReceipt: action.data
    }
    case constants.GET_TRANSACTION_LIST:
      return {
        ...state,
        list: action.data
      }
    case constants.APPEND_LATEST_TRANSACTION:
      return {
        ...state,
        topList: insertAndRemove(state.topList,action.data)
      }
    default:
      return state
  }
}
