import * as constants from '../actionTypes'
import { BlockItem, BlockList } from '../states/block'
import { showLoading, hideLoading } from './appAction'

import * as dataAPI from '../../utils/dataAPI'

export type BlockAction = {
  type: string
  data: BlockItem | BlockList | Array<BlockItem>
}

export function topBlocks() {
  return (dispatch: any) => {
    // dispatch(showLoading())
    return dataAPI.getBlockNumber().then((blockId: any) => {
      return dataAPI
        .topBlocks(blockId, 10)
        .then((data: Array<BlockItem>) => {
          // dispatch(hideLoading())
          dispatch({
            type: constants.GET_TOP_BLOCKS,
            data: data
          })
          // if(data && data.length>0){
          //   dispatch({
          //     type: constants.GET_LATEST_BLOCK,
          //     data: data[0]
          //   });
          // }
        })
        .catch((error: any) => {
          // dispatch(hideLoading())
          dispatch({
            type: constants.OPERATION_FAIL,
            error: error
          })
        })
    })
  }
}

export function getBlock(key: string) {
  return (dispatch: any) => {
    dispatch(showLoading())
    return dataAPI
      .getBlock(key)
      .then((data: BlockItem) => {
        dispatch(hideLoading())
        dispatch({
          type: constants.GET_BLOCK_ITEM,
          data: data
        })
        return data
      })
      .catch((error: any) => {
        dispatch(hideLoading())
        dispatch({
          type: constants.OPERATION_FAIL,
          error: error
        })
        return null
      })
  }
}

export function getBlockList(
  pageNum: number,
  pageSize: number,
  blockFrom: string,
  blockTo: string,
  transactionCountMin: string,
  transactionCountMax: string
) {
  return (dispatch: any) => {
    dispatch(showLoading())
    return dataAPI
      .getBlockList(
        pageNum,
        pageSize,
        blockFrom,
        blockTo,
        transactionCountMin,
        transactionCountMax
      )
      .then((data: any) => {
        dispatch(hideLoading())
        dispatch({
          type: constants.GET_BLOCK_LIST,
          data: {
            pageNum,
            pageSize,
            blockFrom,
            blockTo,
            transactionCountMin,
            transactionCountMax,
            list: data.blocks,
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
export function getLatestBlock() {
  return (dispatch: any) => {
    return dataAPI
      .getBlockNumber()
      .then((blockId: string) => {
        return blockId
      })
      .catch((error: any) => {
        dispatch({
          type: constants.OPERATION_FAIL,
          error: error
        })
        return null
      })
  }
}
export function updateNextBlock(blockId: any) {
  return (dispatch: any) => {
    // dispatch(showLoading())
    var update = (blockId: any) =>
      dataAPI
        .getBlock(blockId)
        .then((data: any) => {
          // dispatch(hideLoading())
          if (data) {
            dispatch({
              type: constants.APPEND_LATEST_BLOCK,
              data: data
            })
            var transactions = data.body.transactions
            var timestamp = data.header.timestamp
            transactions.forEach((t: string) => {
              dataAPI.getTransaction(t).then((d: any) => {
                d.timestamp = timestamp
                dataAPI
                  .getTransactionReceipt(t)
                  .then((sub: any) => {
                    d.gasUsed = sub.quotaUsed
                    dispatch({
                      type: constants.APPEND_LATEST_TRANSACTION,
                      data: d
                    })
                  })
                  .catch(() => {
                    dispatch({
                      type: constants.APPEND_LATEST_TRANSACTION,
                      data: d
                    })
                  })
              })
            })
          }
        })
        .catch((error: any) => {
          // dispatch(hideLoading())
          dispatch({
            type: constants.OPERATION_FAIL,
            error: error
          })
        })
    if (!blockId) {
      return dataAPI.getBlockNumber().then((d: any) => {
        return update(d)
      })
    } else {
      return update(blockId)
    }
  }
}
