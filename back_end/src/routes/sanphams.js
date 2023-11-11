const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
var storage = multer.diskStorage({
    destination: function (req, file, res) {
        res(null, 'src/resources/upload');
    },
    filename: function (req, file, res) {
        res(null, file.originalname);
    },
});
// file.fieldname + '-' + Date.now()
var upload = multer({ storage: storage });

const sanphamsController = require('../app/controller/SanPhamsController');

router.get('/create', sanphamsController.create);
router.post('/store', upload.single('images'), sanphamsController.store);
router.get('/show/:slug', sanphamsController.show);
router.get('/:id/edit', upload.single('images'), sanphamsController.edit);
router.put('/:id', upload.single('images'), sanphamsController.update);
router.delete('/:id', sanphamsController.delete);
router.get('/', sanphamsController.index);

module.exports = router;
