const passport = require('./24_01_passport_config')
const router =  require('express').Router()

const bodyParser = require('body-parser').urlencoded({ extended: false })

router.get('/login',
  function (req, res, next) {
    res.render('login_form', {})
  }
)

router.post('/login', bodyParser, passport.authenticate('local', { session:true }),
  function (req, res) {
    res.send(JSON.stringify(req.user))
  }
)

router.get('/logout', passport.authenticate('local', { session:true }),
  function(req, res, next) {
    req.logout();
    res.send(`loged out:${!req.isAuthenticated()}`);
  }
);

router.get('/resource',
  function (req, res, next) {          
    if (req.isAuthenticated()) {
      res.send('Resource')
    }
    else {
      res.redirect('/login')
    }
  }
)

module.exports = router
