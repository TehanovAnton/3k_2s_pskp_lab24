const passport = require('./24_01_passport_config')
const router =  require('express').Router()
const bodyParser = require('body-parser').urlencoded({ extended: false })

const {
  registeredRoleAbilities,
  subject
} = require('./abilities/registeredRoleAbilities')

const { sequelize , DataTypes } = require('./sequelize')
const User = require('./models/user')(sequelize, DataTypes)

let canReadUsers = (req, res, next) => {
  let ability = registeredRoleAbilities(req.user),
      user = req.user,
      userSubject = subject(user.role, user)

  if (ability.can('read_user', userSubject))
    next()
  else
    res.send('Permission denied for read_users action')
}

router.get('/users/:id',
  async (req, res) => {
    let user = await User.findOne({ where: { id: req.params.id }, raw:true })
    res.json(user)
  }
)

router.get('/users',
  canReadUsers,
  async function (req, res, next) {
    res.json(await User.findAll({ raw:true }))
  }
)

module.exports = router
