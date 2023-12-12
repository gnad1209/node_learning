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

class vnpayController {  
    async create(req,res,next){
        var formData = req.body
        const id_user = midlewareController.getUserId()
        const user_number = midlewareController.getUserNumber()
        const user_address = midlewareController.getUserAddress()
        const giohang = await GioHangs.find({id_user: id_user})
        const name_user = await Users.findOne({_id: id_user})
        if(req.body.bankCode == 3){
            var obj = {
                id_sp_abc: formData.id,
                sp: giohang,
                number: user_number,
                address: user_address,
                id_kh: id_user,
                active: 0,
            }
            console.log(obj.id_sp_abc)
            // console.log(obj.sp.map(abc => [abc.soluong,abc.id_sp]))
                await DatHangs.create(obj)
                next();
                for(let i=0; i < obj.id_sp_abc.length; i++){
                    await GioHangs.deleteOne({_id: obj.id_sp_abc[i]})
                }
                res.json('success')
        }
        else{
            console.log('akjfhgj')
         }
    }

    // async updatedathang(req,res,next){
    //     var formData = req.body.bankCode
    //     const id_user = midlewareController.getUserId()
    //     const giohang = await GioHangs.findOne({id_user: id_user,slug: formData.slug})
    //     if(giohang){
    //         let quantity = giohang.soluong
    //         let total_price = giohang.total_price
    //         quantity +=1
    //         await GioHangs.updateOne({ slug: formData.slug }, {total_price: total_price + parseInt(formData.gia),soluong: quantity}, formData)
    //         .then(() => res.redirect('http://localhost:3000/bagcart/cart'))
    //         .catch(next);
    //     }
    //     else{
    //         var obj = {
    //             id_user: midlewareController.getUserId(),
    //             name: formData.name,
    //             gia: formData.gia,
    //             total_price: formData.gia,
    //             soluong: 1,
    //             id_sp: formData.id_sp,
    //             slug: formData.slug,
    //             images: formData.images
    //         }
    //         // res.json(obj);
    //         await GioHangs.create(obj)
    //             .then(() => {
    //                 // res.json(req.body.images)
    //                 // res.send('success')
    //                 res.redirect('http://localhost:3000/bagcart/cart')
    //             })
    //             .catch(error => {
    //                 console.log(error);
    //             })
    //         await TotalPrices.create(obj.total_price)
    //     }
    // }
}

module.exports = new vnpayController();
