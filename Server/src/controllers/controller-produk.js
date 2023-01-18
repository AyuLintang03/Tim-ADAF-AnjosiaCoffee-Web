const config = require('../configs/database');
const mysql = require('mysql');
const pool = mysql.createPool(config);

pool.on('error',(err)=> {
    console.error(err);
});

module.exports ={
    // Ambil data semua produk
    getDataProduk(req,res){
        pool.getConnection(function(err, connection) {
            if (err) throw err;
            connection.query(
                `
                SELECT * FROM tbl_produk;
                `
            , function (error, results) {
                if(error) throw error;  
                res.render('produk',{ 
                    success: true, 
                    message: 'Berhasil ambil data!',
                    datas: results 
                });
            });
            connection.release();
        })
    },

       getDataProdukSearch(req,res){
        let nama_produk = req.query.nama_produk;
        pool.getConnection(function(err, connection) {
            if (err) throw err;
            
            connection.query(
               `SELECT * FROM tbl_produk WHERE nama_produk LIKE '%${nama_produk}%'`
            , function (error, results) {
                if(error) {false;}  
                    
                res.render("produk",{ 
                    datas : results
                });
            
            });
            
            connection.release();
        })
    },

    
    getDataProdukCetak(req,res){
        pool.getConnection(function(err, connection) {
            if (err) throw err;
            connection.query(
                `
                SELECT id_produk,jenis_kopi,nama_produk,harga,stok FROM tbl_produk;
                `
            , function (error, results) {
                if(error) throw error;  
                res.render('cetak-barang',{ 
                    datas: results 
                });
            });
            connection.release();
        })
    },
    // Ambil data produk berdasarkan ID
    getDataProdukID(req,res){
        let id_produk = req.params.id_produk;
        pool.getConnection(function(err, connection) {
            if (err) throw err;
            connection.query(
                `
                SELECT jenis_kopi, nama_produk,harga,stok FROM tbl_produk WHERE id_produk = ?;
                `
            , [id_produk],
            function (error, results) {
                if(error) throw error;  
                 res.render('edit-produk.ejs',{ 
                    data:results[0]
                });
            });
            connection.release();
        })
    },

    
    // Update data User
    editDataProduk(req,res){
       let dataEdit = {
        jenis_kopi : req.body.jeniskopi,
        nama_produk : req.body.namaproduk,
        harga : req.body.harga,
        stok : req.body.stok
        }
        let id_produk = req.params.id_produk
        pool.getConnection(function(err, connection) {
            if (err) throw err;
            connection.query(
               `
                UPDATE tbl_produk SET ? WHERE id_produk =?;
                `
            , [dataEdit,id_produk],
            function(error, results) {
                if(error) throw error;  
                res.redirect('/produk');
            });
            connection.release();
        })
    },


    addDataProdukID(req,res){
        res.render('add-produk.ejs', {
        title: "Welcome to Socka | Add a new player",
    });
    },
    
    // Simpan data produk
    addDataProduk(req,res){
        let jenis_kopi = req.body.jeniskopi;
        let nama_produk = req.body.namaproduk;
        let harga = req.body.harga;
        let stok = req.body.stok;
            pool.getConnection(function(err, connection) {
                if (err) throw err;
                connection.query(
                    `INSERT INTO tbl_produk (jenis_kopi,nama_produk,harga,stok) VALUES (?,?,?,?);`
                , [jenis_kopi, nama_produk, harga, stok],function (error, results) {
                    if (error) throw error; 
                    res.redirect('/produk');
                });
                connection.release();
            })
    },
    // Delete data produk
     deleteDataProduk(req,res){
        let id_produk = req.params.id_produk
        pool.getConnection(function(err, connection) {
            if (err) throw err;
            connection.query(
                `DELETE FROM tbl_produk WHERE id_produk = "`+id_produk+'"',
            function (error, results) {
                if(error) throw error;
                res.redirect('/produk');
            });
            connection.release();
        })
    }
}