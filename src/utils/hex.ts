const RATIO = 1e18
const DECIMAL = 18

export function valueFormat(value: number | string, symbol?: string): string {
  return (
    +(+value / RATIO).toFixed(DECIMAL).toLocaleString() +
    (symbol ? ` ${symbol}` : '')
  )
}

// import  * as web3Utils from 'web3-utils'
const web3Utils = require('web3-utils')

export const toHex = function(n: string | number): string {
  return web3Utils.toHex(n)
}

export const format0x = function(str: string): string {
  var result: string = str
  if (!result) {
    return result
  }
  if (!/^0x/i.test(str)) {
    result = `0x${str}`
  }
  return result
}
export function isAddress(address: string): boolean {
  return web3Utils.isAddress(format0x(address))
}

export function isBlockHeight(str: string): boolean {
  var number = parseInt(str)
  return Number.isSafeInteger(number)
}

export function isHash(str: string): boolean {
  const value: string = format0x(str).toString()
  return value.length === 66 && web3Utils.isHexStrict(value)
}

export function hex2Utf8(hex: string): string {
  try {
    let result = web3Utils.hexToString(hex)
    return result
  } catch (e) {
    console.log(e)
    return ''
  }
}
import { getAbi } from './dataAPI'
import { AbiCoder } from 'web3-eth-abi'


const abiCoder = new AbiCoder()

export function getContractData(
  contractAddress: string,
  data: any,
  cb: Function
) {
  getAbi(contractAddress)
    .then((abis: any) => {
      const fnHash = data.slice(0, 10)
      abis.forEach((_abi: any) => {
        if (_abi.signature === fnHash) {
          const parameters: any = {}
          try {
            const p = abiCoder.decodeParameters(
              _abi.inputs,
              '0x' + data.slice(10)
            )
            Object.keys(p).forEach(key => {
              parameters[key] = p[key]
            })
            Object.defineProperty(parameters, '__length__', {
              enumerable: false
            })
            cb(null, JSON.stringify(parameters, null, 2))
          } catch (e) {
            cb(e)
          }
        }
      })
    })
    .catch((e: any) => {
      cb(e)
    })
}
