const newsRouter = require('./news');
const siteRouter = require('./site');
const coursesRouter = require('./courses');
const sanphamsRouter = require('./sanphams');
const userRouter = require('./user');

function route(app) {
    app.use('/news', newsRouter);
    app.use('/courses', coursesRouter);
    app.use('/sanphams', sanphamsRouter);
    // app.use('/courses', coursesRouter);
    // app.use('/courses', coursesRouter);

    app.use('/', siteRouter);
    app.use('/user', userRouter);

}

module.exports = route;
