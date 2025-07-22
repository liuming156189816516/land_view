/*为了webstorm识别vite中设置的别名*/
'use strict'
const path = require('path')

const { defineConfig } = require('@vue/cli-service')

module.exports = defineConfig(
  {
    context: path.resolve(__dirname, './'),
    transpileDependencies:true,
    lintOnSave: false,
    devServer:{
      proxy: {
        '/api':{
          target: 'https://www.bbzvip.com:8096',
          pathRewrite: {'^/api':''},  // 将请求路径中的 /api 替换成空字符串
          ws: true,   // 支持websocket， 默认为 true
          changeOrigin: true  // 用于控制请求头中的host值， 默认为 true
        }

      },
    resolve: {
      extensions: ['.js', '.vue', '.json'],
      alias: {
        '@': path.resolve('src'),
        '@assets': path.resolve(__dirname, 'src/assets'),
        '@pages': path.resolve(__dirname, 'src/pages'),
        '@comp': path.resolve(__dirname, 'src/components'),
        '@api': path.resolve(__dirname, 'src/api'),
        '@plug': path.resolve(__dirname, 'src/plugins'),
        '@utils': path.resolve(__dirname, 'src/utils')
      }
    },
    module: {
      rules: [
        {
          test: /\.jsx?$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env', '@babel/preset-react']
            }
          }
        },
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env']
            }
          }
        }

      ]
    }

    }
  }
)
