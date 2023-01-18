const router = require('express').Router();
const  barangkeluar  = require('../controllers').barangkeluar;

// GET localhost:5050/user => Ambil data semua User
router.get('/', barangkeluar.getDataBarangKeluar);

// GET localhost:5050/user/2 => Ambil data semua User berdasarkan id = 2
router.get('/edit/:id_keluar', barangkeluar.getDataBarangKeluarByID);


// POST localhost:5050/barang_keluar/add => Tambah data produk ke database
router.get('/add', barangkeluar.addDataBarangKeluarID);
router.post('/add', barangkeluar.addDataBarangKeluar);

// POST localhost:5050/user/edit => Edit data User
router.post('/edit/:id_keluar', barangkeluar.editDataBarangKeluar);

// POST localhost:5050/user/delete => Delete data User
router.get('/delete/:id_keluar', barangkeluar.deleteDataBarangKeluar);

router.get('/search', barangkeluar.getDataProdukKeluarSearch);

module.exports = router;