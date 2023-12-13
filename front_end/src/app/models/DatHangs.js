const mongoose = require('mongoose')
const slug = require('mongoose-slug-generator')
const shortid = require('shortid');
const Schema = mongoose.Schema

mongoose.plugin(slug)

const DatHangs = new Schema({
    name: { type: String},
    number: { type: String },
    total_price: { type: String },
    address: { type: String },
    sp: { type: Object },
    id_kh: { type: String },
    active: { type: Boolean, default: false},
    shortid: { type: String, unique: true, default: shortid.generate },
    slug: { type: String, slug: ['name', 'id_sp','shortid'] },
},
    {
        timestamps: true,
    },
)

module.exports = mongoose.model('DatHangs', DatHangs)