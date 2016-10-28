import Strategy = require('passport-strategy');

declare class SessionStrategy extends Strategy {
  name: 'session';

  /**
   * Authenticate request based on the current session state.
   *
   * The session authentication strategy uses the session to restore any login
   * state across requests.  If a login session has been established, `req.user`
   * will be populated with the current user.
   *
   * This strategy is registered automatically by Passport.
   */
  authenticate (req: Strategy.Request, options?: SessionStrategy.Options): void;
}

declare namespace SessionStrategy {
  export interface Options {
    /**
     * Pause the request stream before deserializing the user
     * object from the session.  Defaults to _false_.  Should
     * be set to true in cases where middleware consuming the
     * request body is configured after passport and the
     * deserializeUser method is asynchronous.
     */
    pauseStream?: boolean;
  }
}

export = SessionStrategy;
