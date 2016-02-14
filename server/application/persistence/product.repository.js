'use strict';

module.exports = {
    
    createProduct: createProduct,
    updateProduct: updateProduct,
    getProduct: getProduct,
    getProducts: getProducts,
    deleteProduct: deleteProduct
};

var knex = require('./db').knex;
var joinjs = require('join-js');
var resultMaps = require('./resultmaps');
var Product = require('../../domain').Product;

/**
 * Creates a new product and inserts it in to the database.
 * @param {Object} productData minus the id
 * @return {Promise} A Promise that returns the inserted product (including the id)
 */
function createProduct(productData) {

    var product =  new Object();;
    product.name = productData.name;
    product.description = productData.description;
    product.price = productData.price;
    
    

    return knex('product')
        .returning('id')
        .insert(product)
        .then(function(ids) {
            product.id = ids[0];
            var catString = productData.categories;
            var array = catString.split(',').map(Number);
            for(var i = 0;i < array.length;i++){
                var productCat =  new Object();;
                productCat.product_id = product.id;
                productCat.category_id = array[i];
                knex('product_category')
                .insert(productCat)
                .then(function(ids){
                    return ids[0];
                });
            }
            return product;
        });
}

/**
 * Updates an existing product.
 * @param {Object} productData including the id
 * @return {Promise} A Promise that returns the updated product (including the id)
 */
function updateProduct(productData) {

    var product = new Product(productData);

    return knex('product')
        .where('id', product.id)
        .update(product)
        .then(function() {
            return product;
        });
}

/**
 * Gets an existing product.
 * @param {integer} id
 * @return {Promise} A promise that returns the desired product.
 */
function getProduct(id) {
    return knex
        .select('id', 'name')
        .from('product')
        .where('id', id)

        .then(function(resultSet) {
            return joinjs.mapOne(resultSet, resultMaps, 'productMap');
        });
}

/**
 * Gets all products.
 * @return {Promise} A promise that returns an array of all products.
 */
function getProducts() {
    return knex
        .select(
        'product.id as product_id',
        'product.name as product_name',
        'product.description as product_description',
        'product.price as product_price',
        'category.id As category_id',
        'category.name As category_name')
        .from('product')
        .leftOuterJoin('product_category', 'product.id', 'product_category.product_id')
        .leftOuterJoin('category', 'product_category.category_id', 'category.id')

        .then(function(resultSet) {
            return joinjs.map(resultSet, resultMaps, 'productMap', 'product_');
        });
        
        
}

/**
 * Deletes an product.
 * @param {integer} id
 * @return {Promise} A promise that gets fulfilled when the product is deleted.
 */
function deleteProduct(id) {
    return knex('product')
        .where('id', id)
        .delete();
}
