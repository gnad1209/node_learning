const { json } = require('express');
const { mutipleMongooseToObject } = require('../../ulti/mongoose');

class shoppingSuccesController {
    index(req, res, next) {
        Course.find({})
            .then((courses) => {
                res.render('Cart/Shopping_Succes', {
                    courses: mutipleMongooseToObject(courses),
                });
            })
            .catch(next);
    }

    search(req, res) {
        console.log(req.body);
        res.render('search');
    }
}

module.exports = new shoppingSuccesController();
