import { AppState } from './states/appState'
import { NetworkState } from './states/network'
import { BlockState } from './states/block'
import { TransactionState } from './states/transaction'

export interface IRootState {
   app: AppState;
   network: NetworkState;
   block: BlockState;
   transaction: TransactionState;
}
