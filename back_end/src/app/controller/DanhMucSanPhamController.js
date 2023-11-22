const { json } = require('express')
const DanhMucSanPhams = require('../models/DanhMucSanPhams')
const path = require('path');
const { mutipleMongooseToObject, mongooseToObject } = require('../../ulti/mongoose');
const { randomInt } = require('crypto');

class danhmucsanphamsController {
    index(req, res, next) {
        DanhMucSanPhams.find()
            .then((danhmucsanphams) =>
                // res.json(course)
                res.render('DanhMucSanPham/Index', {
                    danhmucsanphams: mutipleMongooseToObject(danhmucsanphams),
                }),
            )
            .catch(next);
    }

    create(req, res, next) {
        DanhMucSanPhams.find({})
            .then((danhmucsanphams) => {
                res.render('DanhMucSanPham/Add', {
                    danhmucsanphams: mutipleMongooseToObject(danhmucsanphams),
                });
                // res.render('demo',{ courses: mutipleMongooseToObject(courses) })
            })
            .catch(next);
    }

    async edit(req, res, next) {
        const danhmucsanphams = await DanhMucSanPhams.find({});
        const danhmucsanpham = await DanhMucSanPhams.findById(req.params.id);
        res.render('DanhMucSanPham/Edit', {
            danhmucsanpham: mongooseToObject(danhmucsanpham),
            danhmucsanphams: mutipleMongooseToObject(danhmucsanphams),
        });
    }

    update(req, res, next) {
        DanhMucSanPhams.updateOne({ _id: req.params.id }, req.body)
            .then(() => res.redirect('/danhmucsanphams'))
            .catch(next);
    }

    delete(req, res, next) {
        DanhMucSanPhams.deleteOne({ _id: req.params.id })
            .then(() => res.redirect('back'))
            .catch(next);
    }

    async store(req, res, next) {
        const formData = req.body;
        var loaiSanPhamNumber;
        var loaiSanPham = await DanhMucSanPhams.findOne({}, null, { sort: { id_sp: -1 } });
        loaiSanPhamNumber = parseInt(loaiSanPham.id_sp);
        formData.id_sp = loaiSanPhamNumber + 1;
        var loaiSanPhamString = "" + formData.id_sp;
        formData.id_sp = loaiSanPhamString;
        // console.log(formData);
        var obj = {
            name: formData.name,
            id_sp: formData.id_sp
        };
        // console.log(randomInt(1, 10))
        DanhMucSanPhams.create(obj)
            .then(() => {
                // res.json(req.body.images)
                // res.send('success')
                res.redirect('/danhmucsanphams')
            })
            .catch(error => {
                console.log(error);
            })
    }
    search(req,res,next){
        var formData = req.body
        res.render(formData)
    }
}

module.exports = new danhmucsanphamsController()