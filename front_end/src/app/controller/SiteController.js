const { json } = require("express");
const Course = require("../models/Courses");
const {mutipleMongooseToObject} = require('../../ulti/mongoose')

class siteController {
    index(req, res,next) {
        // try {
        //     const courses = await Course.find({});
        //     res.render('home',{ courses })
        //     // res.json(course);
        // }  catch (err) {
        //     res.status(400).json({error: err});
        // }
        Course.find({})
            .then(courses =>{
                res.render('Home/Index',{ courses: mutipleMongooseToObject(courses) })
                // res.render('demo',{ courses: mutipleMongooseToObject(courses) })
            })
            .catch(next)
    }

    search(req, res) {
        console.log(req.body);
        res.render('search');
    }
}

module.exports = new siteController();
