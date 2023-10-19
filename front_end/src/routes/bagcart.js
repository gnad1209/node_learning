const express = require('express');
const router = express.Router();

const bagcartController = require('../app/controller/BagCartController');

router.get('/:slug', bagcartController.show);
router.get('/', bagcartController.index);

module.exports = router;
