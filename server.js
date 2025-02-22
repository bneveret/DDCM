const express = require('express');
const bodyParser = require('body-parser');
const mongodb = require('./db/connect');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');

const passport = require('passport');
const session = require('express-session');
require('./auth/github');

const port = process.env.PORT || 8080;
const app = express();

app
.use(
  session({
    secret: 'process.env.SESSION_SECRET',
    resave: false,
    saveUninitialized: true,
  })
)
.use(passport.initialize())
.use(passport.session())
.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument, {
  explorer: true,
  swaggerOptions: {
    oauth2RedirectUrl: "https://ddcm.onrender.com/auth/github/callback",
    oauth: {
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      usePkceWithAuthorizationCodeGrant: true
    }
  }
}))

.use(bodyParser.json())
.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader(
      'Access-Control-Allow-Headers',
      'Origin, X-Requested-With, Content-Type, Accept, Authorization'
    );
    res.setHeader('Content-Type', 'application/json');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    next();
  })
.use('/', require('./routes'));

mongodb.initDb((err) => {
    if (err) {
      console.log(err);
    } else {
      app.listen(port);
      console.log(`Connected to DB and listening on ${port}`);
    }
});