'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Users',[{
      "email": "admin@admin.com",
      "password": "$2a$15$l2ZjCi7LP2jo3rLVS/ufk.9uXyB5BgR2WjJt2DkUBWLvwDaZzerMO",
      "RoleId": 1,
      "createdAt": new Date(),
      "updatedAt": new Date()
    }, {
      "email": "admin2@admin.com",
      "password": "$2a$15$l2ZjCi7LP2jo3rLVS/ufk.9uXyB5BgR2WjJt2DkUBWLvwDaZzerMO",
      "RoleId": 2,
      "createdAt": new Date(),
      "updatedAt": new Date()
    }, {
      "email": "yklauer2@who.int",
      "password": "Zp34KcljW8bo",
      "RoleId": 2,
      "createdAt": new Date(),
      "updatedAt": new Date()
    }, {
      "email": "nreynish3@apple.com",
      "password": "3IRmMtSMymB",
      "RoleId": 2,
      "createdAt": new Date(),
      "updatedAt": new Date()
    }, {
      "email": "bthorrington4@cbslocal.com",
      "password": "omaHqs3MTIph",
      "RoleId": 1,
      "createdAt": new Date(),
      "updatedAt": new Date()
    }, {
      "email": "emercik5@naver.com",
      "password": "fPMlPD3KnxiP",
      "RoleId": 2,
      "createdAt": new Date(),
      "updatedAt": new Date()
    }, {
      "email": "eallchin6@unblog.fr",
      "password": "BW7mT7XNxzg",
      "RoleId": 2,
      "createdAt": new Date(),
      "updatedAt": new Date()
    }, {
      "email": "wbedberry7@printfriendly.com",
      "password": "3NYXdm",
      "RoleId": 1,
      "createdAt": new Date(),
      "updatedAt": new Date()
    }, {
      "email": "rstronack8@bloomberg.com",
      "password": "R9faG6",
      "RoleId": 2,
      "createdAt": new Date(),
      "updatedAt": new Date()
    }, {
      "email": "sdrepp9@wsj.com",
      "password": "Lui8BxaLx",
      "RoleId": 2,
      "createdAt": new Date(),
      "updatedAt": new Date()
    }])
  },

  down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Users',{})
  }
};
