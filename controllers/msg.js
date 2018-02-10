/**
 * Created by cendawei on 2017/4/28.
 */
const msgModel = require('../models/msg')
const {getResult} = require('../core/utils')
const {omit} = require('lodash')

module.exports = {
    async addItem (req, res, next) {
        const data = await msgModel.addItem(req.body);
        let result = {}
        if(data.ok) {
            res.end('success')
        } else {
            res.status(500).end('error in insertiing DB')
        }
    }
}