// authMiddleware.js
const fs = require('fs');

const authMiddleware = (req, res, next) => {
    // Verificar si el usuario está autenticado
    if (req.session.usuarioLogueado) {
        // Si está autenticado, verificar el tipo de usuario
        const userType = req.session.usuarioLogueado.userType; // Asume que tienes userType en tu sesión

        // Puedes ajustar esta lógica según tus necesidades
        if (userType === 'cliente' || userType === 'administrador') {
            next(); // Si es cliente o administrador, continuar con la siguiente ruta
        } else {
            res.status(403).send('Acceso prohibido'); // Si no es cliente ni administrador, acceso prohibido
        }
    } else {
        // Si no está autenticado, redirigir al login
        res.redirect('/users/login');
    }
};

module.exports = authMiddleware;
