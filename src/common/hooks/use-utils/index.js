const objectToString = Object.prototype.toString

const toTypeString = val => objectToString.call(val)

const toType = val => {
  return toTypeString(val).slice(8, -1)
}

const isString = val => typeof val === 'string'
const isSymbol = val => typeof val === 'symbol'
const isObject = val => typeof val === 'object' && val !== null

const isArray = Array.isArray


export const useTypes = () => {
  return {
    toType,
    isString,
    isSymbol,
    isObject,
    isArray,
  }
}
