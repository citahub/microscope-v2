import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import configureStore from './redux/configureStore'
import createRoutes from './routes/index'
import { setSelectNetwork, defaultNetwork } from './utils/storage'
import * as serviceWorker from './serviceWorker'

// for faucet
var search: string = window.location.search
if (search) {
  var chainMatchArray = search.match(/chain=(.*)&?#?/)
  if (chainMatchArray) {
    var chain = chainMatchArray[1]
    if (chain.indexOf(defaultNetwork.url) > -1) {
      setSelectNetwork(defaultNetwork)
      var pathname = window.location.pathname
      var hash = window.location.hash
      setTimeout(()=>{
        window.location.href =
        window.location.protocol +
        '//' +
        window.location.host +
        pathname +
        hash
      },4000)
    }
  }
}

const store = configureStore()
var app = <Provider store={store}>{createRoutes()}</Provider>
setTimeout(() => {
  ReactDOM.render(app, document.getElementById('app') as HTMLElement)
}, 1000)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
