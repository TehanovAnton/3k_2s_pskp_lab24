const router =  require('express').Router()

const { sequelize, DataTypes } = require('./sequelize')
const { commitAuthorise } = require('./abilities/commitAbilities')

const User = require('./models/user')(sequelize, DataTypes)
const Repos = require('./models/repos')(sequelize, DataTypes)
const Commit = require('./models/commit')(sequelize, DataTypes)

Repos.associate({ 'user':User, 'commit':Commit })


router.get('/commits',
  async function (req, res, next) {
    res.json(await Commit.findAll({ raw:true }))
  }
)

router.get('/reposes/:reposId/commits',
  commitAuthorise,

  async (req, res) => {
    let reposOptions = { where: { id:parseInt(req.params.reposId) }, include:'commits' }
    let repos = await Repos.findOne(reposOptions)
    res.json(repos.commits)
  }

)

router.get('/reposes/:reposId/commits/:id',
  commitAuthorise,

  async (req, res) => {
    let commit = await Commit.findByPk(req.params.id)
    res.json(commit)
  }
)

router.post('/reposes/:reposId/commits',
  commitAuthorise,

  async (req, res) => {
    let params = req.params
    let createCommitOptions = { message: req.body.message, reposId:params.reposId }
    let commit = await Commit.create(createCommitOptions)
    res.json(commit)
  }
)

router.put('/reposes/:reposId/commits/:id',
  commitAuthorise,

  async (req, res) => {
    await Commit.update(req.body, { where:{ id: req.params.id } })
    let commit = await Commit.findByPk(req.params.id)

    res.json(commit)
  }
)

router.delete('/reposes/:reposId/commits/:id',
  commitAuthorise,
  
  async (req, res) => { 
    let repos = await Commit.findByPk(req.params.id)
    let isDeleted = await Commit.destroy({ where: { id:req.params.id } })

    if (!!isDeleted)
      res.json(repos)
    else
      res.send('something went wrong')
  }
)



module.exports = router