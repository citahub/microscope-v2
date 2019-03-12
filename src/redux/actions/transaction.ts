import * as constants from '../actionTypes'
import {
  TransactionItem,
  TransactionReceiptItem,
  TransactionList
} from '../states/transaction'
import { showLoading, hideLoading } from './appAction'

import * as dataAPI from '../../utils/dataAPI'

interface GET_TRANSACTION_ITEM {
  type: constants.GET_TRANSACTION_ITEM
  data: TransactionItem
}
interface GET_TRANSACTION_RECEIPT_ITEM {
  type: constants.GET_TRANSACTION_RECEIPT_ITEM
  data: TransactionReceiptItem
}

interface GET_TRANSACTION_LIST {
  type: constants.GET_TRANSACTION_LIST
  data: TransactionList
}
interface GET_TOP_TRANSACTIONS {
  type: constants.GET_TOP_TRANSACTIONS
  data: Array<TransactionItem>
}
interface APPEND_LATEST_TRANSACTION {
  type: constants.APPEND_LATEST_TRANSACTION
  data: TransactionItem
}

export type TransactionAction =
  | GET_TRANSACTION_ITEM
  | GET_TRANSACTION_RECEIPT_ITEM
  | GET_TRANSACTION_LIST
  | GET_TOP_TRANSACTIONS
  | APPEND_LATEST_TRANSACTION

export function topTransactions() {
  // return dataAPI.topTransactions();
  return (dispatch: any) => {
    // dispatch(showLoading())
    return dataAPI
      .topTransactions()
      .then((data: Array<TransactionItem>) => {
        // dispatch(hideLoading())
        dispatch({
          type: constants.GET_TOP_TRANSACTIONS,
          data: data
        })
      })
      .catch((error: any) => {
        // dispatch(hideLoading())
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
export function getTransactionList(pageNum: number, pageSize: number) {
  return (dispatch: any) => {
    // dispatch(showLoading())
    return dataAPI
      .getTransactionList(pageNum, pageSize)
      .then((data: any) => {
        // dispatch(hideLoading())
        dispatch({
          type: constants.GET_TRANSACTION_LIST,
          data: {
            pageNum: pageNum,
            pageSize: pageSize,
            list: data.transactions,
            total: data.count
          }
        })
      })
      .catch((error: any) => {
        // dispatch(hideLoading())
        dispatch({
          type: constants.OPERATION_FAIL,
          error: error
        })
      })
  }
}
