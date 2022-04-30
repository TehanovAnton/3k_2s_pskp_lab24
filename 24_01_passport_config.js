const passport = require('passport')
const LocalStrategy = require('passport-local');

const { sequelize , DataTypes } = require('./sequelize')
const User = require('./models/user')(sequelize, DataTypes)

passport.use(new LocalStrategy(
  { usernameField: 'email' },

  async function (email, password, done) {
    try {      
      let user = await User.findOne({ where: { email:email } })
  
      if (!user){ return done(null, false); }

      if (password == user.password)
        { return done(null, user); }
      else 
        { return done(null, false); }
    }
    catch(err) {
      return done(err)
    }
  }
));

passport.serializeUser((user, done) => {
  return done(null, JSON.stringify(user))
})

passport.deserializeUser((user, done) => {
  return done(null, JSON.parse(user))
})

module.exports = passport