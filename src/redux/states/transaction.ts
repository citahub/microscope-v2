export interface TransactionItem {
  blockHash: string
  blockNumber: string
  content: string
  from: string
  hash: string
  index: string
  unsignedTransaction: any
}
export interface TransactionReceiptItem {}
export interface TransactionList {
  pageNum: Number | 1
  pageSize: Number | 10
  addressFrom: string
  addressTo: string
  total: Number | 0
  list: Array<TransactionItem> | null
}

export interface TransactionState {
  topList: Array<TransactionItem> | null
  latest: TransactionItem | null
  item: TransactionItem | null
  itemReceipt: TransactionReceiptItem | null
  list: TransactionList | null
}
