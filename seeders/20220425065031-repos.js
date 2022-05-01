'use strict';

const _ = require('underscore')

module.exports = {
  async up (queryInterface, Sequelize) {

    const {
      sequelize,
      DataTypes
    } = require('../sequelize')
    const { User } = require('../models/associate')

    let users = await User.findAll({ raw:true })
    users.forEach(user => {
      queryInterface.bulkInsert('Repos', [{
        name: `${user.name}_repos`,
        authorId: user.id,
        createdAt: new Date(),
        updatedAt: new Date()
      }]);
    })
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Repos', null, {});
  }
};
