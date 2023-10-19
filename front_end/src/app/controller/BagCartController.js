const { json } = require("express");
const SanPhams = require("../models/SanPhams");
const {mutipleMongooseToObject, mongooseToObject} = require('../../ulti/mongoose')

class bagcartController {
    index(req,res){
        res.send('abc')

    }
    
    show(req, res,next) {
        SanPhams.findOne({slug: req.params.slug})
            .then(sanpham =>{
                // res.redirect('/')
                res.render("Cart/ShowToCart",{sanpham: mongooseToObject(sanpham)})
            })
            .catch(next)
    }
}

module.exports = new bagcartController();
