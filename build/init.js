
const { chalk, done, logWithSpinner, stopSpinner } = require('@vue/cli-shared-utils')
const { parseJson } = require('./lib/json')
const { readFileSync, writeFileSync, deleteFileSync, resolvePath, readdirSync } = require('./util')

// console.log(process.argv)

// 获取工程运行配置
const { project, env } = require('../config')
// 读取 .env 文件配置
require('./load-env')

console.log()
logWithSpinner(`初始化 ${project} 工程 ${env} 环境配置...`)
console.log()

// 删除原有的配置文件
const mpWeixinJsonPath = resolvePath('../src/pages.json')
const manifestJsonPath = resolvePath('../src/manifest.json')
deleteFileSync(mpWeixinJsonPath)
deleteFileSync(manifestJsonPath)

// 运行时 pages.json
const projectJsonPath = resolvePath(`../src/${project}/pages.json`)
let projectCfg = readFileSync(projectJsonPath)
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

// 全局引入 vant-ui 组件
const { excludes } = require('../config/vant')
const excludeUIList = [].concat(excludes.ui, excludes.common)
let vantUIList = readdirSync(resolvePath('../src/wxcomponents/vant-ui/dist'))
vantUIList = vantUIList.filter(name => !name.startsWith('.'))
vantUIList = vantUIList.filter(name => !excludeUIList.includes(name))

const usingComponents = {}
for (const key of vantUIList) {
  usingComponents[`van-${key}`] = `./wxcomponents/vant-ui/dist/${key}/index`
}

Object.assign(projectCfg.globalStyle, {
  usingComponents
})

writeFileSync(mpWeixinJsonPath, JSON.stringify(projectCfg, null, 2), 'utf-8')

// 运行时 manifest 配置
const projectManifestJsonPath = resolvePath(`../src/${project}/manifest.json`)
let projectManifestConfig = readFileSync(projectManifestJsonPath)
projectManifestConfig = parseJson(projectManifestConfig)

// 合并小程序 mp-weixin 相关配置
projectManifestConfig['mp-weixin'].appid = process.env.WECHAT_APP_ID

// 重写 manifest.json 文件
writeFileSync(manifestJsonPath, JSON.stringify(projectManifestConfig, null, 2), 'utf-8')

// 初始化环境结束
stopSpinner(false)

console.log()
done(`Successfully initialized project: ${chalk.cyan(project + '-' + env)}.`)
console.log()
