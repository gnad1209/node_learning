const express = require('express')
const router = express.Router()

const quanlidonhangController = require('../app/controller/QuanLiDonHangController')

router.get('/', quanlidonhangController.index);

module.exports = router;
