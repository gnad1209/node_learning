const siteRouter = require('./site');
const coursesRouter = require('./courses');
const sanphamsRouter = require('./sanphams');
const usersRouter = require('./users');
const danhmucsanphamsRouter = require('./danhmucsanphams');
const quanlidonhangRouter = require('./quanlidonhang');
function route(app) {
    app.use('/courses', coursesRouter);
    app.use('/sanphams', sanphamsRouter);
    app.use('/danhmucsanphams', danhmucsanphamsRouter);
    app.use('/quanlidonhang', quanlidonhangRouter);
    // app.use('/courses', coursesRouter);
    app.use('/users', usersRouter);

    app.use('/', siteRouter);

}

module.exports = route;
