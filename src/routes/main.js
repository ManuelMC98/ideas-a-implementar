const express = require('express');
const router = express.Router();

const mainController = require('../controllers/mainController.js');

// Rutas para home, contact y about us
router.get('/', mainController.home);

module.exports = router;
