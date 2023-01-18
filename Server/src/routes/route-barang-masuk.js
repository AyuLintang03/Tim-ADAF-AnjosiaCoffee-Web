const router = require('express').Router();
const  barangmasuk  = require('../controllers').barangmasuk;


router.get('/barang_masuk', barangmasuk.getDataBarangMasuk);

//router.get('/barang_masuk/:id', barangmasuk.getDataBarangMasukByID);

router.get('/barang_masuk/search', barangmasuk.getDataProdukMasukSearch);

router.get('/barang_masuk/add', barangmasuk.addDataBarangMasukID);
router.post('/barang_masuk/add', barangmasuk.addDataBarangMasuk);

router.get('/barang_masuk/edit/:id_masuk', barangmasuk.getDataBarangMasukByID);
router.post('/barang_masuk/edit/:id_masuk', barangmasuk.editDataBarangMasuk);

router.get('/barang_masuk/delete/:id_masuk', barangmasuk.deleteDataBarangMasuk);

module.exports = router;