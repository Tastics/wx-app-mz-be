/**
 * Created by cendawei on 2018/2/8.
 */
const express = require('express');
const router = express.Router();
const qrCodeControler = require('../controllers/qrCode');

/* restful api */
router.get('/qr', qrCodeControler.genQrCode)
router.get('/ps', qrCodeControler.getUrlParams)

module.exports = router;