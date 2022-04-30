
let abilities = async (user, repos) => {

  const { AbilityBuilder, Ability, subject } = require('@casl/ability');
  const { can, rules } = new AbilityBuilder(Ability);
  
  if (user.role == GUEST) {
    can('read_repos', 'Repos', { id:repos.id, authorId: user.id })
  }
  else if (user.role == REGISTERED) {
    can('read_repos', 'Repos', { id:repos.id, authorId: user.id })
    can('manage_repos', 'Repos', { id:repos.id, authorId: user.id })  
  }
  else if (user.role == ADMIN) {
    
  }

  return new Ability(rules)
}

module.exports = abilities
