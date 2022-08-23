
const path = require('path')
const fs = require('fs-extra')
const { chalk, done, logWithSpinner, stopSpinner } = require('@vue/cli-shared-utils')
const { parseJson } = require('./lib/json')

function resolve(url) {
  return path.join(__dirname, url)
}

// console.log(process.argv)

// 获取工程运行配置
const { project, env } = require('../config')
// 读取 .env 文件配置
require('./lib/load-env')

console.log()
logWithSpinner(`初始化 ${project} 工程 ${env} 环境配置...`)
console.log()

// 删除原有的配置文件
const mpWeixinJsonPath = resolve('../src/pages.json')
const manifestJsonPath = resolve('../src/manifest.json')
fs.removeSync(mpWeixinJsonPath)
fs.removeSync(manifestJsonPath)

// 运行时 pages.json
const projectJsonPath = resolve(`../src/${project}/pages.json`)
let projectCfg = fs.readFileSync(projectJsonPath, 'utf8')
projectCfg = parseJson(projectCfg)

// 主包路由 - 拼接工程路径
if (projectCfg.pages.length) {
  projectCfg.pages.map(route => {
    route.path = project + '/' + route.path
    return route
  })
}

// 分包路由 - 拼接工程路径
if (projectCfg.subPackages && projectCfg.subPackages.length) {
  projectCfg.subPackages.map(sub => {
    sub.root = project + '/' + sub.root
    return sub
  })
}

// 分包预加载路由 - 拼接工程路径
if (projectCfg.preloadRule) {
  let tempPreloadRule = {}
  for (let key in projectCfg.preloadRule) {
    tempPreloadRule[`${project}/${key}`] = projectCfg.preloadRule[key]
  }
  projectCfg.preloadRule = tempPreloadRule
}

// 处理 tabBar 配置 - 拼接工程路径
if (projectCfg.tabBar && projectCfg.tabBar.list) {
  if (projectCfg.tabBar.list.length) {
    projectCfg.tabBar.list.map(item => {
      item.pagePath  = project + '/' + item.pagePath
      return item
    })
  }
}

// 写入 easy-comp 配置
projectCfg.easycom = {
  "autoscan": true,
    "custom": {
      "^et-(.*)": "@/eteng-ui/$1/index.vue"
    }
}

fs.writeJsonSync(mpWeixinJsonPath, projectCfg)

// 运行时 manifest 配置
const projectManifestJsonPath = resolve(`../src/${project}/manifest.json`)
let projectManifestConfig = fs.readFileSync(projectManifestJsonPath, 'utf8')
projectManifestConfig = parseJson(projectManifestConfig)

// 合并小程序 mp-weixin 相关配置
projectManifestConfig['mp-weixin'].appid = process.env.WECHAT_APP_ID

// 重写 manifest.json 文件
fs.writeJsonSync(manifestJsonPath, projectManifestConfig)

// 初始化环境结束
stopSpinner(false)

console.log()
done(`Successfully initialized project: ${chalk.cyan(project + ', env: ' + env)}.`)
console.log()
