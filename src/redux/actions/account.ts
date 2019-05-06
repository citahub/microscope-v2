import * as constants from '../actionTypes'
import { showLoading, hideLoading } from './appAction'
import * as dataAPI from '../../utils/dataAPI'

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

export function getCode(address: string) {
  return (dispatch: any) => {
    return dataAPI
      .getCode(address)
      .then((code: any) => {
        dispatch({
          type: constants.GET_ACCOUNT_CODE,
          data: code
        })
      })
      .catch((error: any) => {
        dispatch({
          type: constants.OPERATION_FAIL,
          error: error
        })
      })
  }
}

export function getAbi(address: string) {
  return (dispatch: any) => {
    return dataAPI
      .getAbi(address)
      .then((code: any) => {
        dispatch({
          type: constants.GET_ACCOUNT_ABI,
          data: code
        })
      })
      .catch((error: any) => {
        dispatch({
          type: constants.OPERATION_FAIL,
          error: error
        })
      })
  }
}
