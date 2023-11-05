const mongoose = require('mongoose');

async function connect() {
    try {
        await mongoose.connect('mongodb://127.0.0.1:27017/f8_education_dev', {
            //    await mongoose.connect("mongodb://127.0.0.1:27017/watchs", {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('kết nối thành côngggg');
    } catch (error) {
        console.log('kết nối ko thành công', error.message);
    }
}

module.exports = { connect };
