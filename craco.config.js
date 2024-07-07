const webpack = require('webpack');
// const git = require('git-rev-sync');
const CracoAlias = require('craco-alias');
const CopyPlugin = require('copy-webpack-plugin');
const path = require('path');

console.log('Customizing Webpack');
module.exports = {
  plugins: [
    {
      plugin: CracoAlias,
      options: {
        source: 'tsconfig',
        baseUrl: '.',
        tsConfigPath: './tsconfig.extend.json',
      },
    },
  ],
  webpack: {
    configure: (config, { env, paths }) => {
      // Otros ajustes de configuración de webpack
      config.plugins.push(
        new webpack.DefinePlugin({
          VERSION: JSON.stringify('75bf4ee'),
        })
      );
      // alias React to the local installed dependency so we can yarn link other React-based
      // modules without problems
      // config.resolve.alias = config.resolve.alias || {};
      // config.resolve.alias.react = path.resolve(__dirname, 'node_modules/react');
      // config.resolve.alias['react-dom'] = path.resolve(__dirname, 'node_modules/react-dom');

      return config;
    },
  },
  babel: {
    plugins: [
      '@babel/plugin-proposal-logical-assignment-operators',
      '@babel/plugin-proposal-optional-chaining',
      '@babel/plugin-proposal-nullish-coalescing-operator',
    ],
  },
  devServer: (devServerConfig) => {
    devServerConfig.historyApiFallback = {
      disableDotRule: true,
    };
    return devServerConfig;
  },
};
