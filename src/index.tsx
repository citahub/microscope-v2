import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import configureStore from './redux/configureStore'
import createRoutes from './routes/index'

import { setSelectNetwork, defaultNetwork } from './utils/storage'

// for faucet
var search:string = window.location.search;
if(search){
  var chainMatchArray =  search.match(/chain=(.*)&?#?/);
  if(chainMatchArray){
    var chain = chainMatchArray[1]
    if(chain.indexOf(defaultNetwork.url)>-1){
      setSelectNetwork(defaultNetwork)
      window.location.href = window.location.protocol + "//" + window.location.host + window.location.pathname + window.location.hash
    }
  }
}

const store = configureStore()
var app = <Provider store={store}>{createRoutes()}</Provider>
setTimeout(() => {
  ReactDOM.render(app, document.getElementById('app') as HTMLElement)
}, 1000)
