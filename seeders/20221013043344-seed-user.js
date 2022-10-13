'use strict';

const fs = require('fs');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
   const userData = JSON.parse(fs.readFileSync('./data/users.json', 'utf-8'))
   const insertUsers = userData.map(el => {
    delete el.id
    el.createdAt = el.updatedAt = new Date
    return el
   })
  //  return queryInterface.bulkInsert('Users', insertUsers, {});
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    //  return queryInterface.bulkDelete('Users', insertUsers, {});
  }
};
