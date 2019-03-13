import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import configureStore from './redux/configureStore'
import createRoutes from './routes/index'

const store = configureStore()
var app = <Provider store={store}>{createRoutes()}</Provider>
setTimeout(() => {
  ReactDOM.render(app, document.getElementById('app') as HTMLElement)
}, 1000)
