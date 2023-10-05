const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Course = new Schema({
    name: { type: String, maxLenght: 255},
    description: { type: String, maxLenght: 255},
    image: { type: String, maxLenght: 255},
    creatAt: {type: Date, deafault: Date.now},
    updateAt: {type: Date, deafault: Date.now}
  });

  module.exports = mongoose.model('Course', Course)