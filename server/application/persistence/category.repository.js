'use strict';

module.exports = {
    
    createCategory: createCategory,
    updateCategory: updateCategory,
    getCategory: getCategory,
    getCategories: getCategories,
    deleteCategory: deleteCategory,
    getCategoryCount :getCategoryCount
};

var knex = require('./db').knex;
var joinjs = require('join-js');
var resultMaps = require('./resultmaps');
var Category = require('../../domain').Category;

/**
 * Creates a new category and inserts it in to the database.
 * @param {Object} categoryData minus the id
 * @return {Promise} A Promise that returns the inserted category (including the id)
 */
function createCategory(categoryData) {
    
    var category =  new Object();;
    category.name = categoryData.name;
    

    return knex('category')
        .returning('id')
        .insert(category)
        .then(function(ids) {
            category.id = ids[0];
            if(categoryData.parent_id != undefined)
            {
               
                var subCat =  new Object();;
                subCat.parent_category_id = categoryData.parent_id;
                subCat.category_id = category.id;
                knex('category_sub')
                .insert(subCat)
                .then(function(ids){
                    return ids[0];
                });
            }
            return category;
        });
    
}

/**
 * Updates an existing category.
 * @param {Object} categoryData including the id
 * @return {Promise} A Promise that returns the updated category (including the id)
 */
function updateCategory(categoryData) {

    var category = new Category(categoryData);

    return knex('category')
        .where('id', category.id)
        .update(category)
        .then(function() {
            return category;
        });
}

/**
 * Gets an existing category.
 * @param {integer} id
 * @return {Promise} A promise that returns the desired category.
 */
function getCategory(id) {
    return knex
        .select('id', 'name')
        .from('category')
        .where('id', id)

        .then(function(resultSet) {
            return joinjs.mapOne(resultSet, resultMaps, 'categoryMap');
        });
}

/**
 * Gets all categorys.
 * @return {Promise} A promise that returns an array of all categorys.
 */
function getCategories() {
    
    return knex
        .select(
        't.id as category_id',
        't.name as category_name',
        'pc.id As parentcategory_id',
        'pc.name As parentcategory_name')
        .from('category as t')
        .leftOuterJoin('category_sub as c', 't.id', 'c.category_id')
        .leftOuterJoin('category as pc', 'c.parent_category_id', 'pc.id')

        .then(function(resultSet) {
            return joinjs.map(resultSet, resultMaps, 'categorySubMap', 'category_');
        });
    
}
        

/**
 * Deletes an category.
 * @param {integer} id
 * @return {Promise} A promise that gets fulfilled when the category is deleted.
 */
function deleteCategory(id) {
    return knex('category')
        .where('id', id)
        .delete();
}


/**
 * Gets an existing category parent.
 * @param {integer} id
 * @return {Promise} A promise that returns the desired category.
 */
function getCategoryParents(id) {
    return knex
        .select('id', 'name')
        .from('category')
        .where('id', id)

        .then(function(resultSet) {
            return joinjs.mapOne(resultSet, resultMaps, 'categoryMap');
        });
}

/**
 * Gets an existing category children.
 * @param {integer} id
 * @return {Promise} A promise that returns the desired category.
 */
function getCategoryChildren(id) {
    return knex
        .select('id', 'name')
        .from('category')
        .where('id', id)

        .then(function(resultSet) {
            return joinjs.mapOne(resultSet, resultMaps, 'categoryMap');
        });
}

function getCategoryCount(id) {
        return knex
        .count('id')
        .from('category')
        .where('id', id).then(function(result){
            return result;
        });
}