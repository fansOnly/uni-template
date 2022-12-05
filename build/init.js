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
const pagesPath = resolvePath('src/pages.json')
const pagesData = getPackageManifest(pagesPath)
for (const item of pagesData.pages) {
  if (item.meta.navigationStyle === 'custom') {
    item.style.navigationStyle = 'custom'
  }
  item.style.navigationBarTitleText = item.meta?.title
}
writePackageManifest(pagesPath, pagesData)

// 更新 manifest.json
const manifestPath = resolvePath('src/manifest.json')
const manifestData = getPackageManifest(manifestPath)
manifestData['mp-weixin'].appid = process.env.WECHAT_APP_ID
writePackageManifest(manifestPath, manifestData)

consola.success(`Successfully initialized project: ${chalk.cyan('env: ' + process.env.NODE_ENV)}.`)
console.log()
