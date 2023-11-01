const express = require('express');
const router = express.Router();
const multer = require("multer");
const path = require('path');

const sanphamsController = require('../app/controller/SanPhamsController');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "public/images");
    },
    filename: function (req, file, cb) {
      cb(
        null,
        file.fieldname + "-" + Date.now() + path.extname(file.originalname)
      );
    },
  });
  const upload = multer({ storage: storage });

router.get('/create', sanphamsController.create);
router.post('/store',upload.single('images'), sanphamsController.store);
router.get('/show/:slug', sanphamsController.show);
router.get('/', sanphamsController.index);

module.exports = router;
