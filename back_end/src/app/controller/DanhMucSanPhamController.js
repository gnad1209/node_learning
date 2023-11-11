const { json } = require('express')
const DanhMucSanPhams = require('../models/DanhMucSanPhams')
const path = require('path');
const { mutipleMongooseToObject, mongooseToObject } = require('../../ulti/mongoose')

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
        const danhmucsanpham = await DanhMucSanPhams.findOne({
            id_sp: danhmucsanphams.id_sp,
        });
        res.render('DanhMucSanPham/Edit', {
            danhmucsanpham: mongooseToObject(danhmucsanpham),
            danhmucsanphams: mutipleMongooseToObject(danhmucsanphams),
        });
    }

    update(req, res, next) {
        DanhMucSanPhams.updateOne({ _id: req.params.id }, req.body)
            .then(() => res.redirect('/'))
            .catch(next);
    }

    delete(req, res, next) {
        DanhMucSanPhams.deleteOne({ _id: req.params.id })
            .then(() => res.redirect('back'))
            .catch(next);
    }

    store(req, res, next) {
        // var maxId
        // DanhMucSanPhams.find({})
        //     .then((danhmucsanpham) => {
        //         obj = { danhmucsanphams: mutipleMongooseToObject(danhmucsanphams) }

        //         const id_sanpham = obj.map(item => item.id_sp)
        //         maxId = Math.max(...id_sanpham);
        //     })
        //     .catch(next)
        // req.body.id_sp = maxId + 1
        const danhmucsanphamm = new DanhMucSanPhams(req.body);
        danhmucsanphamm
            .save()
            // .then(() => res.redirect('/'))
            .then(() => res.send('sucssec'))
            .catch((error) => { });
    }
}

module.exports = new danhmucsanphamsController()