const router = require('express').Router();
const cetakController = require('../controllers').cetak;

router.get('/cetak', cetakController.cetak);
module.exports = router;