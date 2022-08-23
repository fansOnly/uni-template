import Mock from '@/plugins/mock'

// 公共 API 拦截
const commonMockFiles = require.context('./common', true, /\.js$/)
const projectMockFiles = require.context('@p/mocks', true, /\.js$/)

const modules = {}
commonMockFiles.keys().forEach(key => {
  const api = key.replace(/^\.\//, '').replace(/\.js$/, '.do')
  modules[api] = commonMockFiles(key).default
})
projectMockFiles.keys().forEach(key => {
  const api = key.replace(/^\.\//, '').replace(/\.js$/, '.do')
  modules[api] = projectMockFiles(key).default
})

Mock.setup({
  timeout: '600-1000'
})

Mock.mock(/\/*\.do/, 'post', function (config) {
  // console.log('[debug] mock request config >>> ', config)
  const reg = new RegExp('^' + process.env.HTTP_BASE_URL + '/' + process.env.HTTP_CONTEXT + '/')
  const api = config.url.replace(reg, '')
  return modules[api] ?? {
    STATUS: 'mock data undefined',
    MSG: 'mock 数据不存在',
  }
})
