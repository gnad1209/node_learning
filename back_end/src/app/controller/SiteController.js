const { json } = require('express');
const SanPhams = require('../models/SanPhams');
const Courses = require('../models/Courses');
const Users = require('../models/Users');
const { mutipleMongooseToObject } = require('../../ulti/mongoose');

class siteController {
    index(req, res, next) {
        SanPhams.find({})
            .then((sanpham) => {
                // const user = Users.find({})
                // if (user)
                //     res.render('SanPham/Index', {
                //         sanpham: mutipleMongooseToObject(sanpham),
                //     });
                // else
                    res.render('Home/DangNhap', {
                        sanpham: mutipleMongooseToObject(sanpham),
                    });
                // res.render('demo',{ courses: mutipleMongooseToObject(courses) })
            })
            .catch(next);
    }

    baocao(req, res) {
        res.render('BaoCao/Index')
    }

    search(req, res) {
        console.log(req.body);
        res.render('search');
    }
}

module.exports = new siteController();
