const { json } = require("express");
const Course = require("../models/Courses");
const {mutipleMongooseToObject, mongooseToObject} = require('../../ulti/mongoose')

class courseController {
    index(req,res){
        res.send('abc')

    }
    
    show(req, res,next) {
        Course.findOne({slug: req.params.slug})
            .then(course =>{
                res.render("courses/show",{course: mongooseToObject(course)})
            })
            .catch(next)
    }

    
}

module.exports = new courseController();
