export interface TransactionItem {}
export interface TransactionReceiptItem {}
export interface TransactionList {
  pageNum: Number | 1
  pageSize: Number | 10
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
