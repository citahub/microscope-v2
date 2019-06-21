import * as React from 'react'
import { Router, Route, Redirect, Switch } from 'react-router'

import App from '../layouts/app'
import Layout from '../components/layout'
import Header from '../components/header'
import Footer from '../components/footer'

import Home from '../layouts/home/index'
import BlockList from '../layouts/block/list'
import BlockDetail from '../layouts/block/detail'
import TransactionList from '../layouts/transaction/list'
import TransactionDetail from '../layouts/transaction/detail'
import AccountDetail from '../layouts/account/detail'

import APIRpc from '../layouts/api/rpc'
import APIRebirth from '../layouts/api/rebirth'

import Statics from '../layouts/statics'
import SearchPage from '../layouts/search'
import NotFoundPage from '../layouts/error'
import hashHistory from './history'

export default function() {
  // need consider for faucet website redirection
  return (
    <App>
      <Router history={hashHistory}>
        <Route
          render={(props: any) => {
            return (
              <Layout>
                <Header location={props.location} />
                <Switch>
                  <Route exact path="/" component={Home} />
                  <Route exact path="/block/list" component={BlockList} />
                  <Route
                    exact
                    path="/block/hash/:hash"
                    component={BlockDetail}
                  />
                  <Route exact path="/block/id/:id" component={BlockDetail} />
                  <Route
                    exact
                    path="/transaction/list"
                    component={TransactionList}
                  />
                  <Route
                    exact
                    path="/transaction/hash/:hash"
                    component={TransactionDetail}
                  />
                  <Route
                    exact
                    path="/account/:address"
                    component={AccountDetail}
                  />
                  <Route exact path="/api/rpc" component={APIRpc} />
                  <Route exact path="/api/rebirth" component={APIRebirth} />
                  <Route exact path="/statics" component={Statics} />
                  <Route exact path="/search" component={SearchPage} />
                  <Route exact path="/404" component={NotFoundPage} />
                  <Redirect
                    from="/transaction/:hash"
                    to="/transaction/hash/:hash"
                  />
                  <Redirect from="*" to="/404" />
                </Switch>
                <Footer />
              </Layout>
            )
          }}
        />
      </Router>
    </App>
  )
}
