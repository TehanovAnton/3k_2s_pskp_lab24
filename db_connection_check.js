const Sequelize = require('sequelize');
const DataTypes = require('sequelize').DataTypes;
const { DB_NAME, USER_NAME, USER_PASSWORD } = require('./database');

const { subject } = require('@casl/ability')
const { registeredRoleAbilities } = require('./registeredRoleAbilities')

const sequelize = new Sequelize(
    'pskp_lab24', 'postgres', 'ewqqwe',
    { dialect:'postgres', pool: { max:5, min:0, acquire:30000, idle:10000 } }
);

const User = require('./models/user')(sequelize, DataTypes )
const Repos = require('./models/repos')(sequelize, DataTypes)

Repos.findOne({ include:'author' })
.then(repos => {    
console.log(repos.author);
})
.catch(err => console.log(err))

// User.associate({ 'repos':Repos })    

// User.findOne({ include:'reposes' })
// .then(repos => {     
//     console.log(repos);
// })
// .catch(err => console.log(err))



