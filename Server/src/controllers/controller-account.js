const config = require('../configs/database');
const mysql = require('mysql');
const pool = mysql.createPool(config);

pool.on('error',(err)=> {
    console.error(err);
});

module.exports ={
    
    getDataUser(req,res){
        pool.getConnection(function(err, connection) {
            if (err) throw err;
            
            connection.query(
                `
                SELECT user_id,username,nomer_hp FROM tbl_user;
                `
            , function (error, results) {
                if(error) {false;}  
                    
                res.render("user",{ 
                    success: true, 
                    message: 'Berhasil ambil data!',
                    datas : results
                });
            
            });
            
            connection.release();
        })
    },

    getDataUserSearch(req,res){
        let username = req.query.username;
        pool.getConnection(function(err, connection) {
            if (err) throw err;
            
            connection.query(
               `SELECT user_id,username,nomer_hp FROM tbl_user WHERE username LIKE '%${username}%'`
            , function (error, results) {
                if(error) {false;}  
                    
                res.render("user",{ 
                    datas : results
                });
            
            });
            
            connection.release();
        })
    },
    

    getDataUserCount(req,res){
        pool.getConnection(function(err, connection) {
            if (err) throw err;
            
            connection.query(
                `
                SELECT COUNT(*) FROM tbl_user;
                `
            , function (error, results) {
                if(error) {false;}  
                    
                res.render("admin",{ 
                    results : results
                });
            
            });
            
            connection.release();
        })
    },

    getDataUserCetak(req,res){
        pool.getConnection(function(err, connection) {
            if (err) throw err;
            
            connection.query(
                `
                SELECT user_id,username,nomer_hp FROM tbl_user;
                `
            , function (error, results) {
                if(error) {false;}  
                    
                res.render("user-cetak",{ 
                    success: true, 
                    message: 'Berhasil ambil data!',
                    data : results
                });
            
            });
            
            connection.release();
        })
    },

    getDataUserByID(req,res){
        let userId = req.params.user_id;
        pool.getConnection(function(err, connection) {
            if (err) throw err;
            connection.query(
                `
                SELECT user_id, username, nomer_hp FROM tbl_user WHERE user_id = ?;
                `
            , [userId],
            function (error, results) {
                if(error) throw error;  
                res.render('edit-user',{ 
                    data:results[0]
                });
                
            });
            
            connection.release();
        })
    },

    editDataUser(req,res){
       let dataEdit = {
            username : req.body.username,
            nomer_hp : req.body.nomer_hp
        }
        let userId = req.params.user_id
        pool.getConnection(function(err, connection) {
            if (err) throw err;
            connection.query(
               `
                UPDATE tbl_user SET ? WHERE user_id =?;
                `
            , [dataEdit,userId],
            function(error, results) {
                if(error) throw error;  
                res.redirect('/user');
            });
            connection.release();
        })
    },

    deleteDataUser(req,res){
        let user_id = req.params.user_id
        pool.getConnection(function(err, connection) {
            if (err) throw err;
            connection.query(
                `DELETE FROM tbl_user WHERE user_id = "`+user_id+'"',
            function (error, results) {
                if(error) throw error;
                res.redirect('/user');
            });
            connection.release();
        })
    }
}