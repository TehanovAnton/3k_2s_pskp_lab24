'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    const { Repos } = require('../models/associate')

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
