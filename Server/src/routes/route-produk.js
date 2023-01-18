const router = require('express').Router();
const  produk  = require('../controllers').produk;

// GET localhost:5050/barang => Ambil data semua User
router.get('/', produk.getDataProduk);
router.get('/search', produk.getDataProdukSearch);
module.exports = router;