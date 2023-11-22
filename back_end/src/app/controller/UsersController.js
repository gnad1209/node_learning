const { json } = require('express');
const SanPhams = require('../models/SanPhams');
const { mongooseToObject, mutipleMongooseToObject } = require('../../ulti/mongoose');
const Users = require('../models/Users');

class usersController {
    index(req, res, next) {
        Users.find({})
            .then((users) => {
                // res.json(users)
                res.render('Home/DangNhap', {
                    users: mutipleMongooseToObject(users),
                });
                // res.render('demo', {courses: mutipleMongooseToObject(courses),});
            })
            .catch(next);
    }

    secret(req, res) {
        res.render('SanPham/Index');
    }

    signup(req, res, next) {
        res.render('Home/Register')
    }

    async register(req, res, next) {
        console.log(req.body)
        var formData = req.body
        await Users.create(formData)
            .then(() => {
                res.redirect('/sanphams')
            })
            .catch(next)
    }


    async login(req, res, next) {
        res.render('Home/DangNhap')
        // const users = await Users.findOne({ username: 'haidang' });
        // console.log(users)
    }

    async actionLogin(req, res, next) {
        try {
            // check if the users exists 
            const users = await Users.findOne({ username: req.body.username });
            if (users) {
                //check if password matches 
                const result = req.body.password === users.password;
                if (result) {
                    // res.render("SanPham/Index");
                    SanPhams.find({})
                    .then((sanpham) => {
                        // const user = Users.find({})
                        // if (user)
                        //     res.render('SanPham/Index', {
                        //         sanpham: mutipleMongooseToObject(sanpham),
                        //     });
                        // else
                            res.render('SanPham/Index', {
                                sanpham: mutipleMongooseToObject(sanpham),
                            });
                        // res.render('demo',{ courses: mutipleMongooseToObject(courses) })
                    })
                    .catch(next);
                } else {
                    res.render('Home/DangNhap', { error: "password doesn't match" });

                }
            } else {
                res.render('Home/DangNhap', { error: "Users doesn't exist" });
            }
        } catch (error) {
            // res.status(400).json({ error });
            res.render('Home/DangNhap', { error: error.message });
        }
    }

    logout(req, res, next) {
        req.logout(function (err) {
            if (err) { return next(err); }
            res.redirect('/users');
        });
    }
}

module.exports = new usersController();
