const Sequelize = require('sequelize');
const DataTypes = require('sequelize').DataTypes;
const { DB_NAME, USER_NAME, USER_PASSWORD } = require('./database');

const sequelize = new Sequelize(
    'pskp_lab24', 'postgres', 'ewqqwe',
    { dialect:'postgres', pool: { max:5, min:0, acquire:30000, idle:10000 } }
);

const User = require('./models/user')(sequelize, DataTypes)
const Repos = require('./models/repos')(sequelize, DataTypes, User)
const Commit = require('./models/commit')(sequelize, DataTypes)

// Repos.associate({ 'user':User, 'commit':Commit })
// Commit.associate({ 'repos':Repos })

// Commit.findOne({ include:'repos' }). 
// then(async (commit) => {
// })

// Commit.update({ message: 'new' }, { where:{ id: 2 } })
// .then(updated => {
//     console.log(updated);
// })

// Commit.findOne({ include:'repos' })
// .then(commit => {    
//     console.log(JSON.stringify(commit.repos));
// })
// .catch(err => console.log(err))


Repos.findOne({ include:'author' })
.then(repos => {    
    console.log(repos.author);
})
.catch(err => console.log(err))

// User.associate({ 'repos':Repos })    

// User.findOne({ include:'reposes' })
// .then(user => {     
//     console.log(user.reposes.map(repos => repos.id));
// })
// .catch(err => console.log(err))



