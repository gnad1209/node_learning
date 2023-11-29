const mongoose = require('mongoose');
const shortid = require('shortid');
const slug = require('mongoose-slug-generator');
const Schema = mongoose.Schema;

mongoose.plugin(slug);

const GioHang = new Schema(
    {
        name: { type: String, maxLenght: 255, require: true },
        gia: { type: String, require: true },
        id_sp: { type: String },
        TB: { type: String },
        id_user:{type:String},
        images: { type: String },
        shortid: { type: String, unique: true, default: shortid.generate },
        slug: { type: String, },
    },
    {
        timestamps: true,
    },
);

module.exports = mongoose.model('GioHang', GioHang);
