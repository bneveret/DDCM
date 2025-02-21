const passport = require('passport');
const GitHubStrategy = require('passport-github2').Strategy;
const mongodb = require('../db/connect');
const { ObjectId } = require('mongodb');
require('dotenv').config();

passport.use(new GitHubStrategy({
  clientID: process.env.GITHUB_CLIENT_ID,
  clientSecret: process.env.GITHUB_CLIENT_SECRET,
  callbackURL: 'https://ddcm.onrender.com/auth/github/callback'
}, async (accessToken, refreshToken, profile, done) => {
  try {
    const usersCollection = mongodb.getDb().db().collection('users');
    let user = await usersCollection.findOne({ githubId: profile.id });

    if (!user) {
      const newUser = {
        githubId: profile.id,
        username: profile.username,
        avatar: profile.photos[0].value
      };
      const result = await usersCollection.insertOne(newUser);
      user = { ...newUser, _id: result.insertedId };
    }
    return done(null, user);
  } catch (err) {
    return done(err, null);
  }
}));

passport.serializeUser((user, done) => done(null, user._id));
passport.deserializeUser(async (id, done) => {
  try {
  const user = await mongodb.getDb().db().collection('users').findOne({ _id: new ObjectId(id) });
  done(null, user);
  } catch (err) {
    done(err, null);
  }
});