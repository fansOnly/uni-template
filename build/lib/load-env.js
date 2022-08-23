
const path = require('path')
const dotenv = require('dotenv')
const dotenvExpand = require('dotenv-expand')

function loadEnv(envPath) {
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

// 获取工程运行配置
const { project, env } = require('../../config')
const projectRoot = path.join(process.cwd(), `src/${project}`)

// 合并本地 env 文件配置
const envFile = `${projectRoot}/.env.${env}`
const localEnvFile = `${projectRoot}/.env.${env}.local`
loadEnv(localEnvFile)
loadEnv(envFile)
