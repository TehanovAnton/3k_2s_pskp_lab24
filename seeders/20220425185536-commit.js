'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {

    const {
      sequelize,
      DataTypes
    } = require('../sequelize')
    const Repos = require('../models/repos')(sequelize, DataTypes)

    let reposes = await Repos.findAll({ raw:true })

    reposes.forEach(repos => {
      queryInterface.bulkInsert('Commits', [{
        message: 'hello commit',
        reposId: repos.id,
        createdAt: new Date(),
        updatedAt: new Date()
      }]);
    })
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Commits', null, {});
  }
};
