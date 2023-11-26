const { json } = require('express');
const SanPhams = require('../models/SanPhams');
const {
    mutipleMongooseToObject,
    mongooseToObject,
} = require('../../ulti/mongoose');

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

    cart(req,res,next){
        var price = req.query.gia.replace(/[₫.]/g, '')
        var price_number = parseInt(price, 10)
        var arr = []
        // console.log(req.query.slug)
        SanPhams.find({ slug: req.params.slug })
            .then((sanphams) => {
                res.render('Cart/ShowToCart', {
                    sanphams: mutipleMongooseToObject(sanphams),
                });
                // res.render('demo',{ courses: mutipleMongooseToObject(courses) })
            })
            .catch(next)
    }
}

module.exports = new bagcartController();
