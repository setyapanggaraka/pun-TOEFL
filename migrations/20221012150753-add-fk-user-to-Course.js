'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up (queryInterface, Sequelize) {
    return queryInterface.addColumn('Courses', 'StudentId', {
      type: Sequelize.INTEGER,
      references:{
        model: 'Students',
        key:'id'
      }
    })
  },

  down (queryInterface, Sequelize) {
    return queryInterface.removeColumn('Courses', 'StudentId')
  }
};
