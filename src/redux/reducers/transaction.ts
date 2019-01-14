import * as constants from '../actionTypes'
import { TransactionAction } from '../actions/transaction'
import { TransactionState } from '../states/transaction'

const initialState: TransactionState = {
  topList: null,
  item:  null,
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
    case constants.GET_TRANSACTION_LIST:
      return {
        ...state,
        list: action.data
      }
    default:
      return state
  }
}
