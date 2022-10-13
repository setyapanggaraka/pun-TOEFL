'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up (queryInterface, Sequelize) {
    return queryInterface.addColumn('Courses', 'TeacherId', {
      type: Sequelize.INTEGER,
      references:{
        model: 'Teachers',
        key:'id'
      }
    }) 
  },

  down (queryInterface, Sequelize) {
    return queryInterface.removeColumn('Courses', 'TeacherId')
  }
};