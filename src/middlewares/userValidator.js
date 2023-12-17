const { body } = require('express-validator');

const loginValidator = [
    body('user1').notEmpty().withMessage('El nombre de usuario no puede estar vacío'),
    body('password').notEmpty().withMessage('La contraseña no puede estar vacía')
];

module.exports = { loginValidator };