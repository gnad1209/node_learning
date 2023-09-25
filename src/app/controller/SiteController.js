class newsController{
    index(req,res){
        res.render('home')
    }

    search(req,res){
        console.log(req.body)
        res.render('search')
    }
}

module.exports = new newsController

