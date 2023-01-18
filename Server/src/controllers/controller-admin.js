const config = require('../configs/database');
const mysql = require('mysql');
const pool = mysql.createPool(config);

module.exports ={
    admin(req,res){
        res.render("admin",{
            url: 'http://localhost:5050/admin',
            userName: req.session.username,
        });
    }
}