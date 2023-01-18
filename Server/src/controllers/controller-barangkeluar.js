const config = require('../configs/database');
const mysql = require('mysql');
const pool = mysql.createPool(config);

pool.on('error',(err)=> {
    console.error(err);
});

module.exports ={
    // Ambil data semua produk
    getDataBarangKeluar(req,res){
        pool.getConnection(function(err, connection) {
            if (err) throw err;
            connection.query(
                `
                SELECT id_keluar,nama_produk,tgl_keluar,stok_keluar FROM tbl_barang_keluar;
                `
            , function (error, results) {
                if(error) throw error;  
                res.render('barang_keluar',{ 
                    success: true, 
                    message: 'Berhasil ambil data!',
                    datas: results 
                });
            });
            connection.release();
        })
    },

    
     getDataProdukKeluarSearch(req,res){
        let nama_produk = req.query.nama_produk;
        pool.getConnection(function(err, connection) {
            if (err) throw err;
            
            connection.query(
               `SELECT * FROM tbl_barang_keluar WHERE nama_produk LIKE '%${nama_produk}%'`
            , function (error, results) {
                if(error) {false;}  
                    
                res.render("barang_keluar",{ 
                    datas : results
                });
            
            });
            
            connection.release();
        })
    },

    getDataBarangKeluarCetak(req,res){
        pool.getConnection(function(err, connection) {
            if (err) throw err;
            connection.query(
                `
                SELECT id_keluar,nama_produk,tgl_keluar,stok_keluar FROM tbl_barang_keluar;
                `
            , function (error, results) {
                if(error) throw error;  
                res.render('cetak-barang-keluar',{ 
                    success: true, 
                    message: 'Berhasil ambil data!',
                    datas: results 
                });
            });
            connection.release();
        })
    },
    // Ambil data produk berdasarkan ID
    getDataBarangKeluarByID(req,res){
        let id_keluar = req.params.id_keluar;
        pool.getConnection(function(err, connection) {
            if (err) throw err;
            connection.query(
                `
                SELECT nama_produk,tgl_keluar,stok_keluar FROM tbl_barang_keluar WHERE id_keluar = ?;
                `
            , [id_keluar],
            function (error, results) {
                if(error) throw error;  
                res.render('edit-data-keluar',{
                    data: results[0]
                });
            });
            connection.release();
        })
    },
    addDataBarangKeluarID(req,res){
        res.render('add-barang-keluar', {
        title: "Welcome to Socka | Add a new player"
    });
    },
    // Simpan data produk
    addDataBarangKeluar(req,res){
        let data = {
            nama_produk : req.body.nama_produk,
            tgl_keluar : req.body.tgl_keluar,
            stok_keluar: req.body.stok_keluar
        }
        pool.getConnection(function(err, connection) {
            if (err) throw err;
            connection.query(
                `
                INSERT INTO tbl_barang_keluar SET ?;
                `
            , [data],
            function (error, results) {
                if(error) throw error;  
                res.redirect('/barang_keluar')
            });
            connection.release();
        })
    },
    
    // Update data Produk
    editDataBarangKeluar(req,res){
        let dataEdit = {
            nama_produk : req.body.nama_produk,
            tgl_keluar : req.body.tgl_keluar,
            stok_keluar: req.body.stok_keluar
        }
        let id_keluar = req.params.id_keluar
        pool.getConnection(function(err, connection) {
            if (err) throw err;
            connection.query(
                `
                UPDATE tbl_barang_keluar SET ? WHERE id_keluar = ?;
                `
            , [dataEdit, id_keluar],
            function (error, results) {
                if(error) throw error;  
                res.redirect('/barang_keluar');
            });
            connection.release();
        })
    },
    // Delete data produk
    deleteDataBarangKeluar(req,res){
        let id_keluar = req.params.id_keluar
        pool.getConnection(function(err, connection) {
            if (err) throw err;
            connection.query(
                `
                DELETE FROM tbl_barang_keluar WHERE id_keluar = ?;
                `
            , [id_keluar],
            function (error, results) {
                if(error) throw error;  
                res.redirect('/barang_keluar');
            });
            connection.release();
        })
    }
}