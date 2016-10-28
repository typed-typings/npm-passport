import Strategy = require('passport-strategy');
import SessionStrategy = require('./strategies/session');

declare class Authenticator <InitializeOptions, InitializeReturn, AuthenticateOptions, AuthenticateCallback, AuthenticateReturn, AuthorizeOptions, AuthorizeCallback, AuthorizeReturn> {
  init (): void;

  /**
   * Utilize the given `strategy` with optional `name`, overridding the strategy's
   * default name.
   *
   * Examples:
   *
   *     passport.use(new TwitterStrategy(...));
   *
   *     passport.use('api', new http.BasicStrategy(...));
   */
  use (strategy: Strategy): this;
  use (name: string, strategy: Strategy): this;

  /**
   * Un-utilize the `strategy` with given `name`.
   *
   * In typical applications, the necessary authentication strategies are static,
   * configured once and always available.  As such, there is often no need to
   * invoke this function.
   *
   * However, in certain situations, applications may need dynamically configure
   * and de-configure authentication strategies.  The `use()`/`unuse()`
   * combination satisfies these scenarios.
   *
   * Examples:
   *
   *     passport.unuse('legacy-api');
   */
  unuse (name: string): this;

  /**
   * Setup Passport to be used under framework.
   *
   * By default, Passport exposes middleware that operate using Connect-style
   * middleware using a `fn(req, res, next)` signature.  Other popular frameworks
   * have different expectations, and this function allows Passport to be adapted
   * to operate within such environments.
   *
   * If you are using a Connect-compatible framework, including Express, there is
   * no need to invoke this function.
   *
   * Examples:
   *
   *     passport.framework(require('hapi-passport')());
   */
  framework (
    framwork: Authenticator.Framework<
      InitializeOptions,
      InitializeReturn,
      AuthenticateOptions,
      AuthenticateCallback,
      AuthenticateReturn,
      AuthorizeOptions,
      AuthorizeCallback,
      AuthorizeReturn
    >
  ): this;

  /**
   * Passport's primary initialization middleware.
   *
   * This middleware must be in use by the Connect/Express application for
   * Passport to operate.
   *
   * Examples:
   *
   *     app.use(passport.initialize());
   *
   *     app.use(passport.initialize({ userProperty: 'currentUser' }));
   */
  initialize (options?: InitializeOptions): InitializeReturn;

  /**
   * Middleware that will authenticate a request using the given `strategy` name,
   * with optional `options` and `callback`.
   *
   * Examples:
   *
   *     passport.authenticate('local', { successRedirect: '/', failureRedirect: '/login' })(req, res);
   *
   *     passport.authenticate('local', function(err, user) {
   *       if (!user) { return res.redirect('/login'); }
   *       res.end('Authenticated!');
   *     })(req, res);
   *
   *     passport.authenticate('basic', { session: false })(req, res);
   *
   *     app.get('/auth/twitter', passport.authenticate('twitter'), function(req, res) {
   *       // request will be redirected to Twitter
   *     });
   *     app.get('/auth/twitter/callback', passport.authenticate('twitter'), function(req, res) {
   *       res.json(req.user);
   *     });
   *
   * @param {String} strategy
   * @param {Object} options
   * @param {Function} callback
   * @return {Function} middleware
   * @api public
   */
  authenticate (strategy: string | string[], callback?: AuthenticateCallback): AuthenticateReturn;
  authenticate (strategy: string | string[], options: AuthenticateOptions & { [key: string]: any }, callback?: AuthenticateCallback): AuthenticateReturn;

  /**
   * Middleware that will authorize a third-party account using the given
   * `strategy` name, with optional `options`.
   *
   * If authorization is successful, the result provided by the strategy's verify
   * callback will be assigned to `req.account`.  The existing login session and
   * `req.user` will be unaffected.
   *
   * This function is particularly useful when connecting third-party accounts
   * to the local account of a user that is currently authenticated.
   *
   * Examples:
   *
   *    passport.authorize('twitter-authz', { failureRedirect: '/account' });
   */
  authorize (strategy: string | string[], callback?: AuthorizeCallback): AuthorizeReturn;
  authorize (strategy: string | string[], options: AuthorizeOptions & { [key: string]: any }, callback?: AuthorizeCallback): AuthorizeReturn;

  /**
   * Middleware that will restore login state from a session.
   *
   * Web applications typically use sessions to maintain login state between
   * requests.  For example, a user will authenticate by entering credentials into
   * a form which is submitted to the server.  If the credentials are valid, a
   * login session is established by setting a cookie containing a session
   * identifier in the user's web browser.  The web browser will send this cookie
   * in subsequent requests to the server, allowing a session to be maintained.
   *
   * If sessions are being utilized, and a login session has been established,
   * this middleware will populate `req.user` with the current user.
   *
   * Note that sessions are not strictly required for Passport to operate.
   * However, as a general rule, most web applications will make use of sessions.
   * An exception to this rule would be an API server, which expects each HTTP
   * request to provide credentials in an Authorization header.
   *
   * Examples:
   *
   *     app.use(connect.cookieParser());
   *     app.use(connect.session({ secret: 'keyboard cat' }));
   *     app.use(passport.initialize());
   *     app.use(passport.session());
   */
  session (options?: SessionStrategy.Options): AuthenticateReturn;

