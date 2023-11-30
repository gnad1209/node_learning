const { json } = require('express');
const SanPhams = require('../models/SanPhams');
const {
    mutipleMongooseToObject,
    mongooseToObject,
} = require('../../ulti/mongoose');

class detailController {
    index(req, res) {
        res.send('abc');
    }

    show(req, res, next) {
        SanPhams.findOne({ slug: req.params.slug })
            .then((sanphams) =>
                // res.json(sanphams)
                res.render('Home/Detail', {
                    sanphams: mongooseToObject(sanphams),
                }),
            )
            .catch(next);
    }
}

module.exports = new detailController();
