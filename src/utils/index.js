export * from './constants'
export * from './token'

export const objectToString = Object.prototype.toString

export const toTypeString = val => objectToString.call(val)

export const toType = val => {
  return toTypeString(val).slice(8, -1)
}

export const isString = val => typeof val === 'string'
export const isSymbol = val => typeof val === 'symbol'
export const isObject = val => typeof val === 'object' && val !== null

export const isArray = Array.isArray
