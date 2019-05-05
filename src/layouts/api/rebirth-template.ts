const rebirthTemplate = [
  {
    name: '/api/info/url',
    inputSample: ''
  },
  {
    name: '/api/blocks',
    inputSample:
      '{"numberFrom":"10","numberTo":"20","transactionFrom":"1","transactionTo":"100","page":"1","perPage":"10","offset":"1","limit":"10"}'
  },
  {
    name: '/api/transactions',
    inputSample:
      '{"account":"0x46f8bf24c777fee056d447f3869ee5f71b37d0e3","from":"0x46f8bf24c777fee056d447f3869ee5f71b37d0e3","to":"0xffffffffffffffffffffffffffffffffff010001","valueFormat":"decimal","page":"1","perPage":"10","offset":"1","limit":"10"}'
  },
  {
    name: '/api/transactions/:hash',
    inputSample: ''
  },
  {
    name: '/api/statistics',
    inputSample: '{"type": "proposals"}'
  },
  {
    name: '/api/status',
    inputSample: ''
  },
  {
    name: '/api/sync_errors',
    inputSample: '{"page":1,"perPage":10,"offset":1,"limit":10}'
  },
  {
    name: '/api/erc20/transfers',
    inputSample:
      '{"address":"0x...","account":"from or to","from":"from address","to":"to address","page":1,"perPage":10,"offset":1,"limit":10}'
  },
  {
    name: '/api/event_logs/:address',
    inputSample: '{"page":1,"perPage":10}'
  }
]
export default rebirthTemplate