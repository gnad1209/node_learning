const mongoose = require('mongoose')
const shortid = require('shortid')
const slug = require('mongoose-slug-generator');
const Schema = mongoose.Schema

mongoose.plugin(slug)

const SanPhams = new Schema({
    name: { type: String, maxLenght: 255, require: true},
    gia: { type: String, require: true},
    IdSanPham: { type: String },
    mota: { type: String, maxLenght: 255},
    TB: { type: String },
    images: { type: String, maxLenght: 255, },
    shortid: { type: String,unique: true,default: shortid.generate,},
    slug: { type: String,slug:['name','shortid'],}
},{
    timestamps: true
})

module.exports = mongoose.model('SanPhams', SanPhams)
