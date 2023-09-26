const express = require('express');
const path = require('path');
const morgan = require('morgan');
const port = 3000;
const handlebars = require('express-handlebars');
const app = express();
const route = require('./routes/');
const { execPath } = require('process');

app.use(express.static(path.join(__dirname, 'public')));
app.use(
  express.urlencoded({
    extended: true,
  }),
);
app.use(express.json());

//http logger
// app.use(morgan("combined"))

app.engine(
  'hbs',
  handlebars.engine({
    extname: '.hbs',
  }),
);

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'resources', 'views'));

route(app);

app.listen(port, () => {
  console.log('Kết nối thành công');
});
