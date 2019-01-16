import * as constants from '../actionTypes'
import { AccountAction } from '../actions/account'
import { AccountState } from '../states/account'

const initialState: AccountState = {
  trList:  {
    pageNum:  1,
    pageSize:  10,
    total:  0,
    list: null
  },
}

export default function(state:AccountState = initialState, action: AccountAction) {
  switch (action.type) {
    case constants.GET_ACCOUNT_TR_LIST:
      return {
        ...state,
        trList: action.data
      }
    default:
      return state
  }
}
