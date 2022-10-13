'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Students',[{
      "name": "Admin Student",
      "UserId": 2,
      "password": "$2a$15$l2ZjCi7LP2jo3rLVS/ufk.9uXyB5BgR2WjJt2DkUBWLvwDaZzerMO",
      "createdAt": new Date(),
      "updatedAt": new Date()
    }, {
      "name": "Brett",
      "UserId": 4,
      "createdAt": new Date(),
      "updatedAt": new Date()
    }, {
      "name": "Alanson",
      "UserId": 3,
      "createdAt": new Date(),
      "updatedAt": new Date()
    }, {
      "name": "Moyna",
      "UserId": 8,
      "createdAt": new Date(),
      "updatedAt": new Date()
    }, {
      "name": "Bucky",
      "UserId": 10,
      "createdAt": new Date(),
      "updatedAt": new Date()
    }])
  },

  down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Students')
  }
};
