import { IncomingMessage, ServerResponse } from 'http';
import { Passport } from '../framework/connect';

/**
 * Authenticates requests.
 *
 * Applies the `name`ed strategy (or strategies) to the incoming request, in
 * order to authenticate the request.  If authentication is successful, the user
 * will be logged in and populated at `req.user` and a session will be
 * established by default.  If authentication fails, an unauthorized response
 * will be sent.
 *
 * An optional `callback` can be supplied to allow the application to override
 * the default manner in which authentication attempts are handled.  The
 * callback has the following signature, where `user` will be set to the
 * authenticated user on a successful authentication attempt, or `false`
 * otherwise.  An optional `info` argument will be passed, containing additional
 * details provided by the strategy's verify callback - this could be information about
 * a successful authentication or a challenge message for a failed authentication.
 * An optional `status` argument will be passed when authentication fails - this could
 * be a HTTP response code for a remote authentication failure or similar.
 *
 *     app.get('/protected', function(req, res, next) {
 *       passport.authenticate('local', function(err, user, info, status) {
 *         if (err) { return next(err) }
 *         if (!user) { return res.redirect('/signin') }
 *         res.redirect('/account');
 *       })(req, res, next);
 *     });
 *
 * Note that if a callback is supplied, it becomes the application's
 * responsibility to log-in the user, establish a session, and otherwise perform
 * the desired operations.
 *
 * Examples:
 *
 *     passport.authenticate('local', { successRedirect: '/', failureRedirect: '/login' });
 *
 *     passport.authenticate('basic', { session: false });
 *
 *     passport.authenticate('twitter');
 */
declare function authenticate (passport: Passport, name: string | string[], callback: authenticate.Callback): authenticate.Return;
declare function authenticate (passport: Passport, name: string | string[], options: authenticate.Options, callback: authenticate.Callback): authenticate.Return;

declare namespace authenticate {
  export interface Options {
    /**
     * Save login state in session, defaults to _true_.
     */
    session?: boolean;
    /**
     * After successful login, redirect to given URL.
     */
    successRedirect?: string;
    /**
     * True to store success message in
     * req.session.messages, or a string to use as override
     * message for success.
     */
    successMessage?: string;
    /**
     * True to flash success messages or a string to use as a flash
     * message for success (overrides any from the strategy itself).
     */
    successFlash?: boolean;
    /**
     * After failed login, redirect to given URL.
     */
    failureRedirect?: string;
    /**
     * True to store failure message in
     * req.session.messages, or a string to use as override
     * message for failure.
     */
    failureMessage?: string;
    /**
     * True to flash failure messages or a string to use as a flash
     * message for failures (overrides any from the strategy itself).
     */
    failureFlash?: boolean;
    /**
     * Assign the object provided by the verify callback to given property.
     */
    assignProperty?: string;
  }

  export interface Callback {
    (err: Error | null, user: any, challenge: string, status: string): void;
  }

  export interface Return {
    (req: IncomingMessage, res: ServerResponse, next: (err?: Error) => void): void;
  }
}

export = authenticate;
