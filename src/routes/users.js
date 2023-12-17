// usersRoutes.js
const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const methodOverride = require('method-override');
const { loginValidator } = require('../middlewares/userValidator');
const authMiddleware = require('../middlewares/authMiddleware');
const usersController = require('../controllers/usersController');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, '../public/images/users'));
    },
    filename: function (req, file, cb) {
        const ext = path.extname(file.originalname);
        const filename = `${Date.now()}-user${ext}`;
        cb(null, filename);
    },
});

const upload = multer({ storage });

// Rutas para el registro de usuarios
router.get('/register', usersController.register);
router.post('/register', upload.single('avatar'), usersController.store);

// Rutas para el inicio de sesión
router.get('/login', usersController.login);
router.post('/login', loginValidator, usersController.processLogin);

// Rutas accesibles solo con login
router.get('/con-login', authMiddleware, (req, res) => {
    res.send('Ruta con login');
});

// Ruta para manejar errores
router.get('/error', usersController.errorcontroller);

module.exports = router;

