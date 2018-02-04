/**
 * Created by cendawei on 2017/12/1.
 */
var fs = require('fs');
var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var routeConfig = require('./route.path.config')

var dirs = fs.readdirSync(path.resolve(__dirname, '../js/views/'));
var entries = {};
dirs.forEach(function (dir) {
    entries[dir] = './js/views/' + dir + '/index.js';
})

function resolve (dir) {
    return path.resolve(__dirname, '../../', dir)
}

var baseConfig = {
    entry: entries,
    output: {
        path: path.resolve(__dirname, '../build/js/'),
        filename: '[name].[chunkhash:8].js',
        publicPath: routeConfig['apiPrefix'] + '/webroot/build/js/',
        chunkFilename: '[id].chunk.[chunkhash:8].js'
    },
    module: {
        loaders: [
            {
                test: /\.vue$/,
                loader: 'vue-loader'
            },
            {
                test: /\.jsx?$/,
                exclude: /(node_modules|libs)/,
                loader: 'babel-loader'
            },
            {
                test: /\.css$/,
                loader: 'style-loader!css-loader'
            },
            {
                test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
                loader: 'url-loader'
            }
        ]
    },
    externals: {
        'jquery': 'jQuery',
        'zepto': 'Zepto'
    },
    resolve: {
        extensions: ['.js', '.jsx', '.vue'],
        'alias': {
            'api': path.resolve(__dirname, '../js/core/api.js'),
            'services': path.resolve(__dirname, '../js/services/index.js'),
            'ui': path.resolve(__dirname, '../js/core/ui.js'),
            'utils': path.resolve(__dirname, '../js/core/utils.js'),
            'vue$': 'vue/dist/vue.esm.js',
            'routeConfig': path.resolve(__dirname, './route.path.config.js'),
            '@': resolve('public')
        }
    }
}

module.exports = function (environment) {
    baseConfig.plugins = []
    switch (environment) {
        case 'development':
            baseConfig.plugins.push(new webpack.optimize.CommonsChunkPlugin({
                name: 'commons',
                filename: 'commons.js',
                minChunks: Math.ceil(Object.keys(entries).length / 2)
            }))
            break
        default:
            baseConfig.plugins.push(new webpack.optimize.CommonsChunkPlugin({
                name: 'commons',
                filename: 'commons.[chunkhash:8].js',
                minChunks: Math.ceil(Object.keys(entries).length / 2)
            }))
            break
    }
    Object.keys(entries).forEach(function (file) {
        var filename = file + '.html';
        baseConfig.plugins.push(new HtmlWebpackPlugin({
            filename: path.resolve(__dirname, '../../views/', filename),
            template: './tmpViews/' + file + '.html',
            inject: "body",
            chunks: ['commons', file]
        }))
    })
    return baseConfig
};