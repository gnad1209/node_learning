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
let $ = require('jquery');
const request = require('request');
const moment = require('moment');
const config = require('../../config/default');

class vnpayController {
    async create(req, res, next) {
        var formData = req.body
        const id_user = midlewareController.getUserId()
        const name_user = midlewareController.getName_User()
        const user_number = midlewareController.getUserNumber()
        const user_address = midlewareController.getUserAddress()
        const giohang = await GioHangs.find({ id_user: id_user })
        if (req.body.bankCode == 3) {
            var obj = {
                id_sp_abc: formData.id,
                name: name_user,
                sp: giohang,
                number: user_number,
                address: user_address,
                id_kh: id_user,
                total_price: formData.tongtienn,
                active: false,
            }
            const sp_id = midlewareController.setSP_id(obj.sp.map(abc => abc.slug))
            // console.log( obj.id_sp_abc.length)
            // console.log( obj.id_sp_abc)
            // console.log(obj.sp.map(abc => [abc.soluong,abc.id_sp]))
            await DatHangs.create(obj)
            // next()
            if (obj.id_sp_abc.length == 1) {
                await GioHangs.deleteOne({ _id: obj.id_sp_abc })
            }
            else {
                for (let i = 0; i < obj.id_sp_abc.length; i++) {
                    await GioHangs.deleteOne({ _id: obj.id_sp_abc[i] })
                }
            }
            res.redirect('http://localhost:3000/bagcart/donhang')
        }
        else {
            process.env.TZ = 'Asia/Ho_Chi_Minh';
    
            let date = new Date();
            let createDate = moment(date).format('YYYYMMDDHHmmss');
            
            let ipAddr = req.headers['x-forwarded-for'] ||
                req.connection.remoteAddress ||
                req.socket.remoteAddress ||
                req.connection.socket.remoteAddress;

            // var config = require('config');
            // var dateFormat = require('dateformat');


            var tmnCode = 'LOKDLRIR';
            var secretKey = 'NFQNYJRPIQIKUGAUFVPGRLIXKXAZTPWS';
            var vnpUrl = 'https://sandbox.vnpayment.vn/paymentv2/vpcpay.html';
            var returnUrl = 'http://localhost:3000/vnp/return';
            // let tmnCode = config.get('vnp_TmnCode');
            // let secretKey = config.get('vnp_HashSecret');
            // let vnpUrl = config.get('vnp_Url');
            // let returnUrl = config.get('vnp_ReturnUrl');

            var orderId = moment(date).format('DDHHmmss')
            var amount = req.body.tongtienn;
            var bankCode = 'NCB';

            var locale = req.body.language;
            if (locale === null || locale === '') {
                locale = 'vn';
            }
            var currCode = 'VND';
            var vnp_Params = {};
            vnp_Params['vnp_Version'] = '2.1.0';
            vnp_Params['vnp_Command'] = 'pay';
            vnp_Params['vnp_TmnCode'] = tmnCode;
            // vnp_Params['vnp_Merchant'] = ''
            vnp_Params['vnp_Locale'] = locale;
            vnp_Params['vnp_CurrCode'] = currCode;
            vnp_Params['vnp_TxnRef'] = orderId;
            vnp_Params['vnp_OrderInfo'] = 'Thanh toan cho ma GD:' + orderId;
            vnp_Params['vnp_OrderType'] = 'other';
            vnp_Params['vnp_Amount'] = amount * 100;
            vnp_Params['vnp_ReturnUrl'] = returnUrl;
            vnp_Params['vnp_IpAddr'] = ipAddr;
            vnp_Params['vnp_CreateDate'] = createDate;
            if (bankCode !== null && bankCode !== '') {
                vnp_Params['vnp_BankCode'] = bankCode;
            }

            vnp_Params = sortObject(vnp_Params);

            var querystring = require('qs');
            var signData = querystring.stringify(vnp_Params, { encode: false });
            var crypto = require("crypto");
            var hmac = crypto.createHmac("sha512", secretKey);
            var signed = hmac.update(Buffer.from(signData, 'utf-8')).digest("hex");
            vnp_Params['vnp_SecureHash'] = signed;
            vnpUrl += '?' + querystring.stringify(vnp_Params, { encode: false });

            var obj = {
                id_sp_abc: formData.id,
                name: name_user,
                sp: giohang,
                number: user_number,
                address: user_address,
                id_kh: id_user,
                total_price: formData.tongtienn,
                active: true,
            }
            const sp_id = midlewareController.setSP_id(obj.sp.map(abc => abc.slug))

            await DatHangs.create(obj)
            // next()
                if (obj.id_sp_abc.length == 1) {
                    await GioHangs.deleteOne({ _id: obj.id_sp_abc })
                }
                else {
                    for (let i = 0; i < obj.id_sp_abc.length; i++) {
                        await GioHangs.deleteOne({ _id: obj.id_sp_abc[i] })
                    }
            }

            res.redirect(vnpUrl)
        }
    }

    return(req, res, next) {
       res.render('Cart/Shopping_Succes')
    }
}
function sortObject(obj) {
	let sorted = {};
	let str = [];
	let key;
	for (key in obj){
		if (obj.hasOwnProperty(key)) {
		str.push(encodeURIComponent(key));
		}
	}
	str.sort();
    for (key = 0; key < str.length; key++) {
        sorted[str[key]] = encodeURIComponent(obj[str[key]]).replace(/%20/g, "+");
    }
    return sorted;
}
module.exports = new vnpayController();
