'use strict';

var domain = require('../../domain');

var resultMaps = [
    {
        mapId: 'productMap',
        createNew: function() {
            return new domain.Product();
        },
        properties: ['name','description','price'],
        associations: [
            {name: 'category', mapId: 'categoryMap', columnPrefix: 'category_'}
        ]
    },

    {
        mapId: 'categoryMap',
        createNew: function() {
            return new domain.Category();
        },
        properties: ['name']
    },

    {
        mapId: 'categorySubMap',
        createNew: function() {
            return new domain.Category();
        },
        properties: ['name'],
        associations: [
            {name: 'parentcategory', mapId: 'categoryMap', columnPrefix: 'parentcategory_'}
        ]
    }
];

module.exports = resultMaps;
