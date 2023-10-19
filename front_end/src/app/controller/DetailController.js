const { json } = require("express");
const SanPhams = require("../models/SanPhams");
const {mutipleMongooseToObject, mongooseToObject} = require('../../ulti/mongoose')

class detailController {
    index(req,res){
        res.send('abc')  
    }
    
    show(req, res,next) {
        SanPhams.findOne({slug: req.params.slug})
            .then(sanphams =>
                // res.json(sanphams)
                res.render("Home/Detail",{sanphams: mongooseToObject(sanphams)})
            )
            .catch(next)
    }

    create(req, res,next) {
            res.render('Home/create')
    }

    store(req, res,next) {
        const sanphams = new Course(req.body)
        sanphams.save()
            .then(() => res.redirect('/'))
            .catch(error=>{

            })
}

    showcart(req, res,next) {
        SanPhams.findOne({slug: req.params.slug})
            .then(() => res.redirect('Cart/ShowToCart'))
            .catch(error=>{

            })
    }
    
}

module.exports = new detailController();
