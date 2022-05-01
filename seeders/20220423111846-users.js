'use strict';

const { GUEST, REGISTERED, ADMIN } = require('../abilities/roles')

module.exports = {
  async up (queryInterface, Sequelize) {
    queryInterface.bulkInsert('Users', [{
      name: 'anton',
      email: 'tehanovanton@gmail.com',
      password: 'ewqqwe',
      role: REGISTERED,
      createdAt: new Date(),
      updatedAt: new Date()
    }]);

    queryInterface.bulkInsert('Users', [{
      name: 'andrew',
      email: 'tehanovandrew@gmail.com',
      password: 'ewqqwe',
      role: GUEST,
      createdAt: new Date(),
      updatedAt: new Date()
    }]);

    queryInterface.bulkInsert('Users', [{
      name: 'admin',
      email: 'tehanovadmin@gmail.com',
      password: 'ewqqwe',
      role: ADMIN,
      createdAt: new Date(),
      updatedAt: new Date()
    }]);
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Users', null, {});
  }
};
