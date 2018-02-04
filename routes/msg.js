/**
 * Created by cendawei on 2017/4/28.
 */
const express = require('express');
const router = express.Router();
const path = require('path')
const msgControler = require('../controllers/msg');

/* GET users listing. */
router.get('/additem', msgControler.addItem)

module.exports = router;
