const { json } = require('express');
const SanPhams = require('../models/SanPhams');
const GioHangs = require('../models/GioHangs')
const DatHangs = require('../models/DatHangs')
const Users = require('../models/Users');
const {
    mutipleMongooseToObject,
    mongooseToObject,
} = require('../../ulti/mongoose');
const midlewareController = require('./MidlewareController')

class bagcartController {
    index(req, res) {
        res.send('abc');
    }

    Showtocart(req, res, next) {
        SanPhams.find({  })
            .then((sanpham) => {
                // res.redirect('/')
                res.render('Cart/ShowToCart', {
                    sanpham: mutipleMongooseToObject(sanpham),
                });
            })
            .catch(next);
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
    
    async create(req,res,next){
        var formData = req.body
        const id_user = midlewareController.getUserId()
        const giohang = await GioHangs.findOne({id_user: id_user,slug: formData.slug})
        if(giohang){
            let quantity = giohang.soluong
            let total_price = giohang.total_price
            quantity +=1
            await GioHangs.updateOne({ slug: formData.slug }, {total_price: total_price + parseInt(formData.gia),soluong: quantity}, formData)
            .then(() => res.redirect('http://localhost:3000/bagcart/cart'))
            .catch(next);
        }
        else{
            var obj = {
                id_user: midlewareController.getUserId(),
                name: formData.name,
                gia: parseInt(formData.gia),
                total_price: parseInt(formData.gia),
                soluong: 1,
                id_sp: formData.id_sp,
                slug: formData.slug,
                images: formData.images
            }
            // res.json(obj);
            // console.log(obj)
            await GioHangs.create(obj)
                .then(() => {
                    // res.json(req.body.images)
                    // res.send('success')
                    res.redirect('http://localhost:3000/bagcart/cart')
                })
                .catch(error => {
                    console.log(error);
                })
        }
    }


    delete(req, res, next) {
        GioHangs.deleteOne({ _id: req.params.id })
            .then(() => res.redirect('http://localhost:3000/bagcart/cart'))
            .catch(next);
    }

    async updateQuantity(req,res,next){
        let new_total_price = req.body.gia * req.body.quantity
        if(req.body.quantity == 0 || req.body.quantity < 0 )
        {
            await GioHangs.deleteOne({_id: req.body._id})
                .then(() => res.redirect('http://localhost:3000/bagcart/cart'))
                .catch(next);
        }else{
            await GioHangs.updateMany({ _id: req.body._id },{total_price: new_total_price, soluong: req.body.quantity})
            .then(() => {
                res.redirect('http://localhost:3000/bagcart/cart')
            })
            
            .catch(next);
        }
    }

    donhang(req,res,next){
        const id_user = midlewareController.getUserId()
        const sp_id = midlewareController.getSP_id()
        // const sanpham = SanPhams.find({_id: sp_id})
        const dathangsss = DatHangs.find({id_kh: id_user})
            .then((dathangs) => res.render('Cart/DonHang',{ dathangs: mutipleMongooseToObject(dathangs),success: dathangsss && dathangsss.active === 0}))
            .catch(next)
    }

    // async updateTotal_price(req,res,next){
    //     await GioHangs.find({})
    //         .then((giohangs)=>giohangs)
    // }
}

module.exports = new bagcartController();
