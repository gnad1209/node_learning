const { json } = require('express');
const SanPhams = require('../models/SanPhams');
const Courses = require('../models/Courses');
const { mutipleMongooseToObject } = require('../../ulti/mongoose');

class siteController {
    index(req, res, next) {
        SanPhams.find({})
            .then((sanpham) => {
                res.render('SanPham/Index', {
                    sanpham: mutipleMongooseToObject(sanpham),
                });
                // res.render('demo',{ courses: mutipleMongooseToObject(courses) })
            })
            .catch(next);
    }

    search(req, res) {
        console.log(req.body);
        res.render('search');
    }
}

module.exports = new siteController();
