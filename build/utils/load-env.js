const fs = require('fs')
const path = require('path')
const dotenv = require('dotenv')
const dotenvExpand = require('dotenv-expand')

const resolvePath = (file) => path.resolve(__dirname, '../../', file)

function loadEnvFile(envPath) {
  if (fs.existsSync(envPath)) {
    const env = dotenv.config({ path: envPath })
    dotenvExpand.expand(env)
  } else {
    // consola.error(`${envPath} not found.`)
  }
}

const loadEnv = function (env = 'development') {
  loadEnvFile(resolvePath(`.env.${env}`))
  loadEnvFile(resolvePath(`.env.${env}.local`))
}

module.exports = {
  resolvePath,
  loadEnv
}
