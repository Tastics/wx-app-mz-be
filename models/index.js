/**
 * Created by cendawei on 2017/4/17.
 */
const Sequelize = require('sequelize')
const path = require('path');
const {defaultsDeep} = require('lodash')
const {database} = require('../configs')
const dbconfig = database[process.env.NODE_ENV];

const DB = new Sequelize(dbconfig.database, dbconfig.username, dbconfig.password, {
    host: dbconfig.host,
    dialect: dbconfig.dialect
});

let db = {
    'define': function (name, fields, opts) {
        const defaultOpts = {
            timestamps: false,
            freezeTableName: true
        };
        let options = opts ? defaultsDeep(opts, defaultOpts) : defaultOpts;
        return DB.define(name, fields, options)
    }
}

let db_proxy = new Proxy(db, {
    get: function (target, key, receiver) {
        return Reflect.get(target, key, receiver) || Reflect.get(DB, key, receiver)
    }
})

module.exports = db_proxy