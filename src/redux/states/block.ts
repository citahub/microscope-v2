export interface BlockItem {}

export interface BlockList {
  pageNum: Number | 1
  pageSize: Number | 10
  blockFrom: string
  blockTo: string
  total: Number | 0
  list: Array<BlockItem> | null
}

export interface BlockState {
  topList: Array<BlockItem> | null
  latest: BlockItem | null
  item: BlockItem | null
  list: BlockList | null
}
