import { AppState } from './states/appState'
import { NetworkState } from './states/network'
import { BlockState } from './states/block'
import { TransactionState } from './states/transaction'
import { AccountState } from './states/account'

export interface IRootState {
  app: AppState
  network: NetworkState
  block: BlockState
  transaction: TransactionState
  account: AccountState
}
