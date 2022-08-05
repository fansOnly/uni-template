const fs = require('fs')
const path = require('path')
const stripJsonComments = require('strip-json-comments')

function parseJson (content) {
  if (typeof content === 'string') {
    content = JSON.parse(stripJsonComments(content))
  }

  content = JSON.stringify(content)
    .replace(/\u2028/g, '\\u2028')
    .replace(/\u2029/g, '\\u2029')

  return JSON.parse(content)
}

function getJson (jsonFileName) {
  const jsonFilePath = path.resolve(__dirname, jsonFileName)
  if (!fs.existsSync(jsonFilePath)) {
    throw new Error(jsonFilePath + ' doesNotExist')
  }
  try {
    return parseJson(fs.readFileSync(jsonFilePath, 'utf8'), preprocess)
  } catch (e) {
    throw new Error(jsonFileName + 'parseJsonFailed\n' + e.message)
  }
}

module.exports = {
  getJson,
  parseJson
}
