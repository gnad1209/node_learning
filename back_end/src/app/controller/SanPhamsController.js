const { json } = require("express");
const SanPhams = require("../models/SanPhams");
const path = require('path');
const fs = require("fs");
const multer = require('multer')
const DanhMucSanPhams = require("../models/DanhMucSanPhams");
const {mutipleMongooseToObject, mongooseToObject} = require('../../ulti/mongoose')

class sanphamsController {
    index(req,res){
        res.send('abc')
    }
    
    show(req, res,next) {
        SanPhams.findOne({slug: req.params.slug})
            .then(sanpham =>
                // res.json(course)
                res.render("SanPham/show",{sanpham: mongooseToObject(sanpham)})
            )
            .catch(next)
    }

    create(req, res,next) {
        DanhMucSanPhams.find({})
            .then(danhmucsanphams =>{
                res.render('SanPham/Create',{ danhmucsanphams: mutipleMongooseToObject(danhmucsanphams) })
                // res.render('demo',{ courses: mutipleMongooseToObject(courses) })
            })
            .catch(next)  
    }

    // store(req, res,next) {
    //     const formData = req.body
    //     // res.json(req.body)
    //     const sanpham = new SanPhams(formData)
    //     sanpham.save()
    //         .then(() => res.redirect('/'))
    //         .catch(error=>{

    //         })
    // }

    async edit(req, res,next) {
        const danhmucsanphams = await DanhMucSanPhams.find({})
        const sanpham = await SanPhams.findById(req.params.id)
        const danhmucsanpham = await DanhMucSanPhams.findOne({id_sp: sanpham.id_sp})
        res.render('SanPham/Edit', { sanpham: mongooseToObject(sanpham),danhmucsanpham: mongooseToObject(danhmucsanpham), danhmucsanphams: mutipleMongooseToObject(danhmucsanphams)});
    }

    update(req,res,next){
        SanPhams.updateOne({_id: req.params.id},req.body)
            .then(() => res.redirect('/'))
            .catch(next)
    }

    delete(req,res,next){
        SanPhams.deleteOne({_id: req.params.id})
            .then(() => res.redirect('back'))
            .catch(next)
    }    
    store(req, res,next) {
        var final_img = {
            contentType:req.file.mimetype,
            images: req.file.buffer
        };
        var formData = req.body
        var obj = {
            name: formData.name,
            gia: formData.gia,
            id_sp: formData.id_sp,
            mota: formData.mota,
            images: final_img
        }
        SanPhams.create(obj)
            .then(() =>{
                res.send('sucsess')
                res.json(req.body.images)
            })
            .catch(error => {

            })
    }
    
    // uploadPhoto(req,res,next){
    //     const obj = {
    //         image: {
    //           data: fs.readFileSync(
    //             path.join(__dirname + "public/images/" + req.file.filename)
    //           ),
    //         contentType: "image/png",
    //         },
    //       };
    //       const newImage = new SanPhams({
    //         images: obj.image,
    //       });
    //       newImage.save((err) => {
    //         err ? console.log(err) : res.redirect("store");
    //       });
    // }
}

module.exports = new sanphamsController();
