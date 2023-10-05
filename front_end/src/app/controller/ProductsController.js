const { json } = require("express");
const Course = require("../models/Courses");
const {mutipleMongooseToObject} = require('../../ulti/mongoose')

class productsController {
    index(req, res,next) {
        Course.find({})
            .then(courses =>{
                res.render('Home/Product',{ courses: mutipleMongooseToObject(courses) })
            })
            .catch(next)
    }

    search(req, res) {
        console.log(req.body);
        res.render('search');
    }
}

module.exports = new productsController();
