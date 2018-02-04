/**
 * Created by cendawei on 2017/4/18.
 */
var merge = require('webpack-merge');
var webpack = require('webpack');
var path = require('path');

var baseConfig = require('./webpack.base.config')('production');
baseConfig.plugins.unshift(new webpack.DefinePlugin({
    'process.env': {
        NODE_ENV: '"production"'
    }
}))
var prodConfig = merge({}, baseConfig, {
    output: {
        path: path.resolve(__dirname, '../../statics/build/js/')
    }
});
prodConfig.plugins.push(
    new webpack.optimize.UglifyJsPlugin({
        compress: {
            warnings: false
        }
    })
);

module.exports = prodConfig;