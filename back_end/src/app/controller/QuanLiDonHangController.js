const { json } = require('express');
const SanPhams = require('../models/SanPhams');
const path = require('path');
const DanhMucSanPhams = require('../models/DanhMucSanPhams');
const {
    mutipleMongooseToObject,
    mongooseToObject,
} = require('../../ulti/mongoose');

class quanlidonhangController {
    index(req, res) {
        res.render('ThongKe/Index')
    }
}

module.exports = new quanlidonhangController()