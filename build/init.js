
const path = require('path')
const fs = require('fs-extra')
const { chalk, done, logWithSpinner, stopSpinner } = require('@vue/cli-shared-utils')
const { parseJson } = require('./lib/json')
const { loadEnv } = require('./lib/load-env');

function resolve(url) {
  return path.join(__dirname, url)
}

// 参数配置优先级更高
// console.log(process.argv)
let [,, env = '--development'] = process.argv
env = env.slice(2)
loadEnv(env);

// 读取 .env 文件配置
require('./lib/load-env')

console.log()
logWithSpinner(`初始化工程 ${process.env.NODE_ENV} 环境配置...`)
console.log()

// 运行时 manifest 配置
const manifestJsonPath = resolve(`../src/manifest.json`)
let manifestData = fs.readFileSync(manifestJsonPath, 'utf8')
manifestData = parseJson(manifestData)
fs.removeSync(manifestJsonPath)

manifestData['mp-weixin'].appid = process.env.WECHAT_APP_ID

// 重写 manifest.json 文件
fs.writeJsonSync(manifestJsonPath, manifestData, { spaces: '\t' })

// 初始化环境结束
stopSpinner(false)

console.log()
done(`Successfully initialized project: ${chalk.cyan('env: ' + process.env.NODE_ENV)}.`)
console.log()
