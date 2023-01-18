const router = require('express').Router();
const  produk  = require('../controllers').produk;


router.post('/produk/edit/:id_produk', produk.editDataProduk);
router.get('/produk/edit/:id_produk', produk.getDataProdukID);

// POST localhost:5050/produk/add => Tambah data produk ke database
router.post('/produk/add', produk.addDataProduk);
router.get('/produk/add', produk.addDataProdukID);

// POST localhost:5050/user/edit => Edit data User

// POST localhost:5050/user/delete => Delete data User
router.get('/produk/delete/:id_produk', produk.deleteDataProduk);


module.exports = router;