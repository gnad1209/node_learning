const mongoose = require('mongoose')
const slug = require('mongoose-slug-generator');
const Schema = mongoose.Schema
const shortid = require('shortid');

mongoose.plugin(slug)

const Course = new Schema({
    name: { type: String, maxLenght: 255, require: true},
    description: { type: String, maxLenght: 255},
    image: { type: String, maxLenght: 255,require: true},
    shortid: { type: String,unique: true,default: shortid.generate,},
    slug: { type: String,slug:['name','shortid'],}

    // creatAt: {type: Date, deafault: Date.now},
    // updateAt: {type: Date, deafault: Date.now}
  },{
    timestamps: true
  });

  module.exports = mongoose.model('Course', Course)