const fs = require('fs');
const path = require('path');
const fileReader = require('../utils/fileReader');
const userFilePath = fileReader.userFilePath;
const bcrypt = require('bcrypt');
const { validationResult } = require('express-validator');

const usersController = {

    store: async (req, res) => {
        try {
            const users = await fileReader.readJsonFile(userFilePath);

            // Verifica si el usuario ya existe por su nombre de usuario
            const existingUser = users.find((user) => user.username === req.body.username);
            if (existingUser) {
                return res.status(400).send('El nombre de usuario ya está en uso. Elija otro.');
            }

            let hashedPassword = req.body.password;
            if (!req.body.password.startsWith('$2b$')) {
                // Si la contraseña no está en formato de hash bcrypt, haz el hash
                hashedPassword = bcrypt.hashSync(req.body.password, 10);
            }

            const newUser = {
                id: users.length > 0 ? users[users.length - 1].id + 1 : 1,
                ...req.body,
                password: hashedPassword,
                image: req.file?.filename || "default-image.png"
            };

            users.push(newUser);
            await fileReader.writeJsonFile(userFilePath, users);
            res.redirect('/');
        } catch (error) {
            console.error('Error reading/writing users file:', error);
            res.status(500).send('Internal Server Error');
        }
    },

    processLogin: async (req, res) => {
        try {
            const users = await fileReader.readJsonFile(userFilePath);
            const { user1, password } = req.body;
            const userFound = users.find((user) => user.username === user1);

            if (!userFound) {
                return res.status(404).send({ message: "Usuario no encontrado" });
            }

            // Compara la contraseña proporcionada con el hash almacenado
            if (!bcrypt.compareSync(password, userFound.password)) {
                return res.status(500).send({ message: "Contraseña incorrecta" });
            }

            req.session.usuarioLogueado = userFound;

            if (req.body.recordame !== undefined) {
                res.cookie('recordame', userFound.email, { maxAge: 6000 });
            }

            return res.redirect('/');
        } catch (error) {
            console.error('Error reading users file:', error);
            res.status(500).send('Internal Server Error');
        }
    },

    
};

module.exports = usersController;