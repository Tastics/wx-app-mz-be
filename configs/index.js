/**
 * Created by cendawei on 2017/8/17.
 */
const path = require('path');
const fs = require('fs');

const files = fs.readdirSync(__dirname);
let configs = {};

files.forEach(function (file) {
    if(file !== 'index.js'){
        const key = path.basename(file, '.js')
        const value = require(path.resolve(__dirname, file))
        configs[key] = value;
    }
})

module.exports = configs;