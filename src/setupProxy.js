/* eslint-disable unicorn/filename-case */
const { createProxyMiddleware } = require('http-proxy-middleware')

const filter = function (pathname) {
  if (
    pathname === '/' ||
    pathname === '/manifest.json' ||
    pathname.match('hot-update.js') ||
    pathname.match('^/logo') ||
    pathname.match('^/static')
  ) {
    return false
  }

  return true
}

module.exports = function (app) {
  app.use(
    createProxyMiddleware(filter, {
      target: process.env.REACT_APP_URL_BACKEND,
      auth: process.env.REACT_APP_PROXY_AUTH || null,
      changeOrigin: true,
    }),
  )
}
