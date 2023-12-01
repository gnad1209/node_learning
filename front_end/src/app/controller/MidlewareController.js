const { json } = require('express');
const SanPhams = require('../models/SanPhams');
const { mongooseToObject, mutipleMongooseToObject } = require('../../ulti/mongoose');
const Users = require('../models/Users');
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');

let actk = null
let id_user = null
const midlewareController = {

    verifyToken: (req,res,next) => {
        // console.log(req.headers)
        let token = midlewareController.getToken()
        // console.log(token)
        req.headers.token = token
        if(token){
            const accessToken = token
            jwt.verify(accessToken, "secretkey",(err,user)=>{
                if(err){
                    res.render('Login/DangNhap', { error: "Phiên đăng nhập hết hạn" })
                }
                req.user = user
                next()
            })
        }else{
            res.render('Login/DangNhap', { error: "Đăng nhập lại" })
        }
    },

    verifyTokenAndUser: (req,res,next) => {
        midlewareController.verifyToken(req,res, ()=>{
            if(req.user.id == req.params.id)
            {
                next();
            }else{
                res.render('Home/Index', { error: "Không thể xóa" })
            }
        })
    },

    verifyTokenAndAdmin: (req,res,next) => {
        midlewareController.verifyToken(req,res, ()=>{
            if(req.user.id == req.params.id || req.user.admin)
            {
                next();
            }else{
                res.render('Home/Index', { error: "Không thể xóa" })
            }
        })
    },

    setToken:(accessToken) =>{
        actk = accessToken
    },

    getToken:() =>{
        return actk
    },

    setUserId:(new_id_user)=>{
        id_user =  new_id_user
    },
    getUserId:() =>{
        return id_user
    }
}

module.exports = midlewareController