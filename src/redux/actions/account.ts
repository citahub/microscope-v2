import * as constants from '../actionTypes'
import { showLoading, hideLoading } from './appAction'
import * as dataAPI from '../../utils/dataAPI'
import { TransactionList } from '../states/transaction'

interface GET_ACCOUNT_TR_LIST {
  type: constants.GET_ACCOUNT_TR_LIST
  data: TransactionList
}

interface GET_ACCOUNT_ERC20_LIST {
  type: constants.GET_ACCOUNT_ERC20_LIST
  data: TransactionList
}

interface GET_ACCOUNT_BALANCE {
  type: constants.GET_ACCOUNT_BALANCE
  data: string | null
}

export type AccountAction =
  | GET_ACCOUNT_TR_LIST
  | GET_ACCOUNT_ERC20_LIST
  | GET_ACCOUNT_BALANCE

export function getTransactionListByAccount(
  account: string,
  pageNum: number,
  pageSize: number
) {
  return (dispatch: any) => {
    dispatch(showLoading())
    return dataAPI
      .getTransactionListByAccount(account, pageNum, pageSize)
      .then((data: any) => {
        dispatch(hideLoading())
        dispatch({
          type: constants.GET_ACCOUNT_TR_LIST,
          data: {
            pageNum: pageNum,
            pageSize: pageSize,
            list: data.transactions,
            total: data.count
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

export function getERC20TransactionListByAccount(
  account: string,
  pageNum: number,
  pageSize: number
) {
  return (dispatch: any) => {
    dispatch(showLoading())
    return dataAPI
      .getERC20TransactionListByAccount(account, pageNum, pageSize)
      .then((data: any) => {
        dispatch(hideLoading())
        dispatch({
          type: constants.GET_ACCOUNT_ERC20_LIST,
          data: {
            pageNum: pageNum,
            pageSize: pageSize,
            list: data.transfers,
            total: data.count
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

export function getBalance(account: string) {
  return (dispatch: any) => {
    dispatch(showLoading())
    return dataAPI
      .getBalance(account)
      .then((data: any) => {
        dispatch(hideLoading())
        // alert(data);
        dispatch({
          type: constants.GET_ACCOUNT_BALANCE,
          data: data
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
