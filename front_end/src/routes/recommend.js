const express = require('express');
const router = express.Router();

const recommendController = require('../app/controller/RecommendController');

router.get('/:slug', recommendController.show);
router.get('/', recommendController.index);

module.exports = router;
