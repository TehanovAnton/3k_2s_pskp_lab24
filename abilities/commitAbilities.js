const roles = require('./roles')
const { subject } = require('@casl/ability')
const { sequelize, DataTypes } = require('../sequelize')

const User = require('../models/user')(sequelize, DataTypes)
const Repos = require('../models/repos')(sequelize, DataTypes)
const Commit = require('../models/commit')(sequelize, DataTypes)

User.associate({ 'repos':Repos })
Repos.associate({ 'user':User, 'commit':Commit })


async function commitAuthorise(req, res, next) {    
  let user = await User.findOne({ where:{ id:req.user.id }, include:'reposes' })
  let ability = await abilities(user)
  let commit = subject('Commit', { reposId: parseInt(req.params.reposId) })

  if (req.params['id']) {
    commit = await Commit.findOne({ where:{ id: req.params.id } })
  }

  if (ability.can('read_commits', commit)) {
    return next()
  }
  else {
    res.send('permission denied')
  }
}

let abilities = async (user) => {

  const { AbilityBuilder, Ability, subject } = require('@casl/ability');
  const { can, rules } = new AbilityBuilder(Ability);
  
  if (user.role == roles.GUEST) {
    can('read_commit', 'Commit', { reposId: { $in: user.reposes.map(repos => repos.id) } })
  }
  else if (user.role == roles.REGISTERED) {
    console.log(' blat');
    can('manage', 'Commit', { reposId: { $in: user.reposes.map(repos => repos.id) } })  
  }
  else if (user.role == roles.ADMIN) {
    
  }

  return new Ability(rules)
}

module.exports = { abilities, commitAuthorise, subject }
