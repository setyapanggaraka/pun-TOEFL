'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up (queryInterface, Sequelize) {
    return queryInterface.addColumn('Users', 'RoleId', {
      type: Sequelize.INTEGER,
      references:{
        model: 'Roles',
        key:'id'
      }
    }) 
  },

  down (queryInterface, Sequelize) {
    return queryInterface.removeColumn('Users', 'RoleId')
  }
};
