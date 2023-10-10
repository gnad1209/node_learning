const mongoose = require('mongoose')
const slug = require('mongoose-slug-generator');
const Schema = mongoose.Schema

mongoose.plugin(slug)

const SanPham = new Schema({
    Name: { type: String, maxLenght: 255, require: true},
    Gia: { type: String, maxLenght: 255, require: true},
    IdSanPham: { type: String, maxLenght: 255, require: true},
    Mota: { type: String, maxLenght: 255, require: true},
    TB: { type: String, maxLenght: 255, require: true},
    images: { type: String, maxLenght: 255, },
    slug: { type: String,slug:'Name',unique: true}
},{
    timestamps: true
})

// function separator(Gia) {
//     var str = Gia.toString().split(".");
//     str[0] = str[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
//     return str.join(".");
// }

module.exports = mongoose.model('SanPham', SanPham)
