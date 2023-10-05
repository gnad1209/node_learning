const express = require('express');
const router = express.Router();

const showToCartController = require('../app/controller/ShowToCartController');

router.get('/:slug', showToCartController.show);
router.get('/', showToCartController.index);

module.exports = router;
