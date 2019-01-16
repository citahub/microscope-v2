import * as constants from '../actionTypes'
import {showLoading, hideLoading} from './appAction'
import * as dataAPI from '../../utils/dataAPI';
import { TransactionList } from '../states/transaction'

interface GET_ACCOUNT_TR_LIST {
    type: constants.GET_ACCOUNT_TR_LIST;
    data: TransactionList;
}
export type AccountAction = GET_ACCOUNT_TR_LIST ;


export function getTransactionListByAccount(account:string, pageNum:number,pageSize:number) {
  return (dispatch:any) => {
    dispatch(showLoading())
    return dataAPI.getTransactionListByAccount(account,pageNum,pageSize).then((data:any) => {
      dispatch(hideLoading())
      dispatch({
        type: constants.GET_ACCOUNT_TR_LIST,
        data: {
            pageNum: pageNum,
            pageSize: pageSize,
            list: data.transactions,
            total: data.count
        }
      });
    }).catch((error:any) => {
      dispatch(hideLoading())
      dispatch({
        type: constants.OPERATION_FAIL,
        error: error
      });
    })
  }
}
