const Sequelize = require('sequelize');
const DataTypes = require('sequelize').DataTypes;
const { DB_NAME, USER_NAME, USER_PASSWORD } = require('./database');

const sequelize = new Sequelize(
    'pskp_lab24', 'postgres', 'ewqqwe',
    { dialect:'postgres', pool: { max:5, min:0, acquire:30000, idle:10000 } }
);

const User = require('./models/user')(sequelize, DataTypes )

User.findAll({ raw:true })
.then(users => { console.log(users); })
.catch(err => console.log(err))