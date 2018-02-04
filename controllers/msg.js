/**
 * Created by cendawei on 2017/4/28.
 */
const msgModel = require('../models/msg')
const {getResult} = require('../core/utils')
const {omit} = require('lodash')

module.exports = {
    async addItem (req, res, next) {
        res.end(req.query['echostr'])
        /*const data = await msgModel.addItem();
        let result = {}
        if(data.ok) {
            result['codeText'] = 'success'
            result['data'] = omit(data, 'ok')
        } else {
            result['codeText'] = 'failure'
        }
        res.json(getResult(result))*/
    }
}