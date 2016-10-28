import _Strategy = require('passport-strategy');
import _Passport = require('./authenticator');
import _SessionStrategy = require('./strategies/session');
import ConnectFramework = require('./framework/connect');

declare interface Exports {
  Passport: typeof _Passport;
  Authenticator: typeof _Passport;
  Strategy: typeof _Strategy;
  strategies: {
    SessionStrategy: typeof _SessionStrategy;
  };
  ConnectFramework: typeof ConnectFramework;
}

declare const passport: ConnectFramework.Passport & Exports;

export = passport;
