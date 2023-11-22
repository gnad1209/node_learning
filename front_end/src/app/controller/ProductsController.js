const { json } = require('express');
const SanPhams = require('../models/SanPhams');
const {
    mutipleMongooseToObject,
    mongooseToObject,
} = require('../../ulti/mongoose');

class productsController {
    index(req, res, next) {
        SanPhams.find({})
            .then((sanphams) => {
                const VND = new Intl.NumberFormat('vi-VN', {
                    style: 'currency',
                    currency: 'VND',
                  });
                res.render('Home/Product', {
                    sanphams: mutipleMongooseToObject(sanphams),
                });
                // res.render('demo',{ courses: mutipleMongooseToObject(courses) })
            })
            .catch(next);
    }

    search(req,res,next){
        var formData = req.query.search
        const escapedFormData = escapeRegExp(formData);
        var regex = new RegExp(escapedFormData, 'i')
        // res.send(formData)
        if(formData){
            SanPhams.find({ name:  { $regex: regex  } })
                .then((sanphams) => {
                    res.render('Home/Product', {
                        sanphams: mutipleMongooseToObject(sanphams),
                    });
                    // res.render('demo',{ courses: mutipleMongooseToObject(courses) })
                })
                .catch(next)
        }
        else{
            res.redirect('/products/')
        }
    }
}
function escapeRegExp(string) {
    return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

module.exports = new productsController();
