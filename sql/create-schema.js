'use strict';

var dbConfig = {
    client: 'postgresql',
    debug: true,
    connection: {
        host: 'localhost',
        user: '',
        password: '123456sa',
        database: 'salestock',
        charset: 'utf8'
    }
};

var knex = require('knex')(dbConfig);

knex.schema

    /***** Drop foreign keys *****/

    .table('product_category', function(table) {
        table.dropForeign('product_id');
    })

    .table('product_category', function(table) {
        table.dropForeign('category_id');
    })

    .table('category_sub', function(table) {
        table.dropForeign('category_id');
    })
    
    .table('category_sub', function(table) {
        table.dropForeign('parent_category_id');
    })
    
    /***** Drop tables *****/
    .dropTableIfExists('category')
    .dropTableIfExists('product')
    .dropTableIfExists('product_category')
    .dropTableIfExists('category_sub')


    /***** Create tables (in alphabetic order) *****/
    // Category
    .createTable('category', function(table) {
        table.increments('id').primary() ;
        table.string('name', 64).notNullable().unique();
    })


    // Product
    .createTable('product', function(table) {
        table.increments('id').primary() 
        table.string('name', 64).notNullable().unique();
        table.string('description', 64).notNullable();
        table.decimal('price', 7, 2).unsigned().notNullable();
    })
    
    // Product Category
    .createTable('product_category', function(table) {
    })
    
    // Sub Category
    .createTable('category_sub', function(table) {
    })

    /***** Add foreign keys *****/
    .table('category_sub', function(table) {
        table.integer('category_id').unsigned().notNullable().references('category.id');
        table.integer('parent_category_id').unsigned().notNullable().references('category.id');
    })

    .table('product_category', function(table) {
        table.integer('product_id').unsigned().notNullable().references('product.id');
        table.integer('category_id').unsigned().notNullable().references('category.id');
    })

    /***** Destroy the database connection pool *****/
    .then(function() {
        knex.destroy();
    })


    // Finally, add a .catch handler for the promise chain
    .catch(function(e) {
        console.error(e);
    });
