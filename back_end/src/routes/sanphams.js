const express = require('express');
const router = express.Router();

const sanphamsController = require('../app/controller/SanPhamsController');

router.get('/create', sanphamsController.create);
router.post('/store', sanphamsController.store);
router.get('/show/:slug', sanphamsController.show);
router.get('/', sanphamsController.index);

module.exports = router;