  /**
   * Registers a function used to serialize user objects into the session.
   *
   * Examples:
   *
   *     passport.serializeUser(function(user, done) {
   *       done(null, user.id);
   *     });
   */
  serializeUser (fn: Authenticator.Serializer): void;
  serializeUser (user: any, done: Authenticator.SerializeCallback): void;
  serializeUser (user: any, req: any, done: Authenticator.SerializeCallback): void;

  /**
   * Registers a function used to deserialize user objects out of the session.
   *
   * Examples:
   *
   *     passport.deserializeUser(function(id, done) {
   *       User.findById(id, function (err, user) {
   *         done(err, user);
   *       });
   *     });
   */
  deserializeUser (fn: Authenticator.Deserializer): void;
  deserializeUser (obj: any, done: Authenticator.DeserializeCallback): void;
  deserializeUser (obj: any, req: any, done: Authenticator.DeserializeCallback): void;

  /**
   * Registers a function used to transform auth info.
   *
   * In some circumstances authorization details are contained in authentication
   * credentials or loaded as part of verification.
   *
   * For example, when using bearer tokens for API authentication, the tokens may
   * encode (either directly or indirectly in a database), details such as scope
   * of access or the client to which the token was issued.
   *
   * Such authorization details should be enforced separately from authentication.
   * Because Passport deals only with the latter, this is the responsiblity of
   * middleware or routes further along the chain.  However, it is not optimal to
   * decode the same data or execute the same database query later.  To avoid
   * this, Passport accepts optional `info` along with the authenticated `user`
   * in a strategy's `success()` action.  This info is set at `req.authInfo`,
   * where said later middlware or routes can access it.
   *
   * Optionally, applications can register transforms to proccess this info,
   * which take effect prior to `req.authInfo` being set.  This is useful, for
   * example, when the info contains a client ID.  The transform can load the
   * client from the database and include the instance in the transformed info,
   * allowing the full set of client properties to be convieniently accessed.
   *
   * If no transforms are registered, `info` supplied by the strategy will be left
   * unmodified.
   *
   * Examples:
   *
   *     passport.transformAuthInfo(function(info, done) {
   *       Client.findById(info.clientID, function (err, client) {
   *         info.client = client;
   *         done(err, info);
   *       });
   *     });
   */
  transformAuthInfo (fn: Authenticator.Transformer): void;
  transformAuthInfo (info: any, done: Authenticator.TransformCallback): void;
  transformAuthInfo (info: any, req: any, done: Authenticator.TransformCallback): void;

  /**
   * Return strategy with given `name`.
   */
  _strategy (name: string): Strategy;
}

declare namespace Authenticator {
  export interface Framework <InitializeOptions, InitializeReturn, AuthenticateOptions, AuthenticateCallback, AuthenticateReturn, AuthorizeOptions, AuthorizeCallback, AuthorizeReturn> {
    initialize (
      passport: Authenticator<
        InitializeOptions,
        InitializeReturn,
        AuthenticateOptions,
        AuthenticateCallback,
        AuthenticateReturn,
        AuthorizeOptions,
        AuthorizeCallback,
        AuthorizeReturn
      >,
      options?: InitializeOptions
    ): InitializeReturn;
    authenticate (
      passport: Authenticator<
        InitializeOptions,
        InitializeReturn,
        AuthenticateOptions,
        AuthenticateCallback,
        AuthenticateReturn,
        AuthorizeOptions,
        AuthorizeCallback,
        AuthorizeReturn
      >,
      name: string | string[],
      options?: AuthenticateOptions,
      callback?: AuthenticateCallback
    ): AuthenticateReturn;
    authorize? (
      passport: Authenticator<
        InitializeOptions,
        InitializeReturn,
        AuthenticateOptions,
        AuthenticateCallback,
        AuthenticateReturn,
        AuthorizeOptions,
        AuthorizeCallback,
        AuthorizeReturn
      >,
      name: string | string[],
      options?: AuthorizeOptions,
      callback?: AuthorizeCallback
    ): AuthorizeReturn;
  }

  export interface InitializeOptions {
    /**
     * Property to set on `req` upon login, defaults to _user_.
     */
    userProperty?: string;
  }

  export interface Serializer {
    (user: any, cb: SerializeCallback): void;
    (req: any, user: any, cb: SerializeCallback): void;
  }

  export interface SerializeCallback {
    (err: Error | 'pass' | null, obj: any): void;
  }

  export interface Deserializer {
    (user: any, cb: DeserializeCallback): void;
    (req: any, user: any, cb: DeserializeCallback): void;
  }

  export interface DeserializeCallback {
    (err: Error | 'pass' | null, obj: any | false | null): void;
  }

  export interface Transformer {
    (info: any): void;
    (info: any, cb: TransformCallback): void;
    (req: any, info: any, cb: TransformCallback): void;
  }

  export interface TransformCallback {
    (err: Error | 'pass' | null, info: any): void;
  }
}

export = Authenticator;
