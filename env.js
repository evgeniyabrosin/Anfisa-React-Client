const fs = require('fs')
const path = require('path')
const envDev = require('dotenv').config({
  path: path.resolve(__dirname, '.env.development'),
}).parsed

const envConfigPath = path.resolve(__dirname, './public/env-config.js')

const getVariablesString = () => {
  let result = {}

  for (const key in envDev) {
    result[key] = process.env[key] || envDev[key]
  }

  return JSON.stringify(result)
}

const content = `window._env_ = ${getVariablesString()}`

fs.writeFileSync(envConfigPath, content)
