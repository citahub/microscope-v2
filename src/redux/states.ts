import { AppState } from './states/appState'
import { NetworkState } from './states/network'
import { BlockState } from './states/block'
import { TransactionState } from './states/transaction'
import { AccountState } from './states/account'
import { StaticsState } from './states/statics'

export interface IRootState {
  app: AppState
  network: NetworkState
  statics: StaticsState
  block: BlockState
  transaction: TransactionState
  account: AccountState
}
