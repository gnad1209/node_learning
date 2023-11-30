const mongoose = require('mongoose');
const shortid = require('shortid');
const slug = require('mongoose-slug-generator');
const Schema = mongoose.Schema;

mongoose.plugin(slug);

const TotalPrices = new Schema(
    {
        id_user:{type:String},
        total_price: { type: Number},
        shortid: { type: String, unique: true, default: shortid.generate },
        slug: { type: String, },
    },
    {
        timestamps: true,
    },
);

module.exports = mongoose.model('TotalPrices', TotalPrices);
