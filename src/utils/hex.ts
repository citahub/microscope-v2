const RATIO = 1e18
const DECIMAL = 9

export function valueFormat(value: number | string, symbol?: string){
  return +(+value / RATIO).toFixed(DECIMAL).toLocaleString() +
    (symbol ? ` ${symbol}` : '')
}
