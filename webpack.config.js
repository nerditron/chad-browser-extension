const path = require('path');
const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  mode: 'production',
  entry: {
    main: './chad-wrapper.js',
    styles: ['tippy.js/dist/tippy.css', './index.css']
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'src/chad_content_script/dist'),
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules\/(?!(retext-anti-woke|unified|unist|vfile|mdast|nlcst|micromark|decode|character|bail|is-plain-obj|trough|zwitch|devlop|remark|rehype|hast|unist|estree|markdown|estree|estree-util|estree-walker|acorn|escape|property|space|comma|stringify|html|stringify|character|reference|stringify|entities|character|stringify|stringify|stringify|stringify|stringify|stringify|stringify|stringify))/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      },
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader'
        ]
      }
    ]
  },
  plugins: [
    // Extract CSS into separate files
    new MiniCssExtractPlugin({
      filename: 'styles.css'
    })
  ]
};
