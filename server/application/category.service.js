'use strict';

module.exports = {
    createCategory: createCategory,
    updateCategory: updateCategory,
    getCategory: getCategory,
    getCategories: getCategories,
    deleteCategory: deleteCategory,
    getCategoryCount: getCategoryCount
};

var persistence = require('./persistence');
var categoryRepository = persistence.categoryRepository;

/**
 * Creates a new category and inserts it in to the database.
 * @param {Object} categoryData minus the id
 * @return {Category} A category that returns the inserted category (including the id)
 */
function createCategory(categoryData) {
    return categoryRepository.createCategory(categoryData);
}

/**
 * Updates an existing category.
 * @param {Object} categoryData including the id
 * @return {Promise} A promise that returns the updated category (including the id)
 */
function updateCategory(categoryData) {
    return categoryRepository.updateCategory(categoryData);
}

/**
 * Gets an existing category.
 * @param {integer} id
 * @return {Promise} A promise that returns the desired category.
 */
function getCategory(id) {
    return categoryRepository.getCategory(id);
}

/**
 * Gets all categorys.
 * @return {Promise} A promise that returns an array of all categorys.
 */
function getCategories() {
    return categoryRepository.getCategories();
}

/**
 * Deletes an category.
 * @param {integer} id
 * @return {Promise} A promise that gets fulfilled when the category is deleted.
 */
function deleteCategory(id) {
    return categoryRepository.deleteCategory(id);
}


/**
 * Gets an existing category parent.
 * @param {integer} id
 * @return {Promise} A promise that returns the desired category.
 */
function getCategoryParents(id) {
    return categoryRepository.getCategoryParents(id);
}

/**
 * Gets an existing category children.
 * @param {integer} id
 * @return {Promise} A promise that returns the desired category.
 */
function getCategoryChildren(id) {
    return categoryRepository.getCategoryChildren(id);
}


function getCategoryCount(id) {
    return categoryRepository.getCategoryCount(id);
}
