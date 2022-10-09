
const path = require('path')
const fs = require('fs-extra')
const { chalk, done, logWithSpinner, stopSpinner } = require('@vue/cli-shared-utils')
const { parseJson } = require('./lib/json')
const { copyDir } = require('./util')

function resolve(url) {
  return path.join(__dirname, url)
}

// 参数配置优先级更高
// console.log(process.argv)
// const [,, config = 'dev:mp-weixin', projectName] = process.argv
// const [mode, platform] = config.split(':')
// if (!['dev', 'build'].includes(mode)) {
//   console.log('编译模式目前只支持 dev(开发运行) 和 build(打包发行) 两种')
//   process.exit(-1)
// }
// if (!['mp-weixin', 'h5'].includes(platform)) {
//   console.log('编译平台目前只支持 h5 和 mp-weixin(微信小程序) 两种')
//   process.exit(-1)
// }

// const configJsonPath = resolve('../config/index.json')
// let configData = fs.readFileSync(configJsonPath, 'utf8')
// configData = parseJson(configData)
// configData.project = projectName || configData.project
// configData.mode = mode
// fs.writeJsonSync(configJsonPath, configData, { spaces: '\t' })

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
// projectCfg.easycom = {
//   "autoscan": true,
//     "custom": {
//       "^et-(.*)": "@/eteng-ui/$1/index.vue"
//     }
// }

// 拷贝 vant-weapp 文件 至 src/wxcomponents/vant
let vantPath = resolve('../src/wxcomponents/vant')
copyDir(resolve('../node_modules/@vant/weapp/dist'), vantPath)
// 全局引入 vant-ui 组件
const { excludes } = require('../config/vant')
const excludeUIList = [].concat(excludes.ui, excludes.common)
let vantComponentList = fs.readdirSync(vantPath)
vantComponentList = vantComponentList.filter(name => !name.startsWith('.'))
vantComponentList = vantComponentList.filter(name => !excludeUIList.includes(name))

const usingComponents = {}
for (const key of vantComponentList) {
  usingComponents[`van-${key}`] = `./wxcomponents/vant/${key}/index`
}

Object.assign(projectCfg.globalStyle, {
  usingComponents
})

fs.writeJsonSync(mpWeixinJsonPath, projectCfg, { spaces: '\t' })

// 运行时 manifest 配置
const projectManifestJsonPath = resolve(`../src/${project}/manifest.json`)
let projectManifestConfig = fs.readFileSync(projectManifestJsonPath, 'utf8')
projectManifestConfig = parseJson(projectManifestConfig)

// 合并小程序 mp-weixin 相关配置
projectManifestConfig['mp-weixin'].appid = process.env.WECHAT_APP_ID

// 重写 manifest.json 文件
fs.writeJsonSync(manifestJsonPath, projectManifestConfig, { spaces: '\t' })

// 初始化环境结束
stopSpinner(false)

console.log()
done(`Successfully initialized project: ${chalk.cyan(project + ', env: ' + env)}.`)
console.log()
