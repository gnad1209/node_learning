const express = require('express');
const router = express.Router();

const productsController = require('../app/controller/ProductsController');

router.get('/:slug', productsController.show);
router.get('/', productsController.index);

module.exports = router;
