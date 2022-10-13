'use strict';

const fs = require('fs')

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
   const studentData = JSON.parse(fs.readFileSync('./data/students.json', 'utf-8'))
   const insertStudent = studentData.map(el => {
    delete el.id
    el.createdAt = el.updatedAt = new Date()
    return el
   })
  //  return queryInterface.bulkInsert('Students', insertStudent, {});
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    //  return queryInterface.bulkDelete('Students', insertStudent, {});
  }
};
