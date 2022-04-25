'use strict';
const {
  Model
} = require('sequelize');

// const {
//   sequelize,
//   DataTypes
// } = require('../sequelize')

// const Repos = require('./repos')(sequelize, DataTypes)

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      User.hasMany(models['repos'], { as:'reposes', foreignKey:'authorId' })
    }
  }

  User.init({
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    role: DataTypes.STRING,
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'User',
  });
  
  return User;
};