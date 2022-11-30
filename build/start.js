const fs = require('fs')
const path = require('path')
const consola = require('consola')
const dotenv = require('dotenv')
const { exec } = require('child_process')
dotenv.config({ path: path.resolve(process.cwd(), '.env.local') })

console.log()

const wechatDevToolsPath = process.env.WECHAT_WEB_DEV_TOOLS
if (!wechatDevToolsPath || !fs.existsSync(path.resolve(wechatDevToolsPath))) {
  consola.warn('It seems the wechatwebdevtools path is not correct. Please check before restart again.\n')
  process.exit(-1)
}

const mode = process.env.NODE_ENV === 'production' ? 'build' : 'dev'
const res = exec(`${wechatDevToolsPath}/cli open --project ${path.resolve(`./dist/${mode}/mp-weixin`)}`)

res.stderr.on('data', function (data) {
  consola.log('\033[31m[微信小程序开发者工具]\033[0m', data)
})

res.stdout.on('data', function (data) {
  console.log('\033[31m[微信小程序开发者工具]\033[0m', data)
})

res.stdout.on('end', function () {
  consola.success('Successfully started.')
  console.log()
  process.exit(0)
})

res.on('exit', function (code) {
  if (code !== 0) {
    consola.error('child process exit with error code ', code)
  }
})
