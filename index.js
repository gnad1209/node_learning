const express = require("express")
const morgan = require("morgan")
const port = 3000
const app = express()

app.use(morgan("combined"))

app.get("/", (req, res) => {
    res.send("asd")
})

app.listen(port, () => {
    console.log("Kết nối thành công")
})