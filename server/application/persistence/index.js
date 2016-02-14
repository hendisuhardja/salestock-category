'use strict';

var db = require('./db');

module.exports = {
    knex: db.knex,
    destroyConnectionPool: db.destroyConnectionPool,
    errors: require('./../../infrastructure/errors'),
    productRepository: require('./product.repository'),
    categoryRepository: require('./category.repository')
};
