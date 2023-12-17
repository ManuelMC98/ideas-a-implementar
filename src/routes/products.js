const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, '../public/images/products'));
    },
    filename: function (req, file, cb) {
        const ext = path.extname(file.originalname);
        const filename = `${Date.now()}-product${ext}`;
        cb(null, filename);
    }
});

const upload = multer({ storage });

const productsController = require('../controllers/productsController');

// Rutas para listado de productos
router.get('/', productsController.productsList);

// Rutas para crear un nuevo producto
router.get('/create', productsController.productCreate);
router.post('/create', upload.single('image'), productsController.store);

// Rutas para ver detalles de un producto
router.get('/detail/:id', productsController.productDetail);

// Rutas para gestionar el carrito de compras
router.get('/cart', productsController.productCart);

// Rutas para editar un producto
router.get('/:id/edit', productsController.productEdit);
router.put('/:id/edit', productsController.update);

// Rutas para eliminar un producto
router.delete('/:id/delete', productsController.destroy);

module.exports = router;
