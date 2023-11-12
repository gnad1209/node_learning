const mongoose = require('mongoose');
const mongoStore = require('connect-mongo')
async function connect() {
    try {
        mongoose.set('strictQuery', false)
        //    await mongoose.connect("mongodb://127.0.0.1:27017/f8_education_dev", {
        await mongoose.connect('mongodb://127.0.0.1:27017/watchs', {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            // useCreateIndex: true,
        });
        console.log('kết nối thành côngggg');
    } catch (error) {
        console.log('kết nối ko thành công', error.message);
    }
}

module.exports = { connect };
