'use strict';

const fs = require('fs')

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up (queryInterface, Sequelize) {
    const categoryData = JSON.parse(fs.readFileSync('./data/categories.json', 'utf-8'))
    const insertCategory = categoryData.map(el => {
    el.createdAt = el.updatedAt = new Date()
      return el
    })
    return queryInterface.bulkInsert('Categories', insertCategory, {});
  },

  down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Categories', {});
  }
};
