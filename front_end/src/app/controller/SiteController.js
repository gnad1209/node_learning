const { json } = require('express');
const SanPhams = require('../models/SanPhams');
const Courses = require('../models/Courses');
const { mutipleMongooseToObject,mongooseToObject } = require('../../ulti/mongoose');
const Users = require('../models/Users');

class siteController {
    index(req, res, next) {
        const user =  Users.findOne({
            active: 1,
        });
        SanPhams.find({})
            .then((sanphams) => {
                res.render('Home/Index', {
                    sanphams: mutipleMongooseToObject(sanphams),
                });
                // res.render('demo', {courses: mutipleMongooseToObject(courses),});
            })
            .catch(next);
    }

    recommend(req, res, next) {
        res.render('Home/Recommend')
    }

    search(req, res) {
        console.log(req.body);
        res.render('search');
    }
}

module.exports = new siteController();
