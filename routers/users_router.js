const rules = require('nodemon/lib/rules')
const { passport, isAuthenticated} = require('../24_01_passport_config')
const router =  require('express').Router()
const { userAuthorise, abilities } = require('../abilities/userAbilities')
const reposAbilities = require('../abilities/reposAbilities').abilities
const commitAbilities = require('../abilities/commitAbilities').abilities

const { User, Commit } = require('../models/associate')

router.get('/users',
  isAuthenticated,
  (req, res, next) => userAuthorise(req, res, next, 'read'),

  async function (req, res) {
    res.json(await User.findAll({ raw:true }))
  }
)

router.get('/users/:id',
  isAuthenticated,
  (req, res, next) => userAuthorise(req, res, next, 'read'),

  async (req, res) => {
    let user = await User.findOne({ where: { id: req.params.id }, raw:true })
    res.json(user)
  }
)

router.get('/users/:id/abilities',
  isAuthenticated,
  async (req, res, next) => await userAuthorise(req, res, next, 'read_ability'),

  async (req, res) => {
    let user = await User.findOne({ where: { id: req.params.id }, include:'reposes' })
    let ability = await abilities(user, user.id)
    let repAbility = await reposAbilities(user)
    let comAbility = await commitAbilities(user)

    userRules = []
    userRules.push(ability.rules)
    userRules.push(repAbility.rules)
    userRules.push(comAbility.rules)

    res.json(userRules)
  }
)

module.exports = router
