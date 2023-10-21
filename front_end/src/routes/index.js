const newsRouter = require('./news');
const siteRouter = require('./site');
const coursesRouter = require('./courses');
const bagcartRouter = require('./bagcart');
const detailRouter = require('./detail');
const recommendRouter = require('./recommend');
const productsRouter = require('./products');

function route(app) {
    app.use('/news', newsRouter);
    app.use('/courses', coursesRouter);
    app.use('/showtocart', bagcartRouter);
    app.use('/detail', detailRouter);
    app.use('/recommend', recommendRouter);
    app.use('/products', productsRouter);
    // app.use('/courses', coursesRouter);
    // app.use('/courses', coursesRouter);

    app.use('/', siteRouter);
}

module.exports = route;
