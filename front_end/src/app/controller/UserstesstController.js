const { json } = require('express');
const SanPhams = require('../models/SanPhams');
const { mongooseToObject, mutipleMongooseToObject } = require('../../ulti/mongoose');
const Users = require('../models/Users');
const jwt = require('jsonwebtoken');
const passport = require("passport")

class userstesstController {
    index(req, res, next) {
        Users.find({})
            .then((users) => {
                // res.json(users)
                res.render('Login/DangNhap', {
                    users: mutipleMongooseToObject(users),
                });
                // res.render('demo', {courses: mutipleMongooseToObject(courses),});
            })
            .catch(next);
    }

    secret(req, res) {
        res.render('Home/Index');
    }

    signup(req, res, next) {
        res.render('Login/Register')
    }


    async register(req, res, next) {
        if(req.get('host') == 'localhost:3000')
        var formData = req.body
        formData.pq = 2
        console.log(formData)
        const users = await Users.findOne({ username: req.body.username});
        try{
            if(!users){
                if ((formData.username) !== ""){
                    if((formData.address) !== ""){
                        if((formData.number) !== ""){
                            const confirmPassword = formData.confirmPassword
                            if(confirmPassword === formData.password)
                            {
                                await Users.create(formData)
                                    .then(() => {
                                        res.redirect('/')
                                    })
                                    .catch(next)
                            }
                            else{
                                res.render('Login/Register', { error: 'xác nhận mật khẩu không khớp.' });
                            }
                        }else{
                            res.render('Login/Register', { error: 'Nhập số điện thoại' });
                        }
                    }else{
                        res.render('Login/Register', { error: 'Nhập địa chỉ' });
                    }
                }
                else{
                    res.render('Login/Register', { error: 'Nhập tên user.' });
                }
            }
            else{
                res.render('Login/Register', { error: 'Tài khoản đã tồn tại' });
            }
        }
        catch(error){
            res.render('Login/Register', { error: error.message });
        }
    }


    async login(req, res, next) {
        res.render('Login/DangNhap')
        // const users = await Users.findOne({ username: 'haidang' });
        // console.log(users)
    }

    async actionLogin(req, res, next) {
        try {
            // check if the users exists 
            const users = await Users.findOne({ username: req.body.username,pq: 2 });
            if (users) {
                //check if password matches 
                const result = req.body.password === users.password;
                if (result) {
                    console.log(users.active)
                    // const token = jwt.sign({ _id: users._id }, 'your_secret_key');
                    // res.json({ token });
                    
                    users.updateOne({ active: 1 })
                        .then(() => res.redirect('/'))
                        .catch(next);
                } else {
                    res.render('Login/DangNhap', { error: "Sai mật khẩu" });
                }
            } else {
                res.render('Login/DangNhap', { error: "Tài khoản không tồn tại" });
            }
        } catch (error) {
            // res.status(400).json({ error });
            res.render('Login/DangNhap', { error: error.message });
        }
    }

    logout(req, res, next) {
        req.logout() 
        const users = Users.findOne({ username: req.body.username,pq: 2,active: 1 });
        if(users)
        {
            users.updateOne({ active: 0 })
            .then(() => res.redirect('/users'))
            .catch(next);
        }
    }
}
// const token = req.header('Authorization');
//                         if (!token) return res.sendStatus(401);

//                         jwt.verify(token, 'your_secret_key', (err, user) => {
//                             if (err) return res.sendStatus(403);
//                             req.user = user;
//                             next();
//                         });
module.exports = new userstesstController();
