const fileReader = require('../utils/fileReader');

const mainController = {
    home: async (req, res) => {
        try {
            const products = await fileReader.readJsonFile();
            const inSale = getInSaleProducts(products);
            res.render('index', { inSale });
        } catch (error) {
            console.error('Error reading products file:', error);
            res.status(500).send('Internal Server Error');
        }
    },

    // Puedes agregar otras funciones aquí

    // Resto del código
    productDetail: async (req, res) => {
        try {
            const products = await fileReader.readJsonFile();
            const product = products.find((product) => product.id == req.params.id);
            res.render('productDetail', { product });
        } catch (error) {
            console.error('Error reading products file:', error);
            res.status(500).send('Internal Server Error');
        }
    },

    // Resto del código
};

// Función para obtener los productos en oferta
function getInSaleProducts(products) {
    return products.filter((product) => product.sale === 'in-sale');
}

module.exports = mainController;
