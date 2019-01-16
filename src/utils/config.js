module.exports = {
  // nodeServer: 'https://node.cryptape.com',
  // queryServer: 'https://microscope.cryptape.com:8888',
  api: {
    serverList: [
      'https://microscope.cryptape.com:8888',
      'https://rebirth.cryptape.com'
    ],
    jsonRpc: '/',
    status: '/api/info/url',
    blockList: '/api/blocks',
    blockItem: 'api/block/',
    transactionList: '/api/transactions',
    transactionItem: '/api/transactions/'
  },
  apiTimeout: 15000,
  apiTimeoutMsg: 'api timeout，try it later',
  apiErrorMsg: 'network timeout,try it later！'
}
