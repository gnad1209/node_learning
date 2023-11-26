const { json } = require('express');
const SanPhams = require('../models/SanPhams');
const { mongooseToObject, mutipleMongooseToObject } = require('../../ulti/mongoose');
const Users = require('../models/Users');
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const midlewareController = {

    verifyToken: (req,res,next) => {
        const token = req.headers.token
        if(token){
            const accessToken = token.split(" ")[1]
            jwt.verify(accessToken, "secretkey",(err,user)=>{
                if(err){
                    return res.status(403).json("token hết hạn")
                }
                req.user = user
                next()
            })
        }else{
            return res.status(401).json("chưa xác thực")
        }
    },

    verifyTokenAndAdmin: (req,res,next) => {
        midlewareController.verifyToken(req,res, ()=>{
            if(req.user.id == req.params.id || req.user.admin)
            {
                next();
            }else{
                return res.status(403).json("ban ko the xoa")
            }
        })
    }
}

module.exports = midlewareController