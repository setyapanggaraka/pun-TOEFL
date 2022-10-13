'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Roles',[
      {
        "name": "Teacher",
        "createdAt": new Date(),
        "updatedAt": new Date()
      },
      {
        "name": "Student",
        "createdAt": new Date(),
        "updatedAt": new Date()
      }
    ])
  },

  down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Roles',[
      {
        "name": "Teacher",
        "createdAt": new Date(),
        "updatedAt": new Date()
      },
      {
        "name": "Student",
        "createdAt": new Date(),
        "updatedAt": new Date()
      }
    ]);
  }
};
