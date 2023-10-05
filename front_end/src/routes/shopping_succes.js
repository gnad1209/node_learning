const express = require('express');
const router = express.Router();

const shoppingSuccesController = require('../app/controller/Shopping_SuccesController');

router.get('/:slug', shoppingSuccesController.show);
router.get('/', shoppingSuccesController.index);

module.exports = router;
