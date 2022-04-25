'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {

    const {
      sequelize,
      DataTypes
    } = require('../sequelize')
    const User = require('../models/user')(sequelize, DataTypes)

    let user = await User.findOne({ raw:true })

    queryInterface.bulkInsert('Repos', [{
      name: 'my_repos',
      authorId: user.id,
      createdAt: new Date(),
      updatedAt: new Date()
    }]);
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Repos', null, {});
  }
};
