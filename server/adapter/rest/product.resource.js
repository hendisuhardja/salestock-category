'use strict';

module.exports = {
    addRoutes: addRoutes
};

/**
 * Adds routes to the api.
 */
function addRoutes(api) {
    api.post('/products', createProduct);
    api.put('/products/:id', updateProduct);
    api.get('/products/:id', getProduct);
    api.get('/products', getProducts);
    api.delete('/products/:id', deleteProduct);
}

var infrastructure = require('../../infrastructure');
var log = infrastructure.logger;
var errors = infrastructure.errors;

var productService = require('../../application').productService;
var categoryService = require('../../application').categoryService;

/**
 * Creates a new product and inserts it in to the database.
 * @param {Object} req - req.body contains productData minus the id
 * @param {Object} res - res.body contains the inserted product (including the id)
 */
function createProduct(req, res) {

    var productData = req.body;
    
    if(productData.name == undefined)
    {
        res.status(422).send({'message': "Name is required"});
    }
    else if(productData.description == undefined)
    {
        res.status(422).send({'message': "Description is required"});
    }
    else if(productData.price == undefined)
    {
        res.status(422).send({'message': "Price is required"});
    }
    else if(productData.categories == undefined)
    {
        res.status(422).send({'message': "Categories is required"});
    }
     var catString = productData.categories;
    var array = catString.split(',').map(Number);
    var success = true;
    for(var i = 0;i < array.length;i++){
       var c = categoryService.getCategoryCount(array[i]).then(function(value){
           if(value[0].count <= 0)
            success = false;
            
           
            if(success && i == array.length ){
             productService.createProduct(productData)
                .then(function(product) {
                    res.send(product);
                })
                .catch(function(error) {
                    log.error(error);
                    res.status(500).send({'message': error.toString()});
                });
            }
            else {
                 res.status(404).send({'message': 'Category does not exist'});
                
            }
       });
       
    }
}

/**
 * Updates an existing product.
 * @param {Object} req - req.body contains productData including the id
 * @param {Object} res - res.body contains the updated product (including the id)
 */
function updateProduct(req, res) {

    var productData = req.body;

    productService.updateProduct(productData)
        .then(function(product) {
            res.send(product);
        })
        .catch(function(error) {
            log.error(error);
            res.status(500).send({'message': error.toString()});
        });
}

/**
 * Gets an existing product.
 * @param {Object} req - req.params.id contains id of the product to get
 * @param {Object} res - res.body contains the requested product
 */
function getProduct(req, res) {

    var id = req.params.id;

    productService.getProduct(id)
        .then(function(product) {
            res.send(product);
        })
        .catch(errors.NotFoundError, function() {
            res.status(404).send({'message': 'Product ' + id + ' does not exist'});
        })
        .catch(function(error) {
            log.error(error);
            res.status(500).send({'message': error.toString()});
        });
}

/**
 * Gets all products.
 * @param {Object} req - no used
 * @param {Object} res - res.body contains an array of all products
 */
function getProducts(req, res) {
    productService.getProducts()
        .then(function(products) {
            res.send(products);
        })
        .catch(function(error) {
            log.error(error);
            res.status(500).send({'message': error.toString()});
        });
}

/**
 * Deletes an product.
 * @param {Object} req - req.params.id contains id of the product to delete
 * @param {Object} res - res.body contains no content
 */
function deleteProduct(req, res) {

    var id = req.params.id;

    productService.deleteProduct(id)
        .then(function() {
            res.status(204).send();  // No Content
        })
        .catch(function(error) {
            log.error(error);
            res.status(500).send({'message': error.toString()});
        });
}
