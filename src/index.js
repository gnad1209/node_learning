const express = require("express")
const path = require('path')
const morgan = require("morgan")
const port = 3000
const handlebars = require("express-handlebars");
const app = express()


app.use(express.static(path.join(__dirname, 'public')))


//http logger
app.use(morgan("combined"))

app.engine('hbs', handlebars.engine({
    extname: ".hbs"
}));


app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'resources', 'views'));


app.get("/", (req, res) => {
    res.render('home')
})

app.get("/news", (req, res) => {
    res.render('news')
})

app.listen(port, () => {
    console.log("Kết nối thành công")
})