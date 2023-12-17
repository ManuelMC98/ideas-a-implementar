const fs = require('fs');
const path = require('path');
const fileReader = require('../utils/fileReader');

const productsFilePath = fileReader.productsFilePath;

const productsController = {
    productDetail: async (req, res) => {
        try {
            const products = await fileReader.readJsonFile(productsFilePath);
            const product = products.find((product) => product.id == req.params.id);
            res.render('productDetail', { product });
        } catch (error) {
            console.error('Error reading products file:', error);
            res.status(500).send('Internal Server Error');
        }
    },

    productCreate: (req, res) => {
        res.render('productCreate');
    },

    store: async (req, res) => {
        try {
            const products = await fileReader.readJsonFile(productsFilePath);
            const newProduct = {
                id: products[products.length - 1].id + 1,
                ...req.body,
                image: req.file?.filename || "default-image.png"
            };
            products.push(newProduct);
            await fileReader.writeJsonFile(productsFilePath, products);
            res.redirect('/products');
        } catch (error) {
            console.error('Error reading/writing products file:', error);
            res.status(500).send('Internal Server Error');
        }
    },

    productCart: (req, res) => {
        res.render('productCart');
    },

    productEdit: async (req, res) => {
        try {
            const products = await fileReader.readJsonFile(productsFilePath);
            const product = products.find((product) => product.id == req.params.id);
            res.render('productEdit', { productToEdit: product });
        } catch (error) {
            console.error('Error reading products file:', error);
            res.status(500).send('Internal Server Error');
        }
    },

    update: async (req, res) => {
        try {
            const products = await fileReader.readJsonFile(productsFilePath);
            const indexProduct = products.findIndex((product) => product.id == req.params.id);
            products[indexProduct] = {
                ...products[indexProduct],
                ...req.body
            };
            await fileReader.writeJsonFile(productsFilePath, products);
            res.redirect('/products');
        } catch (error) {
            console.error('Error reading/writing products file:', error);
            res.status(500).send('Internal Server Error');
        }
    },

    destroy: async (req, res) => {
        try {
            const products = await fileReader.readJsonFile(productsFilePath);
            const indexProduct = products.findIndex((product) => product.id == req.params.id);
            products.splice(indexProduct, 1);
            await fileReader.writeJsonFile(productsFilePath, products);
            res.redirect('/products');
        } catch (error) {
            console.error('Error reading/writing products file:', error);
            res.status(500).send('Internal Server Error');
        }
    },

    productsList: async (req, res) => {
        try {
            const products = await fileReader.readJsonFile(productsFilePath);
            res.render('productList', { products });
        } catch (error) {
            console.error('Error reading products file:', error);
            res.status(500).send('Internal Server Error');
        }
    }
};

module.exports = productsController;
