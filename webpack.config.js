const path = require('path')
const webpack = require('webpack')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  // 打包模式： development：开发环境，production：生产环境
  mode: 'development',
  // 入口文件，如果有多个入口，则写成对象形式{index1: './src/index1.js', index2: './src/index2.js'}
  entry: './src/index.js',
  // 出口
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].[hash].bundle.js'
  },
  devServer: {
    // 该目录与输出目录对应
    contentBase: path.join(__dirname, 'dist'),
    compress: true,
    // 本地服务器端口
    port: 6752
  },
  module: {
    rules: [
      {
        test: /\.(png|jpg|gif)$/i,
        use: [
          {
            // 该 loader 用于打包时，将文件大小小于某个特定值的图片转换成 base64
            loader: 'url-loader',
            options: {
              // 图片文件临界值，小于等于改值时有效
              limit: 8192,
            },
          },
        ],
      },
      {
        test: /\.m?js$/,
        // 排除的文件夹
        exclude: /(node_modules|bower_components)/,
        use: {
          // 用于将 es6 转为 es5
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      },
      {
        test: /\.s[ac]ss$/i,
        use: [
          // Creates `style` nodes from JS strings
          MiniCssExtractPlugin.loader,
          // Translates CSS into CommonJS
          'css-loader',
          // Compiles Sass to CSS
          'sass-loader',
        ],
      },
    ],
  },
  plugins: [
    // 该插件能将 css 代码从 js 中分离出来，独立生成 css 文件
    new MiniCssExtractPlugin({
      filename: '[name].[hash].css',
      chunkFilename: '[id].[hash].css',
    }),
    new webpack.DefinePlugin({
      // 此处定义的变量可直接使用
      'SERVICE_URL': JSON.stringify('https://www.baidu.com')
    }),
    // 打包前清空输出目录
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      // 网页标题
      title: 'Hello Tit1e!',
      // 生成的文件名字
      filename: 'index.html',
      // 模版文件所在路径
      template: './src/public/index.html'
    })
  ],
}