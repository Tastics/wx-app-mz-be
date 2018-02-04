/**
 * Created by cendawei on 2017/4/18.
 */
var merge = require('webpack-merge');
var webpack = require('webpack')

var baseConfig = require('./webpack.base.config')('development');
baseConfig.plugins.unshift(new webpack.DefinePlugin({
    'process.env': {
        NODE_ENV: '"development"'
    }
}))
var devConfig = merge({}, baseConfig, {
    output: {
        filename: '[name].js',
        chunkFilename: '[id].chunk.js'
    },
    devtool: 'source-map'
})

module.exports = devConfig;