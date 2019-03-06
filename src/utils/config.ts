interface ServerNode{
  name:string;
  url:string;
}
export {ServerNode}
interface API {
  serverList: Array<ServerNode>;
  jsonRpc:string;
  url:string;
  status:string;
  blockList:string;
  transactionList:string;
  ercTransactionList:string;
}

interface Config {
  api:API;
  apiTimeout:number;
  apiTimeoutMsg:string;
  apiErrorMsg:string;
}

const api:API = {
  serverList: [
    {
      name: "TestNet1",
      url: "https://rebirth.cryptape.com"
    },
    {
      name: "TestNet2",
      url: "https://microscope.citahub.com:8888"
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
  apiErrorMsg: 'network timeout,try it later！'
}

export { api };
export default  config
