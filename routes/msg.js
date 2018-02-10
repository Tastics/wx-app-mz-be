/**
 * Created by cendawei on 2017/4/28.
 */
const express = require('express');
const router = express.Router();
const msgControler = require('../controllers/msg');
const {iswx} = require('../middlewares/validates')

/* restful api */
router.get('/addItem', iswx)
router.post('/addItem', msgControler.addItem)

module.exports = router;
