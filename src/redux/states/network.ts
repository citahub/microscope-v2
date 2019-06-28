export interface MetaData {}

export interface RPCData {}

export interface NetworkState {
  metaData: MetaData | null
  quotaPrice: number | null // by system contract
  rpcData: {
    input: RPCData | null
    output: RPCData | null
  }
  rebirthData: {
    input: any
    output: any
  }
}
