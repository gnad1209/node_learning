const express = require('express');
const router = express.Router();

const recommendController = require('../app/controller/RecommendCotroller');

router.get('/:slug', recommendController.show);
router.get('/', recommendController.show);

module.exports = router;
