const newsRouter = require('./news');
const siteRouter = require('./site');
const coursesRouter = require('./courses');
const bagcartRouter = require('./bagcart');

function route(app) {
    app.use('/news', newsRouter);
    app.use('/courses', coursesRouter);
    app.use('/bagcart', coursesRouter);
    // app.use('/courses', coursesRouter);
    // app.use('/courses', coursesRouter);

    app.use('/', siteRouter);
}

module.exports = route;
