const productService = require('../services/productService');
const { setCache,clearCache } = require('../middleware/cacheMiddleware');
async function getProducts(req, res) {
 try {
        const products =
            await productService.getProducts();

        setCache(req.originalUrl, products);
        res.json(products);

    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'Internal server error'
        });
    }
}
async function getProductById(req, res) {
    try {
        const id = Number(req.params.id);

        const product =
            await productService.getProductById(id);
        if (!product) {
            return res.status(404).json({
                message: 'Product not found'
            });
        }
        setCache(req.originalUrl, product);

        res.json(product);
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'Internal server error'
        });
    }
}
async function createProduct(req, res) {
try {
        const product =
            await productService.createProduct(req.body);
        clearCache();
        res.status(201).json(product);
    } catch (err) {
        console.log(err);

        res.status(500).json({
            message: 'Internal server error'
        });
    }
}
async function updateProduct(req, res) {
    try {
        const id = Number(req.params.id);
        const product =
            await productService.updateProduct(
                id,
                req.body
            );

        if (!product) {

            return res.status(404).json({
                message: 'Product not found'
            });
        }
        clearCache();

        res.json(product);

    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'Internal server error'
        });
    }
}
async function patchProduct(req, res) {
    try {
        const id = Number(req.params.id);
        const product =
            await productService.patchProduct(
                id,
                req.body
            );
        if (!product) {
            return res.status(404).json({
                message: 'Product not found'
            });
        }
        clearCache();
        res.json(product);
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'Internal server error'
        });
    }
}
async function deleteProduct(req, res) {
    try {
        const id = Number(req.params.id);
        const product =
            await productService.deleteProduct(id);
        if (!product) {
            return res.status(404).json({
                message: 'Product not found'
            });
        }
        clearCache();
        res.json(product);
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'Internal server error'
        });
    }
}
module.exports = { getProducts, getProductById, createProduct, updateProduct, patchProduct, deleteProduct };