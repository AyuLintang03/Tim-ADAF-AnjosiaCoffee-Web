const router = require('express').Router();
const  user  = require('../controllers').user;
const  produk  = require('../controllers').produk;
const  barangkeluar  = require('../controllers').barangkeluar;
const  barangmasuk  = require('../controllers').barangmasuk;

router.get('/user-cetak',user.getDataUserCetak);

router.get('/cetak-barang',produk.getDataProdukCetak);

router.get('/cetak-barang-keluar',barangkeluar.getDataBarangKeluarCetak);

router.get('/cetak-barang-masuk',barangmasuk.getDataBarangMasukCetak);

module.exports = router;