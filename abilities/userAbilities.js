const roles = require('./roles')
const { subject } = require('@casl/ability')
const { AbilityBuilder, Ability } = require('@casl/ability');

const { User } = require('../models/associate')

async function userAuthorise(req, res, next, abilityName) {    
  let authUserUser = await User.findOne({ where:{ id:req.user.id } })
  let user = authUserUser

  if (req.params['id']) {
    user = await User.findOne({ where:{ id:req.params.id } })
  }

  console.log(JSON.stringify(user));
  console.log(abilityName);

  let ability = await abilities(authUserUser, authUserUser.id)
  if (ability.can(abilityName, user)) {
    return next()
  }
  else {
    res.send('permission denied')
  }
}

let abilities = async (user, authUserId) => {  
  const { can, rules } = new AbilityBuilder(Ability);

  if (user.role == roles.GUEST) {
    can('read_ability', 'User', { id: authUserId })  
  }
  else if (user.role == roles.REGISTERED) {
    can('read_ability', 'User', { id: authUserId })
    can('read', 'User', { id: authUserId })
  }
  else if (user.role == roles.ADMIN) {
    can('read_ability', 'User')
    can('read', 'User')  
  }

  return new Ability(rules)
}

module.exports = { abilities, userAuthorise, subject }
