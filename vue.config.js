'use strict'
const path = require('path')
const webpack = require('webpack')
const TransformPages = require('uni-read-pages')
const updateManifest = require('./build/utils/manifest-updater')
const { loadEnv } = require('./build/utils/load-env')
loadEnv(process.env.NODE_ENV)

// 替换 h5 devServer 代理地址
// #ifdef H5
updateManifest({
  'h5.devServer.proxy./dev-server.target': JSON.stringify(`${process.env.HTTP_BASE_URL }/${ process.env.HTTP_CONTEXT}`),
  // 'h5.devServer.open': true
})
// #endif

module.exports = {
  css: {
    loaderOptions: {
      scss: {
        prependData: '@import "~@/uni.scss";'
      },
    }
  },
  configureWebpack: {
    resolve: {
      alias: {
        '@': path.resolve(__dirname, 'src')
      }
    },
    plugins: [
      new webpack.DefinePlugin({
        ROUTES: webpack.DefinePlugin.runtimeValue(() => {
          const tfPages = new TransformPages({
            includes: ['path', 'name', 'meta']
          })
          return JSON.stringify(tfPages.routes)
        }, true)
      }),
    ]
  },
  chainWebpack: (config) => {
    config
      .plugin('define')
      .tap(args => {
        args[0]['process.env'].HTTP_BASE_URL = JSON.stringify(process.env.HTTP_BASE_URL)
        args[0]['process.env'].HTTP_CONTEXT = JSON.stringify(process.env.HTTP_CONTEXT)
        args[0]['process.env'].RESOURCE_URL = JSON.stringify(process.env.RESOURCE_URL)
        args[0]['process.env'].USE_MOCK = JSON.stringify(process.env.USE_MOCK)
        args[0]['process.env'].USE_ENCRYPT = JSON.stringify(process.env.USE_ENCRYPT)
        return args
      })
    // 发行或运行时启用了压缩时会生效
    config.optimization.minimizer('terser').tap((args) => {
      const compress = args[0].terserOptions.compress
      // 非 App 平台移除 console 代码(包含所有 console 方法，如 log,debug,info...)
      // compress.drop_console = true;
      compress.pure_funcs = [
        // '__f__', // App 平台 vue 移除日志代码
        'console.debug' // 可移除指定的 console 方法
      ]
      return args
    })
  }
}
