const roles = require('./roles')
const { subject } = require('@casl/ability')
const { AbilityBuilder, Ability } = require('@casl/ability');
const { User, Repos } = require('../models/associate')

async function reposAuthorise(req, res, next, abilityName) {    
  let user = await User.findOne({ where:{ id:req.user.id } })
  let ability = await abilities(user)
  let repos = subject('Repos', { authorId: user.id })

  if (req.params['id']) {
    repos = await Repos.findOne({ where:{ id: req.params.id } })
  }

  console.log(JSON.stringify(ability));
  console.log(JSON.stringify(repos));
  console.log(abilityName);

  if (ability.can(abilityName, repos)) {
    return next()
  }
  else {
    res.send('permission denied')
  }
}

let abilities = async (user) => {  
  const { can, rules } = new AbilityBuilder(Ability);
  
  if (user.role == roles.GUEST) {
    can('read', 'Repos', { authorId: user.id } )
  }
  else if (user.role == roles.REGISTERED) {
    can('manage', 'Repos', { authorId: user.id })  
  }
  else if (user.role == roles.ADMIN) {
    can('manage', 'Repos')  
  }

  return new Ability(rules)
}

module.exports = { abilities, reposAuthorise, subject }
