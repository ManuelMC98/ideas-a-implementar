const path = require('path');
const fs = require('fs/promises');

const fileReader = {
    productsFilePath: path.join(__dirname, '../data/products.json'),

    readJsonFile: async function () {
        try {
            const fileContent = await fs.readFile(this.productsFilePath, 'utf-8');
            return JSON.parse(fileContent);
        } catch (error) {
            console.error('Error reading JSON file:', error);
            throw error;
        }
    },

    writeJsonFile: async function (data) {
        try {
            await fs.writeFile(this.productsFilePath, JSON.stringify(data, null, 2), 'utf-8');
        } catch (error) {
            console.error('Error writing JSON file:', error);
            throw error;
        }
    },

    // Puedes agregar otras funciones aquí

    // Resto del código
};

module.exports = fileReader;
