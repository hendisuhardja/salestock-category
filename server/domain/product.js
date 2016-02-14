'use strict';

var _ = require('lodash');

var Product = function(productData) {
    if (productData) {
        _.extend(this, productData);
    }
};

module.exports = Product;
