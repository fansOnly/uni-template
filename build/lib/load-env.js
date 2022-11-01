
const dotenv = require('dotenv')
const dotenvExpand = require('dotenv-expand')

function loadEnvFile(envPath) {
  try {
    const env = dotenv.config({ path: envPath })
    dotenvExpand.expand(env)
  } catch (err) {
    // only ignore error if file is not found
    if (err.toString().indexOf('ENOENT') < 0) {
      console.error(err)
    }
  }
}

// 合并本地 env 文件配置 - 小程序默认只有一个 development 环境
exports.loadEnv = function(env = 'development') {
  const rootPath = process.cwd()
  const envFile = `${rootPath}/.env.${env}`
  const localEnvFile = `${rootPath}/.env.${env}.local`
  loadEnvFile(localEnvFile)
  loadEnvFile(envFile)
}
