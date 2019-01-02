import * as React from "react"
import { Router, Route, IndexRoute, Redirect, hashHistory } from 'react-router'


import App from '../layouts/app'
import Home from '../layouts/home/index'
import BlockList from '../layouts/block/list'
import TransactionList from '../layouts/transition/list'

import NotFoundPage from '../layouts/error/index'
export default function() {
  return (
    <Router history={hashHistory}>
      <Route path='/' component={App}>
        <IndexRoute component={Home} />
        <Route path='/block/list' component={BlockList} />
        <Route path='/transition/list' component={TransactionList} />
        <Route path='/404' component={NotFoundPage} />
        <Redirect from="*" to="/404" />
      </Route>
    </Router>
  )
}
