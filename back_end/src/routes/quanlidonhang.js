const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const quanlidonhangController = require('../app/controller/QuanLiDonHangController');
const midlewareController = require('../app/controller/MidlewareController')


router.get('/:id/edit', quanlidonhangController.edit);
router.put('/:id', quanlidonhangController.update);
router.delete('/:id', quanlidonhangController.delete);
router.get('/search', quanlidonhangController.search);
router.get('/', quanlidonhangController.donhang);

module.exports = router;
