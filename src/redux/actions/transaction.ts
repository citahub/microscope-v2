import * as constants from '../actionTypes'
import {
  TransactionItem,
  TransactionReceiptItem,
  TransactionList
} from '../states/transaction'
import { showLoading, hideLoading } from './appAction'

import * as dataAPI from '../../utils/dataAPI'


export type TransactionAction = {
  type: string,
  data: TransactionItem | TransactionReceiptItem | TransactionList | Array<TransactionItem>
}

export function topTransactions() {
  return (dispatch: any) => {
    return dataAPI
      .topTransactions()
      .then((data: Array<TransactionItem>) => {
        dispatch({
          type: constants.GET_TOP_TRANSACTIONS,
          data: data
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

export function getTransaction(key: string) {
  return (dispatch: any) => {
    dispatch(showLoading())
    return dataAPI
      .getTransaction(key)
      .then((data: TransactionItem) => {
        dispatch(hideLoading())
        dispatch({
          type: constants.GET_TRANSACTION_ITEM,
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
export function getTransactionReceipt(key: string) {
  return (dispatch: any) => {
    dispatch(showLoading())
    return dataAPI
      .getTransactionReceipt(key)
      .then((data: any) => {
        dispatch(hideLoading())
        dispatch({
          type: constants.GET_TRANSACTION_RECEIPT_ITEM,
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
export function getTransactionList(
  pageNum: number,
  pageSize: number,
  addressFrom: string,
  addressTo: string
) {
  return (dispatch: any) => {
    dispatch(showLoading())
    return dataAPI
      .getTransactionList(pageNum, pageSize, addressFrom, addressTo)
      .then((data: any) => {
        dispatch(hideLoading())
        dispatch({
          type: constants.GET_TRANSACTION_LIST,
          data: {
            pageNum: pageNum,
            pageSize: pageSize,
            addressFrom: addressFrom || '',
            addressTo: addressTo || '',
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
