const RATIO = 1e18
const DECIMAL = 9

export function valueFormat(value: number | string, symbol?: string):string{
  return +(+value / RATIO).toFixed(DECIMAL).toLocaleString() +
    (symbol ? ` ${symbol}` : '')
}


// import  * as web3Utils from 'web3-utils'
const web3Utils = require('web3-utils')

export const toHex = function(n:string|number) :string{
  return web3Utils.toHex(n);
}

export const format0x = function(str:string) :string{
  var result:string = str;
  if (!result) {
    return result
  }
  if (!/^0x/i.test(str)) {
    result = `0x${str}`
  }
  return result
}
export function isAddress(address:string):boolean{
  return web3Utils.isAddress(format0x(address))
}

export function isBlockHeight(str:string):boolean{
  var number = parseInt(str);
  return Number.isSafeInteger(number);
}

export function isHash(str:string):boolean{
  const value:string = format0x(str).toString()
  return value.length === 66 && web3Utils.isHexStrict(value)
}
