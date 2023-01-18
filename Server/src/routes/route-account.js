const router = require('express').Router();
const  user  = require('../controllers').user;
// GET localhost:5050/user => Ambil data semua User
router.get('/', user.getDataUser);
router.get('/search', user.getDataUserSearch);
router.get('/count', user.getDataUserCount);

module.exports = router;