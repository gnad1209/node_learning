const mongoose = require('mongoose')
const slug = require('mongoose-slug-generator')
const shortid = require('shortid');
const Schema = mongoose.Schema

mongoose.plugin(slug)
const passportLocalMongoose = require('passport-local-mongoose');

const Users = new Schema({
    username: { type: String},
    password: { type: String },
    pq: { type: String },
    number: { type: String },
    address: { type: String },
    active:{type: String},
    shortid: { type: String, unique: true, default: shortid.generate },
    slug: { type: String, slug: ['name', 'shortid'] },
},
    {
        timestamps: true,
    },
)
Users.plugin(passportLocalMongoose);

module.exports = mongoose.model('Users', Users)