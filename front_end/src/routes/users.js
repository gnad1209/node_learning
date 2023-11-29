const express = require('express');
const app = express();
const router = express.Router();
const passport = require("passport")
const LocalStrategy = require("passport-local")
const passportLocalMongoose = require("passport-local-mongoose")
const usersController = require('../app/controller/UsersController');
const User = require('../app/models/Users')
const midlewareController = require('../app/controller/MidlewareController')
const cookieParser = require("cookie-parser")

router.use(cookieParser());



router.get('/signup', usersController.signup);
router.post('/register', usersController.register);
router.get('/login', usersController.login);
router.post('/actionLogin', usersController.actionLogin);
router.post('/logout',midlewareController.verifyToken, usersController.logout);
router.get('/', usersController.index);

module.exports = router;


