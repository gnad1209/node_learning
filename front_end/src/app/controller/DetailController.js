const { json } = require("express");
const {mutipleMongooseToObject} = require('../../ulti/mongoose')

class detailController {
    index(req, res,next) {
        Course.find({})
            .then(courses =>{
                res.render('Home/Detail',{ courses: mutipleMongooseToObject(courses) })
            })
            .catch(next)
    }

    search(req, res) {
        console.log(req.body);
        res.render('search');
    }
}

module.exports = new detailController();
