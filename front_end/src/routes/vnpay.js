const vnpayController = require('../app/controller/VNPayController')
const express = require('express');
const router = express.Router();
let $ = require('jquery');
const request = require('request');
const moment = require('moment');

// router.post('/create_payment_url', vnpayController.create_payment_url);

// router.get('/vnpay_ipn', function (req, res, next) {
//     var vnp_Params = req.query;
//     var secureHash = vnp_Params['vnp_SecureHash'];

//     delete vnp_Params['vnp_SecureHash'];
//     delete vnp_Params['vnp_SecureHashType'];

//     vnp_Params = sortObject(vnp_Params);
//     var config = require('config');
//     var secretKey = config.get('vnp_HashSecret');
//     var querystring = require('qs');
//     var signData = querystring.stringify(vnp_Params, { encode: false });
//     var crypto = require("crypto");     
//     var hmac = crypto.createHmac("sha512", secretKey);
//     var signed = hmac.update(new Buffer(signData, 'utf-8')).digest("hex");     
     

//     if(secureHash === signed){
//         var orderId = vnp_Params['vnp_TxnRef'];
//         var rspCode = vnp_Params['vnp_ResponseCode'];
//         //Kiem tra du lieu co hop le khong, cap nhat trang thai don hang va gui ket qua cho VNPAY theo dinh dang duoi
//         res.status(200).json({RspCode: '00', Message: 'success'})
//     }
//     else {
//         res.status(200).json({RspCode: '97', Message: 'Fail checksum'})
//     }
// });


// router.get('/vnpay_return', function (req, res, next) {
//     var vnp_Params = req.query;

//     var secureHash = vnp_Params['vnp_SecureHash'];

//     delete vnp_Params['vnp_SecureHash'];
//     delete vnp_Params['vnp_SecureHashType'];

//     vnp_Params = sortObject(vnp_Params);

//     var config = require('config');
//     var tmnCode = config.get('vnp_TmnCode');
//     var secretKey = config.get('vnp_HashSecret');

//     var querystring = require('qs');
//     var signData = querystring.stringify(vnp_Params, { encode: false });
//     var crypto = require("crypto");     
//     var hmac = crypto.createHmac("sha512", secretKey);
//     var signed = hmac.update(new Buffer(signData, 'utf-8')).digest("hex");     

//     if(secureHash === signed){
//         //Kiem tra xem du lieu trong db co hop le hay khong va thong bao ket qua

//         res.render('success', {code: vnp_Params['vnp_ResponseCode']})
//     } else{
//         res.render('success', {code: '97'})
//     }
// });

router.post('/create',vnpayController.create)
router.get('/return',vnpayController.return)

module.exports = router;