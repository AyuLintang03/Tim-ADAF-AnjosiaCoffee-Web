module.exports = {
    isLogin(req, res, next){
        if(req.session.loggedin === true){
            next();
            return;
        } else {
            req.session.destroy(function(err) {
                res.redirect('/lindex');
            })
        }
    },
    isLogout(req, res, next){
        if(req.session.loggedin !== true){
            next();
            return;
        }
        res.redirect('/lindex');
    }
};