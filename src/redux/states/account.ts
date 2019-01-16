import { TransactionList } from './transaction'


export interface AccountState {
  trList: TransactionList | null;
}
