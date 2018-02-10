const crypto = require('crypto')
const hash = crypto.createHash('sha1')
const {wx} = require('../configs')

module.exports = {
    iswx: (req, res, next) => {
        const token = wx.token
        const timestamp = req.query['timestamp']
        const nonce = req.query['nonce']
        let validateArray = [token, timestamp, nonce]
        validateArray = validateArray.sort()
        const validateStr = hash.update(validateArray.join("")).digest('hex')
        if(validateStr === req.query["signature"]) {
            res.end(req.query['echostr'])
        } else {
            res.status(500).end("error in validation")
        }
    }
}