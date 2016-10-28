import Authenticator = require('../authenticator');
import initialize = require('../middleware/initialize');
import authenticate = require('../middleware/authenticate');
import IncomingMessageExt = require('../http/request');

/**
 * Framework support for Connect/Express.
 *
 * This module provides support for using Passport with Express.  It exposes
 * middleware that conform to the `fn(req, res, next)` signature and extends
 * Node's built-in HTTP request object with useful authentication-related
 * functions.
 */
declare function connect (): connect.Framework;

declare namespace connect {
  export interface Framework {
    initialize: typeof initialize;
    authenticate: typeof authenticate;
  }

  export function __monkeypatchNode (): void;

  export interface MonkeypatchNode {
    login: typeof IncomingMessageExt.logIn;
    logIn: typeof IncomingMessageExt.logIn;
    logout: typeof IncomingMessageExt.logIn;
    logOut: typeof IncomingMessageExt.logIn;
    isAuthenticated: typeof IncomingMessageExt.isAuthenticated;
    isUnauthenticated: typeof IncomingMessageExt.isUnauthenticated;
  }

  export type Passport = Authenticator<
    void,
    initialize.Return,
    authenticate.Options,
    authenticate.Callback,
    authenticate.Return,
    void,
    void,
    void
  >;
}

export = connect;
