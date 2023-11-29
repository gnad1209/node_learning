const mongoose = require('mongoose')
const slug = require('mongoose-slug-generator')
const shortid = require('shortid');
const Schema = mongoose.Schema

mongoose.plugin(slug)
const passportLocalMongoose = require('passport-local-mongoose');

const DatHang = new Schema({
    name: { type: String},
    number: { type: String },
    address: { type: String },
    id_sp: { type: String },
    id_kh: { type: String },
    soluong: { type: String },
    active: { type: String},
    shortid: { type: String, unique: true, default: shortid.generate },
    slug: { type: String, slug: ['name', 'id_sp','shortid'] },
},
    {
        timestamps: true,
    },
)
Users.plugin(passportLocalMongoose);

module.exports = mongoose.model('DatHang', DatHang)