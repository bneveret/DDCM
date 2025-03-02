const express = require('express');
const bodyParser = require('body-parser');
const mongodb = require('./db/connect');
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');

const passport = require('passport');
const session = require('express-session');
const mongoStore = require('connect-mongo');
require('./auth/github');

const port = process.env.PORT || 8080;
const app = express();

app
.use(
  cors({
    origin: '*',
    methods: 'GET, POST, PUT, DELETE, OPTIONS',
    allowedHeaders: 'Origin, X-Requested-With, Content-Type, Accept, Authorization',
    credentials: true
  })
)

.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store: mongoStore.create({
      mongoUrl: process.env.MONGODB_URI,
      dbName: 'dnd',
      collectionName: 'sessions',
      ttl: 1 * 1 * 20 * 60, // Expiration time for sessions (20 minutes)
      autoRemove: 'native'
    }),
    cookie: { secure: true, httpOnly: true, sameSite: 'lax' }
  })
)
.use(passport.initialize())
.use(passport.session())
.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument, {
  explorer: true,
  swaggerOptions: {
    oauth2RedirectUrl: "https://ddcm.onrender.com/auth/github/callback",
  },
  initOauth: {
    clientId: process.env.GITHUB_CLIENT_ID,
    clientSecret: process.env.GITHUB_CLIENT_SECRET,
    appName: 'Dungeons and Dragons Campaign Manager'
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
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    next();
  })
.use('/', require('./routes'));

mongodb.initDb((err) => {
    if (err) {
      console.log(err);
    } else {
      app.listen(port, () => {
        console.log(`Connected to DB and listening on ${port}`);
      });
    }
});