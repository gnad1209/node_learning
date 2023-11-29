const { json } = require('express');
const SanPhams = require('../models/SanPhams');
const GioHangs = require('../models/GioHang')
const {
    mutipleMongooseToObject,
    mongooseToObject,
} = require('../../ulti/mongoose');
const Users = require('../models/Users');
const midlewareController = require('./MidlewareController')

class bagcartController {
    index(req, res) {
        res.send('abc');
    }

    show(req, res, next) {
        SanPhams.findOne({ slug: req.params.slug })
            .then((sanpham) => {
                // res.redirect('/')
                res.render('Cart/ShowToCart', {
                    sanpham: mongooseToObject(sanpham),
                });
            })
            .catch(next);
    }

    async create(req,res,next){
        var formData = req.body
        var obj = {
            id_user: midlewareController.getUserId(),
            name: formData.name,
            gia: formData.gia,
            id_sp: formData.id_sp,
            slug: formData.slug,
            images: formData.images
        }
        // res.json(obj);
        await GioHangs.create(obj)
            .then(() => {
                // res.json(req.body.images)
                // res.send('success')
                res.redirect('http://localhost:3000/')
            })
            .catch(error => {
                console.log(error);
            })
    }

    cart(req,res,next){
        const verify_id_user = midlewareController.getUserId()
        // res.json(verify_id_user)
        // console.log(req.query.slug)
        GioHangs.find({ id_user:  verify_id_user})
            .then((giohangs) => {
                res.render('Cart/ShowToCart', {
                    giohangs: mutipleMongooseToObject(giohangs),
                });
                // res.render('demo',{ courses: mutipleMongooseToObject(courses) })
            })
            .catch(next)
    }

    delete(req, res, next) {
        GioHangs.deleteOne({ _id: req.params.id })
            .then(() => res.redirect('http://localhost:3000/bagcart/cart'))
            .catch(next);
    }
}

module.exports = new bagcartController();
