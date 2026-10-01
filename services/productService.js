const { readData, writeData } = require('../database/productDatabase');
async function getProducts() {
    return await readData();
}
async function getProductById(id) {
    const products = await readData();
    return products.find(
        (product) => product.id === id
    );
}
async function createProduct(productData) {
    const products = await readData();
    const newId =
        products.length > 0
            ? Math.max(...products.map(product => product.id)) + 1
            : 1;
    const newProduct = {
        id: newId,
        ...productData
    };
    products.push(newProduct);
    await writeData(products);
    return newProduct;
}
async function updateProduct(id, productData) {
    const products = await readData();
    const index = products.findIndex(
        (product) => product.id === id
    );
    if (index === -1) {
        return null;
    }
    products[index] = {
        ...products[index],
        ...productData,
        id: id
    };
    await writeData(products);
    return products[index];
}
async function patchProduct(id, productData) {
    const products = await readData();

    const index = products.findIndex(
        (product) => product.id === id
    );
    if (index === -1) {
        return null;
    }
    products[index] = {
        ...products[index],
        ...productData,
        id: id
    };
    await writeData(products);
    return products[index];
}
async function deleteProduct(id) {
    const products = await readData();

    const index = products.findIndex(
        (product) => product.id === id
    );

    if (index === -1) {
        return null;
    }
    const deletedProduct = products[index];
    products.splice(index, 1);
    await writeData(products);
    return deletedProduct;
}
module.exports = {getProducts, getProductById, createProduct, updateProduct, patchProduct, deleteProduct};