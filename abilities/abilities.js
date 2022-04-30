const { AbilityBuilder, Ability, subject } = require('@casl/ability')
const { GUEST, REGISTERED, ADMIN } = require('./roles')

const { sequelize , DataTypes } = require('../sequelize')
const Repos = require('../models/repos')(sequelize, DataTypes)
const Commit = require('../models/commit')(sequelize, DataTypes)

function initReposAbilities(authenticatedUser, objForAuthorize) {
  const { can, rules } = new AbilityBuilder(Ability);

  console.log(`${authenticatedUser.role}; ${authenticatedUser.role == REGISTERED}`);

  if (authenticatedUser.role == GUEST) {
    can('read_repos', 'Repos', { id:objForAuthorize.id, authorId: objForAuthorize.authorId })
  }
  else if (authenticatedUser.role == REGISTERED) {
    console.log("Blat");
    can('manage', 'Repos', { id:objForAuthorize.id, authorId: authenticatedUser.authorId })
  }
  else if (authenticatedUser.role == ADMIN) {
    
  }

  return rules;
}

async function abilities(authenticatedUser, objForAuthorize, objType) {
  let rules  

  if (objType == 'Repos') {
    rules = initReposAbilities(authenticatedUser, objForAuthorize)
  }
  else if (objType == 'Commit') {
    rules = await initCommitAbilities(authenticatedUser, objForAuthorize)
  }

  return new Ability(rules);
};

module.exports = { abilities, subject}