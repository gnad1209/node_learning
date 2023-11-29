const { json } = require('express');
const SanPhams = require('../models/SanPhams');
const { mongooseToObject, mutipleMongooseToObject } = require('../../ulti/mongoose');
const Users = require('../models/Users');
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');
const usersController = require('../controller/UsersController');

let actk = null

const midlewareController = {

    verifyToken: (req,res,next) => {
        // console.log(req.headers)
        let token = midlewareController.getToken()
        req.headers.token = token
        if(token){
            const accessToken = token
            jwt.verify(accessToken, "secretkey",(err,user)=>{
                if(err){
                    res.render('Home/DangNhap', { error: "Phiên đăng nhập hết hạn" })
                }
                req.user = user
                next()
            })
        }else{
            res.render('Home/DangNhap', { error: "Đăng nhập lại" })
        }
    },

    verifyTokenAndAdmin: (req,res,next) => {
        midlewareController.verifyToken(req,res, ()=>{
            if(req.user.id == req.params.id || req.user.admin)
            {
                next();
            }else{
                res.render('SanPham/Index', { error: "Không thể xóa" })
            }
        })
    },

    setToken:(accessToken) =>{
        actk = accessToken
    },

    getToken:() =>{
        return actk
    }
}

module.exports = midlewareController