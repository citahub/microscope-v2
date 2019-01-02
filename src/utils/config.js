module.exports = {
  nodeServer: 'https://node.cryptape.com',
  queryServer: 'https://microscope.cryptape.com:8888',
  api: {
    // appWeb3AllPrivders: [
    //
    // ],
    jsonRpc: '/',
    status: '/api/status',
    blockList: '/api/blocks',
    transactionList: '/api/transactions'
  },
  apiTimeout: 15000,
  apiTimeoutMsg: 'api timeout，try it later',
  apiErrorMsg: 'network timeout,try it later！'
}
