'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up (queryInterface, Sequelize) {
    return queryInterface.addColumn('Courses', 'CategoryId', {
      type: Sequelize.INTEGER,
      references:{
        model: 'Categories',
        key:'id'
      }
    })
  },

  down (queryInterface, Sequelize) {
    return queryInterface.removeColumn('Courses', 'CategoryId')
  }
};
