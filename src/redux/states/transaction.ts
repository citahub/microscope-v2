export interface TransactionItem {
  blockHash: string
  blockNumber: String
  content: String
  from: String
  hash: String
  index: String
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
