const router =  require('express').Router()
const { isAuthenticated } = require('../24_01_passport_config')

const { reposAuthorise } = require('../abilities/reposAbilities')

const { User, Repos } = require('../models/associate')

router.get('/reposes',
  async function (req, res, next) {
    res.json(await Repos.findAll({ raw:true }))
  }
)

router.get('/reposes/:id',
  isAuthenticated,
  (req, res, next) => reposAuthorise(req, res, next, 'read'),

  async (req, res) => {
    let repos = await Repos.findOne({ where: { id: req.params.id }, raw:true })
    res.json(repos)
  }
)

router.post('/reposes',
  isAuthenticated,
  (req, res, next) => reposAuthorise(req, res, next, 'create'),

  async (req, res) => {
    let repos = await Repos.create({ name:req.body.name, authorId:req.body.authorId })
    res.json(repos)
  }
)

router.put('/reposes/:id',
  isAuthenticated,
  (req, res, next) => reposAuthorise(req, res, next, 'update'),

  async (req, res) => {
    await Repos.update(req.body, { where: { id:req.params.id } })
    let repos = await Repos.findByPk(req.params.id)
    res.json(repos)
  }
)

router.delete('/reposes/:id',
  isAuthenticated,
  (req, res, next) => reposAuthorise(req, res, next, 'delete'),

  async (req, res) => { 
    let repos = await Repos.findByPk(req.params.id)
    let isDeleted = await Repos.destroy({ where: { id:req.params.id } })

    if (!!isDeleted)
      res.json(repos)
    else
      res.send('something went wrong')
  }
)

module.exports = router
