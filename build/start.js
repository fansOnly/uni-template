const fs = require('fs')
const path = require('path')
const dotenv = require('dotenv')
const { exec } = require('child_process')
const { done, warn } = require('@vue/cli-shared-utils')
const { resolvePath } = require('./util')
dotenv.config({ path: path.resolve(process.cwd(), '.env.local') })

console.log()
const configPath = resolvePath('../config')
const configData = require(configPath)

if (!process.env.WECHAT_WEB_DEV_TOOLS || !fs.existsSync(path.resolve(process.env.WECHAT_WEB_DEV_TOOLS))) {
  warn('It seems the wechatwebdevtools path is not correct. Please check before restart again.\n')
  process.exit(-1)
}

const res = exec(`${process.env.WECHAT_WEB_DEV_TOOLS}/cli open --project ${path.resolve(`./dist/${configData.mode}/mp-weixin`)}`)

res.stdout.on('data', function(data) {
  console.log('\033[31m[微信小程序开发者工具]\033[0m', data);
})

res.stdout.on('end', function() {
  done('Successfully started.')
  console.log()
  process.exit(0)
})

res.stderr.on('data', function(data) {
  console.log('\033[31m[微信小程序开发者工具]\033[0m', data);
})

res.on('exit', function(code) {
  if (code !== 0) {
    console.log('child process exit with error code ', code);
  }
})
