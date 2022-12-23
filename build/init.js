const fs = require('fs-extra')
const consola = require('consola')
const chalk = require('chalk')
const minimist = require('minimist')
const { getPackageManifest, writePackageManifest } = require('./utils/pkg')
const { loadEnv, resolvePath } = require('./utils/load-env')

const { env = 'development' } = minimist(process.argv.slice(2))
loadEnv(env)

console.log()
consola.info(`starting to initialize ${process.env.NODE_ENV} environment...`)
console.log()

// 更新 pages.json
const outputPagesPath = resolvePath('src/pages.json')
fs.removeSync(outputPagesPath)
const pagesJsonPath = resolvePath('src/config/pages.json')
const pagesJsonData = getPackageManifest(pagesJsonPath)

// 引入 pages 配置
let pages = require('../src/router/pages')
// 引入 sub packages 配置
let subPackages = require('../src/router/sub-packages')
pages = genPagesData(pages)
for (const subPackage of subPackages) {
  subPackage.pages = genPagesData(subPackage.pages)
}
pagesJsonData.pages = pages
pagesJsonData.subPackages = subPackages
writePackageManifest(outputPagesPath, pagesJsonData)

// 更新 manifest.json
const manifestPath = resolvePath('src/manifest.json')
const manifestData = getPackageManifest(manifestPath)
manifestData['mp-weixin'].appid = process.env.WECHAT_APP_ID
writePackageManifest(manifestPath, manifestData)

consola.success(`Successfully initialized project: ${chalk.cyan('env: ' + process.env.NODE_ENV)}.`)
console.log()

function genPagesData(data) {
  let result = data.slice()
  for (const item of result) {
    item.style = {
      navigationBarTitleText: item.meta?.title || ''
    }
    if (item.meta?.navigationStyle === 'custom') {
      item.style.navigationStyle = 'custom'
    }
    if (item?.usingComponents) {
      item.style.usingComponents = item.usingComponents
      delete item.usingComponents
    }
  }
  return result
}
