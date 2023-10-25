const newsRouter = require('./news');
const siteRouter = require('./site');
const coursesRouter = require('./courses');
const sanphamsRouter = require('./sanphams');

function route(app) {
    app.use('/news', newsRouter);
    app.use('/courses', coursesRouter);
    app.use('/sanphams', sanphamsRouter);
    // app.use('/courses', coursesRouter);
    // app.use('/courses', coursesRouter);

    app.use('/', siteRouter);
}

module.exports = route;
