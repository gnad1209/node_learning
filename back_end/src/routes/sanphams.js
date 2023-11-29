const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const usersController = require('../app/controller/UsersController');
const midlewareController = require('../app/controller/MidlewareController')


var storage = multer.diskStorage({
  destination: function (req, file, res) {
    res(null, 'src/resources/upload');
},
  filename: function (req, file, res) {
    res(null, file.originalname + '-' + Date.now())
  }
})

// file.fieldname + '-' + Date.now()
var upload = multer({ storage: storage });

const sanphamsController = require('../app/controller/SanPhamsController');

router.get('/create',midlewareController.verifyToken, sanphamsController.create);
router.post('/store',midlewareController.verifyToken, upload.single('images'), sanphamsController.store);
router.get('/show/:slug',midlewareController.verifyToken, sanphamsController.show);
router.get('/:id/edit',midlewareController.verifyToken, upload.single('images'), sanphamsController.edit);
router.put('/:id',midlewareController.verifyToken, upload.single('images'), sanphamsController.update);
router.delete('/:id',midlewareController.verifyTokenAndAdmin, sanphamsController.delete);
router.get('/search',midlewareController.verifyToken, sanphamsController.search);
router.get('/',midlewareController.verifyToken, sanphamsController.index);

module.exports = router;
