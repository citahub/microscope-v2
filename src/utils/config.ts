interface ServerNode {
  name: string
  url: string
}
export { ServerNode }
interface API {
  serverList: Array<ServerNode>
  jsonRpc: string
  url: string
  status: string
  blockList: string
  transactionList: string
  ercTransactionList: string
}

interface Config {
  api: API
  apiTimeout: number
  apiTimeoutMsg: string
  apiErrorMsg: string
}

const api: API = {
  serverList: [
    {
      name: 'TestNet1',
      url: 'https://node.cryptape.com'
    },
    {
      name: 'TestNet2',
      url: 'https://rebirth.cryptape.com'
    }
  ],
  jsonRpc: '/',
  url: '/api/info/url',
  status: '/api/status',
  blockList: '/api/blocks',
  transactionList: '/api/transactions',
  ercTransactionList: '/api/erc20/transfers'
}

const config: Config = {
  // nodeServer: 'https://node.cryptape.com',
  // queryServer: 'https://microscope.cryptape.com:8888',
  api: api,
  apiTimeout: 15000,
  apiTimeoutMsg: 'api timeout，try it later',
  apiErrorMsg: 'network error！'
}

export { api }
export default config
