const router =  require('express').Router()
const { isAuthenticated } = require('../24_01_passport_config')

const { sequelize, DataTypes } = require('../sequelize')
const { commitAuthorise } = require('../abilities/commitAbilities')

const { User, Repos, Commit } = require('../models/associate')


router.get('/commits',
  async function (req, res, next) {
    res.json(await Commit.findAll({ raw:true }))
  }
)

router.get('/reposes/:reposId/commits',
  isAuthenticated,
  (req, res, next) => commitAuthorise(req, res, next, 'read'),

  async (req, res) => {
    let reposOptions = { where: { id:parseInt(req.params.reposId) }, include:'commits' }
    let repos = await Repos.findOne(reposOptions)
    res.json(repos.commits)
  }

)

router.get('/reposes/:reposId/commits/:id',
  isAuthenticated,
  (req, res, next) => commitAuthorise(req, res, next, 'read'),

  async (req, res) => {
    let commit = await Commit.findByPk(req.params.id)
    res.json(commit)
  }
)

router.post('/reposes/:reposId/commits',
  isAuthenticated,
  (req, res, next) => commitAuthorise(req, res, next, 'create'),

  async (req, res) => {
    let params = req.params
    let createCommitOptions = { message: req.body.message, reposId:params.reposId }
    let commit = await Commit.create(createCommitOptions)
    res.json(commit)
  }
)

router.put('/reposes/:reposId/commits/:id',
  isAuthenticated,
  (req, res, next) => commitAuthorise(req, res, next, 'update'),

  async (req, res) => {
    await Commit.update(req.body, { where:{ id: req.params.id } })
    let commit = await Commit.findByPk(req.params.id)

    res.json(commit)
  }
)

router.delete('/reposes/:reposId/commits/:id',
  isAuthenticated,
  (req, res, next) => commitAuthorise(req, res, next, 'delete'),
  
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