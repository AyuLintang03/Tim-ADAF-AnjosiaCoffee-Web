const router = require('express').Router();
const  user  = require('../controllers').user;

// GET localhost:5050/user/2 => Ambil data semua User berdasarkan id = 2
router.get('/user/edit/:user_id', user.getDataUserByID);

// POST localhost:5050/user/edit => Edit data User
router.post('/user/edit/:user_id', user.editDataUser);

// POST localhost:5050/user/delete => Delete data User
router.get('/user/delete/:user_id', user.deleteDataUser);




module.exports = router;