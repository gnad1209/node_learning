const express = require('express');
const app = express();
const router = express.Router();
// const passport = require("passport")
// const passportLocalMongoose = require("passport-local-mongoose")
const usersController = require('../app/controller/UsersController');
const User = require('../app/models/Users')
const session = require('express-session');
const midlewareController = require('../app/controller/MidlewareController')
// const LocalStrategy = require('passport-local').Strategy;
const cookieParser = require("cookie-parser")

router.use(cookieParser());
// app.use(session({ secret: 'your_secret_key', resave: true, saveUninitialized: true }));
// app.use(passport.initialize());
// app.use(passport.session());

// passport.use(new LocalStrategy(User.authenticate()));
// passport.serializeUser(User.serializeUser());
// passport.deserializeUser(User.deserializeUser());


router.get('/getAllUser',midlewareController.verifyToken,usersController.getAllUser);
router.get('/signup', usersController.signup);
router.post('/register', usersController.register);
router.get('/login', usersController.login);
router.post('/actionLogin', usersController.actionLogin);
router.post('/logout',midlewareController.verifyToken, usersController.logout);
router.get('/refresh', usersController.requestRefreshToken);
router.delete('/:id',midlewareController.verifyTokenAndAdmin, usersController.delete);
router.get('/', usersController.index);


module.exports = router;


