'use strict';
const webpack = require('webpack');
const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const TransformPages = require('uni-read-pages');
const copyPluginsList = require('./build/lib/copy-plugin');
const updateManifest = require('./build/lib/manifest-updater');
require('./build/lib/load-env');

// 获取工程运行配置
const { project, useMock, useEncrypt } = require('./config');
const projectRoot = path.join(__dirname, `./src/${project}`);

// 替换 h5 devServer 代理地址
// #ifdef H5
updateManifest({
  'h5.devServer.proxy./dev-server.target': JSON.stringify(process.env.HTTP_BASE_URL + '/' + process.env.HTTP_CONTEXT),
  // 'h5.devServer.open': true
});
// #endif

module.exports = {
  css: {
    loaderOptions: {
      scss: {
        prependData: `@import "~@/uni.scss";@import "~@/${project}/theme.scss";`
      },
    }
  },
  configureWebpack: {
    resolve: {
      alias: {
        '@p': projectRoot,
        '@vant-ui': path.join(__dirname, './src/wxcomponents/vant')
      }
    },
    plugins: [
      new CopyWebpackPlugin(copyPluginsList),
      new webpack.DefinePlugin({
        ROUTES: webpack.DefinePlugin.runtimeValue(() => {
          const tfPages = new TransformPages({
            includes: ['path', 'name', 'meta']
          });
          return JSON.stringify(tfPages.routes);
        }, true)
      })
    ]
  },
  chainWebpack: (config) => {
    config
      .plugin('define')
      .tap(args => {
        args[0]['process.env'].PROJECT_NAME = JSON.stringify(project);
        args[0]['process.env'].HTTP_BASE_URL = JSON.stringify(process.env.HTTP_BASE_URL);
        args[0]['process.env'].HTTP_CONTEXT = JSON.stringify(process.env.HTTP_CONTEXT);
        args[0]['process.env'].RESOURCE_URL = JSON.stringify(process.env.RESOURCE_URL);
        args[0]['process.env'].USE_MOCK = JSON.stringify(useMock);
        args[0]['process.env'].USE_ENCRYPT = JSON.stringify(useEncrypt);
        return args;
      });
    // 发行或运行时启用了压缩时会生效
    config.optimization.minimizer('terser').tap((args) => {
      const compress = args[0].terserOptions.compress;
      // 非 App 平台移除 console 代码(包含所有 console 方法，如 log,debug,info...)
      // compress.drop_console = true;
      compress.pure_funcs = [
        // '__f__', // App 平台 vue 移除日志代码
        'console.debug' // 可移除指定的 console 方法
      ];
      return args;
    });
  }
};
