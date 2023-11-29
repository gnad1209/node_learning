const sanphamsRouter = require('./sanphams');
const usersRouter = require('./users');
const danhmucsanphamsRouter = require('./danhmucsanphams');
const quanlidonhangRouter = require('./quanlidonhang');

function route(app) {
    app.use('/sanphams', sanphamsRouter);
    app.use('/danhmucsanphams', danhmucsanphamsRouter);
    app.use('/quanlidonhang', quanlidonhangRouter);
    // app.use('/courses', coursesRouter);
    app.use('/users', usersRouter);

    app.use('/', usersRouter);

}

module.exports = route;
