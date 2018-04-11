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
    }, cacheConfig),
    'production': defaultsDeep({
    }, cacheConfig),
}