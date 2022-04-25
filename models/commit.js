'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Commit extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Commit.belongsTo(models['repos'], { as:'repos', foreignKey:'reposId' })
    }
  }
  Commit.init({
    reposId: { type:DataTypes.INTEGER, allowNull:false },
    message: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Commit',
  });

  return Commit;
};