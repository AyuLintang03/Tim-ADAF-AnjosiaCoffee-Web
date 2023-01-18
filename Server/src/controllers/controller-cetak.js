module.exports ={
    cetak(req,res){
        res.render("cetak",{
            url: 'http://localhost:5050/cetak',
            userName: req.session.username,
        });
    }
}