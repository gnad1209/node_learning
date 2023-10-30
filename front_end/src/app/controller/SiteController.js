const { json } = require("express");
const SanPhams = require("../models/SanPhams");
const Courses = require("../models/Courses");
const {mutipleMongooseToObject} = require('../../ulti/mongoose')

class siteController {
    index(req, res,next) {
        Courses.find({})
            .then(courses =>{
                // res.render('Home/Index',{ sanphams: mutipleMongooseToObject(sanphams) })
                res.render('demo',{ courses: mutipleMongooseToObject(courses) })
            })
            .catch(next)  
    }

    

    search(req, res) {
        console.log(req.body);
        res.render('search');
    }
}

module.exports = new siteController();
