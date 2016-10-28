/// <reference path="bundle.d.ts" />

import passport = require('passport');
import TwitterStrategy = require('passport-twitter');
import GitHubStrategy = require('passport-github');
import Passport = require('passport/lib/authenticator');

passport.use(new TwitterStrategy({
    consumerKey: 'abc',
    consumerSecret: '123',
    callbackURL: 'http://127.0.0.1:3000/auth/twitter/callback'
  },
  function(token, tokenSecret, profile, cb) {
    return cb(null, {});
  }
));

passport.use(new GitHubStrategy({
    clientID: 'abc',
    clientSecret: '123',
    callbackURL: 'http://127.0.0.1:3000/auth/twitter/callback'
  },
  function(token, tokenSecret, profile, cb) {
    return cb(null, {});
  }
));

passport.serializeUser(function (user: any, done: Passport.SerializeCallback) {
  done(null, user.id);
});

passport.deserializeUser(function (id: string, done: Passport.DeserializeCallback) {
  done(null, {});
});
