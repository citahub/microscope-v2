import { combineReducers } from 'redux'
import app from './reducers/appReducer'
import block from './reducers/block'
import transaction from './reducers/transaction'
import network from './reducers/network'
import account from './reducers/account'

const reducers = combineReducers({
  app,
  network,
  block,
  transaction,
  account
})

export default reducers
