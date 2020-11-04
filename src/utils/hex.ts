import citaSDK from './sdk'

const web3Utils = require('web3-utils')
const BN = web3Utils.BN

const weiToValue = 1000000000000000000

export function toValue(w: string, symbol: string) {
  return new BN(web3Utils.hexToNumberString(w)) / weiToValue + ' ' + symbol
}

export function valueFormat(
  value: string,
  symbol: string | null,
  quotaPrice: number | null
): string {
  if (!value) return ''
  if (!symbol || !quotaPrice) return value + ' quota'
  var v = new BN(web3Utils.hexToNumberString(value))
  if (v.isZero()) return '0 ' + symbol
  var qp = new BN(quotaPrice)
  if (!qp.isZero() && v.div(qp).gt(new BN(1))) {
    return v.div(qp).toString(10) + ' ' + symbol
  } else {
    return +v.toString(10) + ' quota'
  }
}

export const scientificNotationToString = function(param: string | number) {
  let strParam: string = param + ''
  let flag = /e/.test(strParam)
  if (!flag) return param
  let sysbol = true
  if (/e-/.test(strParam)) {
    sysbol = false
  }
  var matchIndex = strParam.match(/\d+$/) || []
  let index: number = Number(matchIndex[0])

  var matchBasis = strParam.match(/^[\d\.]+/) || []

  let basis = matchBasis[0].replace(/\./, '')

  if (sysbol) {
    return basis.padEnd(index + 1, '0')
  } else {
    return basis.padStart(index + basis.length, '0').replace(/^0/, '0.')
  }
}
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
    console.error(e)
    return e.message
  }
}
import { getAbi } from './dataAPI'
import { AbiCoder } from 'web3-eth-abi'

export function getContractData(
  contractAddress: string,
  data: any,
  cb: Function
) {
  getAbi(contractAddress)
    .then((abis: any) => {
      new citaSDK.base.Contract(abis)
      const fnHash = data.slice(0, 10)
      abis.forEach((_abi: any) => {
        if (_abi.signature === fnHash) {
          const parameters: any = {}
          try {
            const p = new AbiCoder().decodeParameters(
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
