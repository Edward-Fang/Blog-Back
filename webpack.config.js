/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path')
const webpack = require('webpack')
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin')

console.log('start build')
module.exports = {
  entry: './src/main',
  target: 'node',
  externals: {},
  module: {
    rules: [
      {
        test: /\.ts?$/,
        use: {
          loader: 'ts-loader',
          options: { transpileOnly: true }
        },
        exclude: /node_modules/
      }
    ]
  },
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist')
  },
  resolve: {
    extensions: ['.js', '.ts', '.json']
  },
  plugins: [
    new webpack.IgnorePlugin({
      checkResource(resource) {
        const lazyImports = [
          '@apollo/gateway',
          'apollo-server-fastify',
          '@apollo/subgraph',
          '@apollo/subgraph/dist/directives',
          '@nestjs/microservices',
          '@nestjs/microservices/microservices-module',
          '@nestjs/websockets/socket-module',
          'class-transformer/storage',
          'cache-manager',
          'class-validator',
          'class-transformer',
          'ts-morph'
        ]
        if (!lazyImports.includes(resource)) {
          return false
        }
        try {
          require.resolve(resource, {
            paths: [process.cwd()]
          })
        } catch (err) {
          return true
        }
        return false
      }
    }),
    new ForkTsCheckerWebpackPlugin()
  ]
}
