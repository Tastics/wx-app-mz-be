/**
 * Created by cendawei on 2018/2/8.
 */
const crypto = require('crypto')
const qr = require('qr-image')
const {cipherConfig} = require('../configs')
const {getResult, getCacheClient} = require('../core/utils')
const genQrCodeKey = 'wx_mz_be_gen_qrcode_cnt'
const parseUrlKey = 'wx_mz_be_parse_url_cnt'

module.exports = {
    genQrCode(req, res, next) {
        let others = ''
        for(let a in req.query) {
            if(a !== 'text' || a !== 'expire') {
                others += `&${a}=${req.query[a]}`
            }
        }
        const text = req.query['text']
        const expire = parseInt(req.query['expire'])
        const currentTime = new Date().getTime()
        const dl = expire == -1 ? -1 : currentTime + expire * 24 * 60 * 60 * 1000
        const source = JSON.stringify({text, dl})
        const cipher = crypto.createCipher('aes192', cipherConfig['pwd'])
        let target = cipher.update(source, 'utf8', 'hex')
        target += cipher.final('hex')
        const host = process.env.NODE_ENV === 'development' ? 'http://10.13.130.171:8889' : 'http://app.cdroom.top'
        const targetUrl = `${host}/wx/mz/typing#/typing/index?ps=${target}${others}`
        const code = qr.image(targetUrl, { type: 'png' });
        try {
            const client = getCacheClient()
            client.get(genQrCodeKey, (err, reply) => {
                if(reply === null) {
                    client.set(genQrCodeKey, 1)
                } else {
                    client.set(genQrCodeKey, parseInt(reply) + 1)
                }
            })
        } catch (e) {
            console.log(`error in setting redis cache key[${genQrCodeKey}]`)
        }
        res.setHeader('Content-type', 'image/png'); //sent qr image to client side
        code.pipe(res);
    },
    getUrlParams(req, res, next) {
        const target = req.query['ps']
        const decipher = crypto.createDecipher('aes192', cipherConfig['pwd'])
        let source = decipher.update(target, 'hex', 'utf8')
        source += decipher.final('utf8')
        source = JSON.parse(source)
        const result = getResult({codeText: 'success', data: source})
        try {
            const client = getCacheClient()
            client.get(parseUrlKey, (err, reply) => {
                if(reply === null) {
                    client.set(parseUrlKey, 1)
                } else {
                    client.set(parseUrlKey, parseInt(reply) + 1)
                }
            })
        } catch (e) {
            console.log(`error in setting redis cache key[${parseUrlKey}]`)
        }
        res.json(result)
    }
}

