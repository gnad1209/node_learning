const express = require('express');
const path = require('path');
const morgan = require('morgan');
const port = 3000;
const handlebars = require('express-handlebars');
const app = express();
const route = require('./routes/');
const { execPath } = require('process');
const db = require('./config/db');
const methodOverride = require('method-override');

//conect db
db.connect();

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.resolve(__dirname, '..', '..', 'back_end', 'src', 'resources', 'upload')));
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
            eq: (a,b) => a===b,
            total: (a,b) =>  a+=b,
        },
    }),
);

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'resources', 'views'));
route(app);

app.listen(port, () => {
    console.log(`app listening at http://localhost:${port}`);
});
