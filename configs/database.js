/**
 * Created by cendawei on 2017/4/17.
 */
const {defaultsDeep} = require('lodash')
const defaultConfig = {
    "host": "127.0.0.1",
    "port": "3306",
    "database": "app_name",
    "username": "root",
    "password": "root",
    "dialect": "mysql"
}
module.exports = {
    'development': defaultsDeep({
    }, defaultConfig),
    'production': defaultsDeep({
    }, defaultConfig),
    'test': defaultsDeep({
    }, defaultConfig)
}