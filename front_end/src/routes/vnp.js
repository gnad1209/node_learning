const vnpayController = require('../app/controller/VNPayController')
const express = require('express');
const router = express.Router();
let $ = require('jquery');
const request = require('request');
const moment = require('moment');

const siteController = require('../app/controller/SiteController');

router.get('/return',vnpayController.return)

module.exports = router;
