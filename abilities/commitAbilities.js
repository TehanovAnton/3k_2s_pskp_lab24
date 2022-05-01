const roles = require('./roles')
const { subject } = require('@casl/ability')
const { User, Commit } = require('../models/associate')


async function commitAuthorise(req, res, next, abilityName) {    
  let user = await User.findOne({ where:{ id:req.user.id }, include:'reposes' })
  let ability = await abilities(user)
  let commit = subject('Commit', { reposId: parseInt(req.params.reposId) })

  if (req.params['id']) {
    commit = await Commit.findOne({ where:{ id: req.params.id } })
  }

  console.log(JSON.stringify(ability));
  console.log(JSON.stringify(commit));
  console.log(abilityName);

  if (ability.can(abilityName, commit)) {
    return next()
  }
  else {
    res.send('permission denied')
  }
}

let abilities = async (user) => {

  const { AbilityBuilder, Ability } = require('@casl/ability');
  const { can, rules } = new AbilityBuilder(Ability);
  
  if (user.role == roles.GUEST) {
    can('read', 'Commit', { reposId: { $in: user.reposes.map(repos => repos.id) } })
  }
  else if (user.role == roles.REGISTERED) {
    can('manage', 'Commit', { reposId: { $in: user.reposes.map(repos => repos.id) } })  
  }
  else if (user.role == roles.ADMIN) {
    can('manage', 'Commit')  
  }

  return new Ability(rules)
}

module.exports = { abilities, commitAuthorise, subject }
