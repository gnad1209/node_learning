const express = require('express');
const router = express.Router();

const productsController = require('../app/controller/ProductsController');

router.get('/search', productsController.search);
router.get('/', productsController.index);

module.exports = router;
