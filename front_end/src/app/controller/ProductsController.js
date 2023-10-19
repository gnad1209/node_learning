const { json } = require("express");
const SanPhams = require("../models/SanPhams");
const {mutipleMongooseToObject, mongooseToObject} = require('../../ulti/mongoose')

class productsController {
    index(req, res,next) {
        SanPhams.find({})
            .then(sanphams =>{
                res.render('Home/Product',{ sanphams: mutipleMongooseToObject(sanphams) })
                // res.render('demo',{ courses: mutipleMongooseToObject(courses) })
            })
            .catch(next)  
    }
}

module.exports = new productsController();
