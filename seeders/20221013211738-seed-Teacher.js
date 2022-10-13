'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Teachers',[{
      "name": "Admin Teacher",
      "UserId": 1,
      "password" : "$2a$15$l2ZjCi7LP2jo3rLVS/ufk.9uXyB5BgR2WjJt2DkUBWLvwDaZzerMO",
      "createdAt": new Date(),
      "updatedAt": new Date()
    }, {
      "name": "Saba",
      "UserId": 7,
      "createdAt": new Date(),
      "updatedAt": new Date()
    }, {
      "name": "Blaine",
      "UserId": 9,
      "createdAt": new Date(),
      "updatedAt": new Date()
    }, {
      "name": "Sherry",
      "UserId": 6,
      "createdAt": new Date(),
      "updatedAt": new Date()
    }, {
      "name": "Rusty",
      "UserId": 5,
      "createdAt": new Date(),
      "updatedAt": new Date()
    }])
  },

  down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Teachers',{})
  }
};
