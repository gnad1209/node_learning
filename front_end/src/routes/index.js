const siteRouter = require('./site');
const bagcartRouter = require('./bagcart');
const detailRouter = require('./detail');
const productsRouter = require('./products');
const vnpayRouter = require('./vnpay')
const vnpRouter = require('./vnp')
const usersRouter = require('./users');

function route(app) {
    app.use('/detail', detailRouter);
    app.use('/bagcart', bagcartRouter);
    app.use('/products', productsRouter);
    app.use('/vnpay', vnpayRouter);
    app.use('/vnp', vnpRouter);
    app.use('/users', usersRouter);
    // app.use('/courses', coursesRouter);
    // app.use('/courses', coursesRouter);

    app.use('/', siteRouter);
}

module.exports = route;
