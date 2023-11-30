const { json } = require('express');
const SanPhams = require('../models/SanPhams');
const Users = require('../models/Users');
const path = require('path');
const DanhMucSanPhams = require('../models/DanhMucSanPhams');
const {
    mutipleMongooseToObject,
    mongooseToObject,
} = require('../../ulti/mongoose');

class sanphamsController {
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

    show(req, res, next) {
        SanPhams.findOne({ slug: req.params.slug })
            .then((sanpham) =>
                // res.json(course)
                res.render('SanPham/show', {
                    sanpham: mongooseToObject(sanpham),
                }),
            )
            .catch(next);
    }

    async create(req, res, next) {
        await DanhMucSanPhams.find({})
            .then((danhmucsanphams) => {
                res.render('SanPham/Create', {
                    danhmucsanphams: mutipleMongooseToObject(danhmucsanphams),
                });
                // res.render('demo',{ courses: mutipleMongooseToObject(courses) })
            })
            .catch(next);
    }

    async store(req, res, next) {
        var formData = req.body
        var obj = {
            name: formData.name.charAt(0).toUpperCase() + formData.name.slice(1),
            gia: formData.gia,
            id_sp: formData.id_sp,
            mota: formData.mota,
            images: req.file.filename
        }
        // const sanpham = new SanPhams(obj)
        // await sanpham.save()
        // console.log(obj.images);
        await SanPhams.create(obj)
            .then(() => {
                // res.send('success')
                res.redirect('/sanphams/')
            })
            .catch(next)
    }



    async edit(req, res, next) {
        const danhmucsanphams = await DanhMucSanPhams.find({});
        const sanpham = await SanPhams.findById(req.params.id);
        const danhmucsanpham = await DanhMucSanPhams.findOne({
            id_sp: sanpham.id_sp,
        });

        res.render('SanPham/Edit', {
            sanpham: mongooseToObject(sanpham),
            danhmucsanpham: mongooseToObject(danhmucsanpham),
            danhmucsanphams: mutipleMongooseToObject(danhmucsanphams),
        });
    }

    update(req, res, next) {
        SanPhams.updateOne({ _id: req.params.id }, { images: req.file.filename },{name:req.body.name.charAt(0).toUpperCase() + req.body.name.slice(1)}, req.body)
            .then(() => res.redirect('/sanphams/'))
            .catch(next);
    }

    delete(req, res, next) {
        SanPhams.deleteOne({ _id: req.params.id })
            .then(() => res.redirect('back'))
            .catch(next);
    }

    
    search(req,res,next){
        var formData = req.query.search
        const escapedFormData = escapeRegExp(formData);
        var regex = new RegExp(escapedFormData, 'i')
        if(formData){
            SanPhams.find({ name:  { $regex: regex  } })
                .then((sanpham) => {
                    res.render('SanPham/Index', {
                        sanpham: mutipleMongooseToObject(sanpham),
                    });
                    // res.render('demo',{ courses: mutipleMongooseToObject(courses) })
                })
                .catch(next)
        }
        else{
            res.redirect('/sanphams/')
        }
    }
}
function escapeRegExp(string) {
    return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}
module.exports = new sanphamsController();
