const express = require('express');
const multer = require('multer');
const path = require('path');
const morgan = require('morgan');
const dotenv = require('dotenv');
var port = 9000;
const handlebars = require('express-handlebars');
const app = express();
const route = require('./routes/');
const { execPath } = require('process');
const methodOverride = require('method-override');
const db = require('./config/db');
const User = require('./app/models/Users')
const cookieParser = require("cookie-parser")
// const Provider = require('react-redux')
// const store = require('./redux/store')
//conect db
db.connect();

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'resources', 'upload')));
app.use(
    express.urlencoded({
        extended: true,
    }),
);
app.use(express.json());
app.use(methodOverride('_method')); 
//http logger
// app.use(morgan("combined"))

app.engine(
    'hbs',
    handlebars.engine({
        extname: '.hbs',
        helpers: {
            sum: (a, b) => a + b,
        },
    }),
);

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'resources', 'views'));

app.use(cookieParser());

route(app);

//json web token


app.listen(port, () => {
    console.log(`app listening at http://localhost:${port}`);
});
