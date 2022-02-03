const { config } = require('dotenv-cra')
const CracoAlias = require('craco-alias')
const ProgressBarPlugin = require('progress-bar-webpack-plugin')

config()

module.exports = {
  devServer: {
    proxy: {
      '/app': {
        target: process.env.REACT_APP_URL_BACKEND,
        auth: process.env.REACT_APP_PROXY_AUTH || null,
        changeOrigin: true,
        pathRewrite: { '/app': '' },
      },
      '/igv-resource': {
        target: process.env.REACT_APP_IGV_SERVICE_URL,
        changeOrigin: true,
        pathRewrite: { '/igv-resource': '' },
      },
    },
  },
  plugins: [
    {
      plugin: CracoAlias,
      options: {
        source: 'tsconfig',
        baseUrl: './src',
        tsConfigPath: './tsconfig.extend.json',
      },
    },
  ],
  style: {
    postcssOptions: {
      plugins: [require('tailwindcss'), require('autoprefixer')],
    },
  },
  webpack: {
    plugins: {
      add: [ProgressBarPlugin()],
    },
  },
}
