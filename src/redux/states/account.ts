import { TransactionList } from './transaction'

export interface AccountState {
  trList: TransactionList | null
  erc20List: TransactionList | null
  balance: string | null,
  code: string | null,
  abi: any | null
}
