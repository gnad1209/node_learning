const express = require('express');
const router = express.Router();

const danhmucsanphamsController = require('../app/controller/DanhMucSanPhamController');

router.get('/create', danhmucsanphamsController.create);
router.post('/store', danhmucsanphamsController.store);
router.get('/:id/edit', danhmucsanphamsController.edit);
router.put('/:id', danhmucsanphamsController.update);
router.delete('/:id', danhmucsanphamsController.delete);
router.get('/', danhmucsanphamsController.index);

module.exports = router;
