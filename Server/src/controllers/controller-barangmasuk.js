const config = require('../configs/database');
const mysql = require('mysql');
const pool = mysql.createPool(config);

pool.on('error',(err)=> {
    console.error(err);
});

module.exports ={
    // Ambil data semua produk
    getDataBarangMasuk(req,res){
        pool.getConnection(function(err, connection) {
            if (err) throw err;
            connection.query(
                `
                SELECT id_masuk,nama_produk,tgl_masuk,stok_masuk FROM tbl_barang_masuk;
                `
            , function (error, results) {
                if(error) throw error;  
                res.render('barang_masuk',{ 
                    success: true, 
                    message: 'Berhasil ambil data!',
                    datas: results 
                });
            });
            connection.release();
        })
    },

     getDataProdukMasukSearch(req,res){
        let nama_produk = req.query.nama_produk;
        pool.getConnection(function(err, connection) {
            if (err) throw err;
            
            connection.query(
               `SELECT * FROM tbl_barang_masuk WHERE nama_produk LIKE '%${nama_produk}%'`
            , function (error, results) {
                if(error) {false;}  
                    
                res.render("barang_masuk",{ 
                    datas : results
                });
            
            });
            
            connection.release();
        })
    },


    getDataBarangMasukCetak(req,res){
        pool.getConnection(function(err, connection) {
            if (err) throw err;
            connection.query(
                `
                SELECT id_masuk,nama_produk,tgl_masuk,stok_masuk FROM tbl_barang_masuk;
                `
            , function (error, results) {
                if(error) throw error;  
                res.render('cetak-barang-masuk',{ 
                    success: true, 
                    datas: results 
                });
            });
            connection.release();
        })
    },
    // Ambil data produk berdasarkan ID
    getDataBarangMasukByID(req,res){
        let id_masuk = req.params.id_masuk;
        pool.getConnection(function(err, connection) {
            if (err) throw err;
            connection.query(
                `
                SELECT nama_produk, tgl_masuk, stok_masuk FROM tbl_barang_masuk WHERE id_masuk = ?;
                `
            , [id_masuk],
            function (error, results) {
                if(error) throw error;  
                res.render('edit-data-masuk',{ 
                    data: results[0]
                });
            });
            connection.release();
        })
    },

    addDataBarangMasukID(req,res){
        res.render('add-barang-masuk.ejs', {
        title: "Welcome to Socka | Add a new player",
    });
    },
    // Simpan data produk
    addDataBarangMasuk(req,res){
        let data = {
            nama_produk : req.body.nama_produk,
            tgl_masuk : req.body.tgl_masuk,
            stok_masuk: req.body.stok_masuk
        }
        pool.getConnection(function(err, connection) {
            if (err) throw err;
            connection.query(
                `
                INSERT INTO tbl_barang_masuk SET ?;
                `
            , [data],
            function (error, results) {
                if(error) throw error; 
                res.redirect('/barang_masuk');
            });
            connection.release();
        })
    },
    // Update data Produk
    editDataBarangMasuk(req,res){
        let dataEdit = {
            nama_produk : req.body.nama_produk,
            tgl_masuk : req.body.tgl_masuk,
            stok_masuk: req.body.stok_masuk
        }
        let id_masuk = req.params.id_masuk
        pool.getConnection(function(err, connection) {
            if (err) throw err;
            connection.query(
                `
                UPDATE tbl_barang_masuk SET ? WHERE id_masuk = ?;
                `
            , [dataEdit, id_masuk],
            function (error, results) {
                if(error) throw error;  
                res.redirect('/barang_masuk')
            });
            connection.release();
        })
    },
    // Delete data produk
    deleteDataBarangMasuk(req,res){
        let id_masuk = req.params.id_masuk
        pool.getConnection(function(err, connection) {
            if (err) throw err;
            connection.query(
                `
                DELETE FROM tbl_barang_masuk WHERE id_masuk = ?;
                `
            , [id_masuk],
            function (error, results) {
                if(error) throw error;  
                res.redirect('/barang_masuk')
            });
            connection.release();
        })
    }
}