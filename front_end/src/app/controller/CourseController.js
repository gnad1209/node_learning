const { json } = require("express");
const Courses = require("../models/Courses");
const {mutipleMongooseToObject, mongooseToObject} = require('../../ulti/mongoose')

class courseController {
    index(req,res){
        res.send('abc')
    }
    
    show(req, res,next) {
        Courses.findOne({slug: req.params.slug})
            .then(course =>
                res.json(course)
                // res.render("courses/show",{course: mongooseToObject(course)})
            )
            .catch(next)
    }

    create(req, res,next) {
            res.render('courses/create')
    }

    store(req, res,next) {
        const formData = req.body
        const course = new Courses(formData)
        course.save()
            .then(() => res.redirect('/'))
            .catch(error=>{

            })
}
    
}

module.exports = new courseController();
