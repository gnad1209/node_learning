const mongoose = require('mongoose');
const slug = require('mongoose-slug-generator');
const Schema = mongoose.Schema;

mongoose.plugin(slug);

const DanhMucSanPhams = new Schema(
    {
        name: { type: String, maxLenght: 255, require: true },
        id_sp: { type: String, maxLenght: 255, require: true },
        slug: { type: String, slug: 'name', unique: true },
    },
    {
        timestamps: true,
    },
);

module.exports = mongoose.model('DanhMucSanPham', DanhMucSanPhams);
