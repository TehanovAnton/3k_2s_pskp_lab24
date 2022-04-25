'use strict';
const {
  Model
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Repos extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Repos.belongsTo(models['user'], { as:'author', foreignKey:'authorId' })
    }
  }

  Repos.init({
    name: DataTypes.STRING,
    authorId: { type: DataTypes.INTEGER, allowNull:false }
  }, {
    sequelize,
    modelName: 'Repos',
  });

  const User = require('../models/user')(sequelize, DataTypes)
  Repos.associate({ 'user':User })  

  return Repos;
};