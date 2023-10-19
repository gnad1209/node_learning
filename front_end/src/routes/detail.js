const express = require('express');
const router = express.Router();

const bagcartController = require('../app/controller/BagCartController');
const detailController = require('../app/controller/DetailController');

router.get('/:slug', detailController.show);
router.get('/showtocart/:slug', bagcartController.show);
router.get('/', detailController.index);

module.exports = router;
