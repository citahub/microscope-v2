import { createStore, applyMiddleware } from 'redux'
import thunkMiddleware from 'redux-thunk'
import { createLogger } from 'redux-logger'
import utilsMiddleware from './utilsMiddleware'

import reducers from './reducers'

const loggerMiddleware = createLogger()
var middlewares = [thunkMiddleware, utilsMiddleware]

if (process.env.NODE_ENV == 'development') {
  middlewares.push(loggerMiddleware)
}
let composeEnhancers = applyMiddleware(...middlewares)
export default function configureStore(initialState?: any) {
  return composeEnhancers(createStore)(reducers, initialState)
}
