'use strict';

module.exports = {
    createProduct: createProduct,
    updateProduct: updateProduct,
    getProduct: getProduct,
    getProducts: getProducts,
    deleteProduct: deleteProduct
};

var persistence = require('./persistence');
var productRepository = persistence.productRepository;

/**
 * Creates a new product and inserts it in to the database.
 * @param {Object} productData minus the id
 * @return {Product} A product that returns the inserted product (including the id)
 */
function createProduct(productData) {
    return productRepository.createProduct(productData);
}

/**
 * Updates an existing product.
 * @param {Object} productData including the id
 * @return {Promise} A promise that returns the updated product (including the id)
 */
function updateProduct(productData) {
    return productRepository.updateProduct(productData);
}

/**
 * Gets an existing product.
 * @param {integer} id
 * @return {Promise} A promise that returns the desired product.
 */
function getProduct(id) {
    return productRepository.getProduct(id);
}

/**
 * Gets all products.
 * @return {Promise} A promise that returns an array of all products.
 */
function getProducts() {
    return productRepository.getProducts();
}

/**
 * Deletes an product.
 * @param {integer} id
 * @return {Promise} A promise that gets fulfilled when the product is deleted.
 */
function deleteProduct(id) {
    return productRepository.deleteProduct(id);
}
