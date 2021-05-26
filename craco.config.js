const { config } = require('dotenv-cra')

config()

module.exports = {
  devServer: {
    proxy: {
      [`/${process.env.REACT_APP_LOCAL_PROXY_KEY}`]: {
        target: process.env.REACT_APP_URL_BACKEND,
        auth: process.env.REACT_APP_PROXY_AUTH || null,
        changeOrigin: true,
        pathRewrite: { [`^/${process.env.REACT_APP_LOCAL_PROXY_KEY}`]: '' },
      },
      '/dsdoc': {
        target: process.env.REACT_APP_URL_BACKEND,
        auth: process.env.REACT_APP_PROXY_AUTH || null,
        changeOrigin: true,
      },
    },
  },
}
