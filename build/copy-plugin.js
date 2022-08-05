
const fs = require('fs')
const path = require('path')

const { project } = require('../config')
const projectRoot = path.join(__dirname, `../src/${project}`)

// 编译模式路径
const modePath = process.env.NODE_ENV === 'production' ? 'build' : 'dev'
const platformPath = process.env.UNI_PLATFORM

const copyPluginsList = []

// 拷贝本地静态资源文件
copyPluginsList.push({
  from: `${projectRoot}/assets/images`,
  to: path.join(__dirname, '../dist', modePath, platformPath, 'static/images')
})

// 自定义 tab-bar 组件需要讲模版文件拷贝到输出目录
const pkg = require('../src/pages.json')
const isCustomTabBar = (pkg.tabBar && pkg.tabBar.custom) || false

if (isCustomTabBar) {
  copyPluginsList.push({
    from: `${projectRoot}/custom-tab-bar`,
    to: path.join(__dirname, '../dist', modePath, platformPath, 'custom-tab-bar')
  })
}

// 引用小程序自定义组件
const wxcPath = `${projectRoot}/wxcomponents`

if (fs.existsSync(wxcPath)) {
  copyPluginsList.push({
    from: wxcPath,
    to: path.join(__dirname, '../dist', modePath, platformPath, 'wxcomponents')
  })
}

module.exports = copyPluginsList
