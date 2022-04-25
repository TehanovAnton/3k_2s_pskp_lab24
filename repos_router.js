const router =  require('express').Router()

const {
  sequelize,
  DataTypes
} = require('./sequelize')
const Repos = require('./models/repos')(sequelize, DataTypes)

router.get('/reposes',
  async function (req, res, next) {
    res.json(await Repos.findAll({ raw:true }))
  }
)

router.get('/reposes/:id',
  async (req, res) => {
    let repos = await Repos.findOne({ where: { id: req.params.id }, raw:true })
    res.json(repos)
  }
)

router.post('/reposes',
  async (req, res) => {
    console.log(req.body);
    let repos = await Repos.create({ name:req.body.name, authorId:req.body.authorId })
    res.json(repos)
  }
)

module.exports = router
