import * as React from 'react'
import { Router, Route, IndexRoute, Redirect, hashHistory } from 'react-router'

import App from '../layouts/app'
import Home from '../layouts/home/index'
import BlockList from '../layouts/block/list'
import BlockDetail from '../layouts/block/detail'
import TransactionList from '../layouts/transaction/list'
import TransactionDetail from '../layouts/transaction/detail'
import AccountDetail from '../layouts/account/detail'

import APIRpc from '../layouts/api/rpc'
import APIRebirth from '../layouts/api/rebirth'
import NotFoundPage from '../layouts/error/index'
export default function() {
  return (
    <Router history={hashHistory}>
      <Route path="/" component={App}>
        <IndexRoute component={Home} />
        <Route path="/block/list" component={BlockList} />
        <Route path="/block/hash/:hash" component={BlockDetail} />
        <Route path="/block/id/:id" component={BlockDetail} />
        <Route path="/transaction/list" component={TransactionList} />
        <Route path="/transaction/hash/:hash" component={TransactionDetail} />
        <Route path="/account/:address" component={AccountDetail} />
        <Route path="/api/rpc" component={APIRpc} />
        <Route path="/api/rebirth" component={APIRebirth} />
        <Route path="/404" component={NotFoundPage} />
        <Redirect from="*" to="/404" />
      </Route>
    </Router>
  )
}
