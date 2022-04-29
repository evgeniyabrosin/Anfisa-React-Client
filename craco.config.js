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
    postcss: {
      // craco v6 doesn't support react-scripts@5.x.x
      // therefore we need to update loader options manually
      loaderOptions: postcssLoaderOptions => {
        const {
          postcssOptions,
          postcssOptions: { plugins },
        } = postcssLoaderOptions

        return {
          ...postcssLoaderOptions,
          postcssOptions: {
            ...postcssOptions,
            plugins: ['tailwindcss/nesting', ...plugins],
          },
        }
      },
    },
    css: {
      loaderOptions: options => {
        if ('modules' in options) {
          return {
            ...options,
            modules: {
              ...options.modules,
              exportLocalsConvention: className => [
                className,
                className.replace(/-./g, x => x[1].toUpperCase()),
              ],
            },
          }
        }

        return options
      },
    },
  },
  webpack: {
    plugins: {
      add: [ProgressBarPlugin()],
    },
  },
}
