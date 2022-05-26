const path = require('path')
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin')

const cracoConfig = require('../craco.config')

const findRules = (rules, test) => {
  const ret = []

  for (const rule of rules) {
    if (Array.isArray(rule.oneOf)) {
      ret.push(...findRules(rule.oneOf, test))
    } else if (test(rule)) {
      ret.push(rule)
    }
  }

  return ret
}

module.exports = {
  stories: ['../src/**/*.stories.mdx', '../src/**/*.stories.@(js|jsx|ts|tsx)'],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-interactions',
    '@storybook/preset-create-react-app',
    'storybook-dark-mode',
  ],
  framework: '@storybook/react',
  core: {
    builder: '@storybook/builder-webpack5',
  },
  webpackFinal: async (config, { configType }) => {
    findRules(
      config.module.rules,
      rule => rule.test?.toString() === '/\\.module\\.css$/',
    ).forEach(rule => {
      rule.use = rule.use.map(loader => {
        let loaderName = loader
        let loaderOptions = {}

        if (typeof loader === 'object') {
          loaderName = loader.loader
          loaderOptions = loader.options
        }

        if (loaderName.includes('/postcss-loader/')) {
          return {
            loader: loaderName,
            options: cracoConfig.style.postcss.loaderOptions(loaderOptions),
          }
        } else if (loaderName.includes('/css-loader/')) {
          return {
            loader: loaderName,
            options: cracoConfig.style.css.loaderOptions(loaderOptions),
          }
        }

        return loader
      })
    })

    config.module.rules.push({
      test: /\.scss|.sass$/,
      use: ['style-loader', 'css-loader', 'sass-loader'],
      include: path.resolve(__dirname, '../'),
    })

    // console.log(config.module.rules[4])

    config.resolve.plugins = [
      new TsconfigPathsPlugin({
        configFile: path.resolve(__dirname, '../tsconfig.json'),
      }),
    ]

    return config
  },
}
