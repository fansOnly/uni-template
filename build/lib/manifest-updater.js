// 读取 manifest.json ，修改后重新写入
const fs = require('fs')
const path = require('path')

const manifestPath = path.join(__dirname, '../../src/manifest.json')
let Manifest = fs.readFileSync(manifestPath, { encoding: 'utf-8' })
function replaceManifest(path, value) {
  const arr = path.split('.')
  const len = arr.length
  const lastItem = arr[len - 1]

  let i = 0
  let ManifestArr = Manifest.split(/\n/)

  for (let index = 0; index < ManifestArr.length; index++) {
    const item = ManifestArr[index]
    if (new RegExp(`"${arr[i]}"`).test(item)) ++i;
    if (i === len) {
      const hasComma = /,/.test(item)
      ManifestArr[index] = item.replace(new RegExp(`"${lastItem}"[\\s\\S]*:[\\s\\S]*`), `"${lastItem}": ${value}${hasComma ? ',' : ''}`)
      break;
    }
  }

  Manifest = ManifestArr.join('\n')
}

/**
 * 写入修改
 */
function updateManifest(data) {
  if (typeof data !== 'object') return
  for (let key in data) {
    replaceManifest(key, data[key])
  }
  fs.writeFileSync(manifestPath, Manifest, {
    "flag": "w"
  })
}

module.exports = updateManifest
