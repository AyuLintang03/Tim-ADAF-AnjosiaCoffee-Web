const router = require('express').Router();
const verifyUser = require('../configs/verify');
const lindexController = require('../controllers').lindex;
const  produk  = require('../controllers').produk;

router.get('/', verifyUser.isLogout, lindexController.lindex);
router.get('/produk', produk.getDataProduk)

module.exports = router;