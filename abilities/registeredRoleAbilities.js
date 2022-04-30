const { AbilityBuilder, Ability, subject } = require('@casl/ability')

const { sequelize , DataTypes } = require('../sequelize')
const User = require('../models/user')(sequelize, DataTypes)

function registeredRoleAbilities(registeredUser) {
  const { can, cannot, rules } = new AbilityBuilder(Ability);

  can('read_user', 'registered', { id: registeredUser.id });
  can('create_repositories', 'registered', { id: registeredUser.id });

  // can('create_commits', 'User', { <check repos userId> });

  // can('update_repositories', 'User', { <check repos userId> });

  // can('update_commits', 'User', { <check commit repos userId> });

  return new Ability(rules);
};

module.exports = { registeredRoleAbilities, subject}