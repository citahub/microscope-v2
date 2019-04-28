import * as constants from '../actionTypes'
import { AccountState } from '../states/account'

const initialState: AccountState = {
  trList: {
    pageNum: 1,
    pageSize: 10,
    addressFrom: '',
    addressTo: '',
    total: 0,
    list: null
  },
  erc20List: {
    pageNum: 1,
    pageSize: 10,
    addressFrom: '',
    addressTo: '',
    total: 0,
    list: null
  },
  balance: null,
  code: null,
  abi: null
}

export default function(
  state: AccountState = initialState,
  action: any
) {
  switch (action.type) {
    case constants.GET_ACCOUNT_BALANCE:
      return {
        ...state,
        balance: action.data
      }
    case constants.GET_ACCOUNT_TR_LIST:
      return {
        ...state,
        trList: action.data
      }
    case constants.GET_ACCOUNT_ERC20_LIST:
      return {
        ...state,
        erc20List: action.data
      }
    case constants.GET_ACCOUNT_CODE:
      return {
        ...state,
        code: action.data
      }
    case constants.GET_ACCOUNT_ABI:
      return {
        ...state,
        abi: action.data
      }
    default:
      return state
  }
}
