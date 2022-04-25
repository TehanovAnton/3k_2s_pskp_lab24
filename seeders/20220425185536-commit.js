'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {

    const {
      sequelize,
      DataTypes
    } = require('../sequelize')
    const Repos = require('../models/repos')(sequelize, DataTypes)

    let repos = await Repos.findOne({ raw:true })

    queryInterface.bulkInsert('Commits', [{
      message: 'hello commit',
      reposId: repos.id,
      createdAt: new Date(),
      updatedAt: new Date()
    }]);
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Commits', null, {});
  }
};
