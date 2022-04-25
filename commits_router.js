const router =  require('express').Router()
const bodyParser = require('body-parser')
const {
  sequelize,
  DataTypes
} = require('./sequelize')
const Commit = require('./models/commit')(sequelize, DataTypes)
const Repos = require('./models/repos')(sequelize, DataTypes)

router.get('/commits',
  async function (req, res, next) {
    res.json(await Commit.findAll({ raw:true }))
  }
)

router.get('/reposes/:id/commits',
  async (req, res) => {
    let repos = await Repos.findOne({ where: { id: req.params.id }, include:'commits' })
    res.json(repos.commits)
  }
)

router.get('/reposes/:reposId/commits/:id',
  async (req, res) => {
    let commit = await Commit.findOne({ where: { id: req.params.id, reposId: req.params.reposId } })
    res.json(commit)
  }
)

router.post('/reposes/:reposId/commits',
  async (req, res) => {
    let commit = await Commit.create(req.body)
    res.json(commit)
  }
)

router.put('/reposes/:reposId/commits/:id',
  async (req, res) => {
    console.log(req.body);
    await Commit.update(req.body, { where:{ id: req.params.id } })
    let commit = await Commit.findByPk(req.params.id)

    res.json(commit)
  }
)

router.delete('/reposes/:reposId/commits/:id',
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