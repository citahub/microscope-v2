const jsonRpc = [
  {
    name: 'peerCount',
    inputSample: '{"jsonrpc":"2.0","method":"peerCount","params":[],"id":74}'
  },
  {
    name: 'blockNumber',
    inputSample: '{"jsonrpc":"2.0","method":"blockNumber","params":[],"id":83}'
  },
  {
    name: 'sendRawTransaction',
    inputSample:
      '{"jsonrpc":"2.0","method":"sendRawTransaction","params":["0x0a910212013218fface20420a0492a8302606060405234156100105760006000fd5b610015565b60e0806100236000396000f30060606040526000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff16806360fe47b114604b5780636d4ce63c14606c576045565b60006000fd5b341560565760006000fd5b606a60048080359060200190919050506093565b005b341560775760006000fd5b607d60a3565b6040518082815260200191505060405180910390f35b8060006000508190909055505b50565b6000600060005054905060b1565b905600a165627a7a72305820942223976c6dd48a3aa1d4749f45ad270915cfacd9c0bf3583c018d4c86f9da200291241edd3fb02bc1e844e1a6743e8986a61e1d8a584aac26db5fa1ce5b32700eba5d16ba4c754731f43692f3f5299e85176627e55b9f61f5fe3e43572ec8c535b0d9201"],"id":1}'
  },
  {
    name: 'getBlockByHash',
    inputSample:
      '{"jsonrpc":"2.0","method":"getBlockByHash","params":["0x296474ecb4c2c8c92b0ba7800a01530b70a6f2b6e76e5c2ed2f89356429ef329", true],"id":1}'
  },
  {
    name: 'getBlockByNumber',
    inputSample:
      '{"jsonrpc":"2.0","method":"getBlockByNumber","params":["0xF9", true],"id":1}'
  },
  {
    name: 'getTransactionReceipt',
    inputSample:
      '{"jsonrpc":"2.0","method":"getTransactionReceipt","params":["0x019abfa50cbb6df5b6dc41eabba47db4e7eb1787a96fd5836820d581287e0236"],"id":1}'
  },
  {
    name: 'getLogs',
    inputSample:
      '{"jsonrpc":"2.0","method":"getLogs","params":[{"topics":["0x8fb1356be6b2a4e49ee94447eb9dcb8783f51c41dcddfe7919f945017d163bf3"],"fromBlock": "0x0"}],"id":74}'
  },
  {
    name: 'call',
    inputSample:
      '{"jsonrpc":"2.0","method":"call","params":[{"from":"0xca35b7d915458ef540ade6068dfe2f44e8fa733c","to":"0xea4f6bc98b456ef085da5c424db710489848cab5","data":"0x6d4ce63c"}, "0x6"],"id":2}'
  },
  {
    name: 'getTransaction',
    inputSample:
      '{"jsonrpc":"2.0","method":"getTransaction","params":["0x019abfa50cbb6df5b6dc41eabba47db4e7eb1787a96fd5836820d581287e0236"],"id":1}'
  },
  {
    name: 'getTransactionCount',
    inputSample:
      '{"jsonrpc":"2.0","method":"getTransactionCount","params":["0x5b073e9233944b5e729e46d618f0d8edf3d9c34a","0x1f"],"id":1}'
  },
  {
    name: 'getCode',
    inputSample:
      '{"jsonrpc":"2.0","method":"getCode","params":["0xea4f6bc98b456ef085da5c424db710489848cab5", "0x1f"],"id":1}'
  },
  {
    name: 'getAbi',
    inputSample:
      '{"jsonrpc":"2.0","method":"getAbi","params":["0x73552bc4e960a1d53013b40074569ea05b950b4d", "latest"],"id":1}'
  },
  {
    name: 'getBalance',
    inputSample:
      '{"jsonrpc":"2.0","method":"getBalance","params":["0xea4f6bc98b456ef085da5c424db710489848cab5", "latest"],"id":1}'
  },
  {
    name: 'newFilter',
    inputSample:
      '{"jsonrpc":"2.0","method":"newFilter","params":[{"topics":["0x8fb1356be6b2a4e49ee94447eb9dcb8783f51c41dcddfe7919f945017d163bf3"]}],"id":1}'
  },
  {
    name: 'newBlockFilter',
    inputSample:
      '{"jsonrpc":"2.0","method":"newBlockFilter","params":[],"id":73}'
  },
  {
    name: 'uninstallFilter',
    inputSample:
      '{"jsonrpc":"2.0","method":"uninstallFilter","params":["0xb"],"id":73}'
  },
  {
    name: 'getFilterChanges',
    inputSample:
      '{"jsonrpc":"2.0","method":"getFilterChanges","params":["0x16"],"id":74}'
  },
  {
    name: 'getFilterLogs',
    inputSample:
      '{"jsonrpc":"2.0","method":"getFilterLogs","params":["0x16"],"id":74}'
  },
  {
    name: 'getTransactionProof',
    inputSample:
      '{"jsonrpc":"2.0","method":"getTransactionProof","params":["0x37f1261203d7b81a5a5cfc4a5c4abf15297555a47fd8686580d5a211876516c4"],"id":1}'
  },
  {
    name: 'getMetaData',
    inputSample:
      '{"jsonrpc":"2.0","id":1,"method":"getMetaData","params":["latest"]}'
  },
  {
    name: 'getBlockHeader',
    inputSample:
      '{"jsonrpc":"2.0","method":"getBlockHeader","params":["3"],"id":1}'
  },
  {
    name: 'getStateProof',
    inputSample:
      '{"jsonrpc":"2.0","method":"getStateProof","params":["0xad54ae137c6c39fa413fa1da7db6463e3ae45664", "0xa40893b0c723e74515c3164afb5b2a310dd5854fac8823bfbffa1d912e98423e", "16"],"id":1}'
  },
  {
    name: 'getStorageAt',
    inputSample:
      '{"jsonrpc":"2.0","method":"getStorageAt","params":["0xffffffffffffffffffffffffffffffffff020000", "0x0000000000000000000000000000000000000000000000000000000000000007", "16"],"id":1}'
  }
]
export default jsonRpc