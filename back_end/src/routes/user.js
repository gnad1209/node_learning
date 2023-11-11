const express = require('express');
const router = express.Router();

const userController = require('../app/controller/UserController');

router.get('/search', userController.search);
router.get('/', userController.index);

module.exports = router;
