// Definisi Library yang digunakan
const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const path = require('path');
const flash = require('req-flash');
const app = express();
var logger = require('morgan');
// Definisi lokasi file router

const lindexRoutes = require('./Server/src/routes/router-lindex');
const loginRoutes = require('./Server/src/routes/router-login');
const registerRoutes = require('./Server/src/routes/router-register');
const appRoutes = require('./Server/src/routes/router-app');
const adminRoutes = require('./Server/src/routes/router-admin');
const userRoutes = require('./Server/src/routes/route-account');
const userAPIRoutes = require('./Server/src/routes/route-user');
const produkAPIRoutes = require('./Server/src/routes/route-produkAPI');
const produkRoutes = require('./Server/src/routes/route-produk');
const barangmasukRoutes = require('./Server/src/routes/route-barang-masuk');
const barangkeluarRoutes = require('./Server/src/routes/route-barang-keluar');
const cetakRoutes = require('./Server/src/routes/router-cetak');
const cetakuserRoutes = require('./Server/src/routes/route-account-cetak');

// Configurasi library session
app.use(session({
    resave: true,
    saveUninitialized: true,
    secret: 'monokuma',
    name: 'secretName',
    cookie: {
        sameSite: true,
        maxAge: 90000
    },
}))

// Configurasi dan gunakan library
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(flash());
app.use(logger('dev'));

app.use(function(req, res, next) {
    res.setHeader('Cache-Control', 'no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0');
    res.setHeader('Pragma', 'no-cache');
    next();
});

// Setting folder views
app.set('views',path.join(__dirname,'Client/views'));
app.set('view engine', 'ejs');


// Gunakan routes yang telah didefinisikan
app.use(express.static('Client/views'));

app.use('/login', loginRoutes);
app.use('/register', registerRoutes);
app.use('/admin',adminRoutes);
app.use('/lindex',lindexRoutes);
app.use('/user',userRoutes);
app.use('/',userAPIRoutes);
app.use('/',produkAPIRoutes);
app.use('/produk',produkRoutes);
app.use('/',cetakuserRoutes);
app.use('/',barangmasukRoutes);
app.use('/barang_keluar',barangkeluarRoutes);
app.use('/',cetakRoutes);
app.use('/', appRoutes);

// Gunakan port server
app.listen(5050, ()=>{
    console.log('Server Berjalan di Port : '+5050);
});
