
const { sequelize, DataTypes } = require('../sequelize')
const User = require('../models/user')(sequelize, DataTypes)
const Repos = require('../models/repos')(sequelize, DataTypes)
const Commit = require('../models/commit')(sequelize, DataTypes)

User.associate({ 'repos':Repos })
Repos.associate({ 'user':User, 'commit':Commit })
Commit.associate({ 'repos':Repos })

module.exports = { User, Repos, Commit }