module.exports = {
  // nodeServer: 'https://node.cryptape.com',
  // queryServer: 'https://microscope.cryptape.com:8888',
  api: {
    serverList: [
      'https://microscope.cryptape.com:8888',
      'https://rebirth.cryptape.com'
    ],
    jsonRpc: '/',
    url: '/api/info/url',
    status: '/api/status',
    blockList: '/api/blocks',
    transactionList: '/api/transactions',
    ercTransactionList: '/api/erc20/transfers'
  },
  apiTimeout: 15000,
  apiTimeoutMsg: 'api timeout，try it later',
  apiErrorMsg: 'network timeout,try it later！'
}
