const fs = require('fs');

function userRemember(req, res, next) {
    if (req.cookies.recordame && !req.session.usuarioLogueado) {
        let usersJSON;
        try {
            usersJSON = fs.readFileSync('userFilePath', { encoding: 'utf-8' });
        } catch (error) {
            console.error('Error reading user file:', error);
            return res.status(500).send('Internal Server Error');
        }

        let users;
        try {
            users = JSON.parse(usersJSON) || [];
        } catch (error) {
            console.error('Error parsing user JSON:', error);
            return res.status(500).send('Internal Server Error');
        }

        const usuarioALoguearse = users.find(user => user.email === req.cookies.recordame);

        if (usuarioALoguearse) {
            req.session.usuarioLogueado = usuarioALoguearse;
        }
    }

    next();
}

module.exports = userRemember;
