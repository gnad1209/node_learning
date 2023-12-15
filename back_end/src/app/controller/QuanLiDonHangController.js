const { json } = require('express');
const SanPhams = require('../models/SanPhams');
const DatHangs = require('../models/DatHangs');
const Users = require('../models/Users');
const path = require('path');
const midlewareController = require('./MidlewareController')
const DanhMucSanPhams = require('../models/DanhMucSanPhams');
const {
    mutipleMongooseToObject,
    mongooseToObject,
} = require('../../ulti/mongoose');

class quanlidonhangController {
    index(req, res) {
        res.render('ThongKe/Index')
    }

    donhang(req,res,next){
        const id_user = midlewareController.getUserId()
        const sp_id = midlewareController.getSP_id()
        // const sanpham = SanPhams.find({_id: sp_id})
        const dathangsss = DatHangs.find({})
            .then((dathangs) => res.render('ThongKe/Index',{ dathangs: mutipleMongooseToObject(dathangs),success: dathangsss && dathangsss.active === 0,}))
            .catch(next)
    }


    async edit(req, res, next) {
        DatHangs.findOne({ _id: req.params.id})
            .then((dathangs) => res.render('ThongKe/Edit',{ dathangs: mongooseToObject(dathangs)}))
            .catch(next)
    }

    async update(req, res, next) {
        try {
            if(req.body.trang_thai === 'Đã thanh toán'){
                const obj = {
                    active: true
                }
                await DatHangs.updateOne({ _id: req.params.id }, {active: obj.active})
                .then(() => res.redirect('/quanlidonhang/'))
                .catch(next);
            }
            else{
                const obj = {
                    active: false
                }
                await DatHangs.updateOne({ _id: req.params.id }, {active: obj.active})
                .then(() => res.redirect('/quanlidonhang/'))
                .catch(next);
            }
            
            
            } catch (error) {
                res.redirect('/quanlidonhang/')
            }
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

module.exports = new quanlidonhangController()