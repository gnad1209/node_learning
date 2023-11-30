const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const bagcartController = require('../app/controller/BagCartController');
const midlewareController = require('../app/controller/MidlewareController')
const cookieParser = require("cookie-parser")

router.use(cookieParser());
var storage = multer.diskStorage({
    destination: function (req, file, res) {
      res(null, 'src/resources/upload');
  },
    filename: function (req, file, res) {
      res(null, file.originalname + '-' + Date.now())
    }
  })

// router.get('/:slug', bagcartController.show);
router.get('/cart',midlewareController.verifyToken, bagcartController.cart);
router.post('/create',midlewareController.verifyToken, bagcartController.create);
router.delete('/:id',midlewareController.verifyToken, bagcartController.delete);
router.put('/updateQuantity/:id',midlewareController.verifyToken, bagcartController.updateQuantity);
router.get('/', bagcartController.index);

module.exports = router;
