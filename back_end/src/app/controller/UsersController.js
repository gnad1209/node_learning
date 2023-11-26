const { json } = require('express');
const SanPhams = require('../models/SanPhams');
const { mongooseToObject, mutipleMongooseToObject } = require('../../ulti/mongoose');
const Users = require('../models/Users');
const passport = require("passport")
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const cookie = require('cookie')


let refreshTokens = [];
class Token {
    generateAccessToken(user){
        return jwt.sign({
            id: user.id,
            admin: user.admin
        },
        "secretkey",
        {expiresIn: "30s"}
        )
    }

    generateRefreshToken(user){
        return jwt.sign({
            id: user.id,
            admin: user.admin
        },
        "secretkey2",
        {expiresIn: "365d"}
        )
    }
}
const cltoken = new Token()

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
        try {
            const salt = await bcrypt.genSalt(10)
            const hashed = await bcrypt.hash(req.body.password, salt)

            //tạo mới
            const newUser = await new Users({
                username: req.body.username,
                email: req.body.email,
                password: hashed,
            })

            //lưu
            const user = await newUser.save()
            return res.status(200).json(user)
        } catch (error) {
            
        }








        // var formData = req.body
        // if(req.get('host') == 'localhost:9000')
        // var formData = req.body
        // formData.pq = 1
        // await Users.create(formData)
        //     .then(() => {
        //         res.redirect('/sanphams')
        //     })
        //     .catch(next)
    }

    async login(req, res, next) {
        res.render('Home/DangNhap')
        // const users = await Users.findOne({ username: 'haidang' });
        // console.log(users)
    }

    async actionLogin(req, res, next) {
        try {
            const user = await Users.findOne({username: req.body.username})
            if(!user){
                return res.status(404).json(user)
            }
            const validPassword = await bcrypt.compare(
                req.body.password,
                user.password
            )
            if(!validPassword){
                return res.status(404).json("Sai mật khẩu")
            }
            if(user && validPassword){
                const accessToken = cltoken.generateAccessToken(user)
                const refreshToken = cltoken.generateRefreshToken(user)
                refreshTokens.push(refreshToken)
                res.cookie('refreshToken',refreshToken,{
                    httpOnly:true,
                    secure:false,
                    path:'/',
                    sameSite:'strict',
                })
                const {password, ...others} = user._doc
                res.status(200).json({...others,accessToken})
            }
        } catch (error) {
            res.status(500).json(error)
        }









        // try {
        //     // check if the users exists 
        //     const users = await Users.findOne({ username: req.body.username, pq: 1 });
        //     if (users) {
        //         //check if password matches 
        //         const result = req.body.password === users.password;
        //         if (result) {
        //             SanPhams.find({})
        //             .then((sanpham) => {
        //                     res.render('SanPham/Index', {
        //                         sanpham: mutipleMongooseToObject(sanpham),
        //                     });
        //             })
        //             .catch(next);
        //         } else {
        //             res.render('Home/DangNhap', { error: "password doesn't match" });

        //         }
        //     } else {
        //         res.render('Home/DangNhap', { error: "Users doesn't exist" });
        //     }
        // } catch (error) {
        //     // res.status(400).json({ error });
        //     res.render('Home/DangNhap', { error: error.message });
        // }
    }

    
    async getAllUser(req,res,next){
        try {
            const user = await Users.find({})
            return res.status(200).json(user)
        } catch (error) {
            return res.status(500).json(error)
        }
    }

    async delete(req,res,next){
        try {
            const user = await Users.findOne({_id: req.params.id})
            return res.status(200).json('xóa thành công')
        } catch (error) {
            return res.status(500).json(error)
        }
    }
    
    requestRefreshToken(req,res){
        const refreshToken = req.cookies.refreshToken
        if(!refreshToken) return res.status(401).json('u r not authenticated')
        if(!refreshTokens.includes(refreshToken)){
            return res.status(401).json('refresh token is not valid')
        }
        jwt.verify(refreshToken,'secretkey2',(err,user)=>{
            if(err){
                return console.log(err)
            }
            refreshTokens = refreshTokens.filter((token)=>token!==refreshToken)
            const newAccessToken = cltoken.generateAccessToken(user)
            const newRefreshToken = cltoken.generateRefreshToken(user)
            refreshTokens.push(newRefreshToken)
            res.cookie('refreshToken',newRefreshToken,{
                httpOnly:true,
                secure:false,
                path:'/',
                sameSite:'strict',
            })
            return res.status(200).json({accessToken: newAccessToken})
        })
        // console.log(refreshToken)
    }

    logout(req, res, next) {
        res.clearCookie('refreshToken')
        refreshTokens = refreshTokens.filter(token => token !== req.cookies.refreshToken)
        return res.status(200).json('logout')
    }
}

module.exports = new usersController();
