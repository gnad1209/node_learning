const express = require('express');
const router = express.Router();

const productsController = require('../app/controller/ProductsController');

router.get('/:slug', productsController.index);
router.get('/', productsController.index);

module.exports = router;