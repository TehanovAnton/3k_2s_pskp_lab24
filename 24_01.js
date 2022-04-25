const express = require('express');
const app = express()

const session = require('express-session');

const passport = require('./24_01_passport_config');

const auth_router = require('./auth_router')
const users_router = require('./users_router')
const repos_router = require('./repos_router')

const port = 3000;


app.set('view engine', 'ejs');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(session({
    secret: 'hghtyNN23h',
    resave: false,
    saveUninitialized: false,
  })
);
app.use(passport.authenticate('session'));

app.use(auth_router)
app.use(users_router)
app.use(repos_router)

app.use(function(req, res, next) {
  res.status(404)
  res.send("404: Page not found")
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
