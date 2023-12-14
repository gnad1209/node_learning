const { json } = require('express');
const SanPhams = require('../models/SanPhams');
const { mongooseToObject, mutipleMongooseToObject } = require('../../ulti/mongoose');
const Users = require('../models/Users');
const passport = require("passport")
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const cookie = require('cookie')
const axios = require('axios');
const { model } = require('mongoose');
const midlewareController = require('./MidlewareController');

let refreshTokens = [];
class Token {
    generateAccessToken(user){
        return jwt.sign({
            id: user.id,
            admin: user.admin
        },
        "secretkey",
        {expiresIn: "30d"}
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
                res.render('Login/DangNhap', {
                    users: mutipleMongooseToObject(users),
                });
                // res.render('demo', {courses: mutipleMongooseToObject(courses),});
            })
            .catch(next);
    }

    signup(req, res, next) {
        res.render('Login/Register')
    }

    async register(req, res, next) {
        try {
            const salt = await bcrypt.genSalt(10)
            const hashed = await bcrypt.hash(req.body.password, salt)

            //tạo mới
            // const newUser = await new Users({
            //     username: req.body.username,
            //     email: req.body.email,
            //     password: hashed,
            // })
            const newUser = {
                username: req.body.username,
                email: req.body.email,
                address: req.body.address,
                number: req.body.number,
                password: hashed,
            }
            

            //lưu
            await Users.create(newUser)
                .then(()=>{
                    res.redirect('https://localhost:3000/users')
                })
                .catch(next)
            // const user = await newUser.save()

            return res.status(200).json(Users)
        } catch (error) {
            return res.render('Login/Register', { error: "đki thất bại" })
        }
    }

    async login(req, res, next) {
        res.render('Login/DangNhap')
    }

    async actionLogin(req, res, next) {
        try {
            const user = await Users.findOne({username: req.body.username})
            if(!user){
                res.render('Login/DangNhap', { error: "sai tài khoản" })
            }
            const validPassword = await bcrypt.compare(
                req.body.password,
                user.password
            )
            if(!validPassword){
                res.render('Login/DangNhap', { error: "Sai mật khẩu" })
                // return res.status(404).json("Sai mật khẩu")
            }
            if(user && validPassword){
                const accessToken = cltoken.generateAccessToken(user)
                const refreshToken = cltoken.generateRefreshToken(user)
                user.active = 1
                refreshTokens.push(refreshToken)
                midlewareController.setUserId(user._id)
                midlewareController.setUserAddress(user.number)
                midlewareController.setName_User(user.username)
                midlewareController.setUserNumber(user.address)
                midlewareController.setToken(accessToken)
                res.cookie('refreshToken',refreshToken,{
                    httpOnly:true,
                    secure:false,
                    path:'/',
                    sameSite:'strict',
                })
                const {password, ...others} = user._doc
                res.redirect('/')
                // res.status(200).json({...others,accessToken})
            }
        } catch (error) {
            // res.status(500).json(error)
            res.render('Login/DangNhap', { error: "Sai mật khẩu" })
        }
    }
    
    async delete(req,res,next){
        try {
            const user = await Users.deleteOne({_id: req.params.id})
            Users.find({})
            .then((user) => {
                res.render('User/User',{user: mutipleMongooseToObject(user)})
            })
            .catch(next)
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
        const user = Users.findById({_id: req.params.id})
        if(user)
        {
            user.active = 0
            res.clearCookie('refreshToken')
            req.headers.token = ''
            refreshTokens = refreshTokens.filter(token => token !== req.cookies.refreshToken)
            res.redirect('/users')
        }
    }
}
module.exports = new usersController();
