const express = require('express');
const app = express();
const router = express.Router();
const passport = require("passport")
const LocalStrategy = require("passport-local")
const passportLocalMongoose = require("passport-local-mongoose")
const usersController = require('../app/controller/UsersController');
const User = require('../app/models/Users')

app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


router.get('/secret', isLoggedIn, usersController.secret);
router.get('/signup', usersController.signup);
router.post('/register', usersController.register);
router.get('/login', usersController.login);
router.post('/actionLogin', usersController.actionLogin);
router.get('/logout', usersController.logout);
router.get('/', usersController.index);

function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) return next();
    res.redirect("/login");
}
module.exports = router;


