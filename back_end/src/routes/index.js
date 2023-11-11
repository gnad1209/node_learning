const siteRouter = require('./site');
const coursesRouter = require('./courses');
const sanphamsRouter = require('./sanphams');
const userRouter = require('./user');
const danhmucsanphamsRouter = require('./danhmucsanphams');
const quanlidonhangRouter = require('./quanlidonhang');

function route(app) {
    app.use('/courses', coursesRouter);
    app.use('/sanphams', sanphamsRouter);
    app.use('/danhmucsanphams', danhmucsanphamsRouter);
    app.use('/quanlidonhang', quanlidonhangRouter);
    // app.use('/courses', coursesRouter);
    app.use('/user', userRouter);

    app.use('/', siteRouter);

}

module.exports = route;
