const Sequelize = require('sequelize');
const DataTypes = require('sequelize').DataTypes;

const sequelize = new Sequelize(
    'pskp', 'Anton', 'ewqqwe',
    { dialect:'mssql', pool: { max:5, min:0, acquire:30000, idle:10000 } }
);

module.exports = { sequelize, DataTypes }