/**
 * Created by cendawei on 2017/8/18.
 */
const {defaultsDeep} = require('lodash')
const cacheConfig = {
    'host': '127.0.0.1',
    'port': '6379'
}

module.exports = {
    'development': defaultsDeep({
    }, cacheConfig),
    'testing': defaultsDeep({
        host: '120.78.95.62'
    }, cacheConfig),
    'production': defaultsDeep({
        host: '120.78.95.62'
    }, cacheConfig),
}