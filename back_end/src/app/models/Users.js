const mongoose = require('mongoose')
const slug = require('mongoose-slug-generator')
const shortid = require('shortid');
const Schema = mongoose.Schema

mongoose.plugin(slug)
// const passportLocalMongoose = require('passport-local-mongoose');

const Users = new Schema({
    username: { type: String,required: true,unique: true },
    email:{type: String,required: true,unique: true},
    password: { type: String },
    admin: { type: Boolean,default: false },
    shortid: { type: String, unique: true, default: shortid.generate },
    slug: { type: String, slug: ['name', 'shortid'] },
},
    {
        timestamps: true,
    },
)
// Users.plugin(passportLocalMongoose);

module.exports = mongoose.model('Users', Users)