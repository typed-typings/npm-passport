/**
 * Initiate a login session for `user`.
 *
 * Examples:
 *
 *     req.logIn(user, { session: false });
 *
 *     req.logIn(user, function(err) {
 *       if (err) { throw err; }
 *       // session saved
 *     });
 */
export function logIn (user: any, done: (err?: Error | null) => void): void;
export function logIn (user: any, options: LogInOptions, done: (err?: Error | null) => void): void;

export interface LogInOptions {
  /**
   * Save login state in session, defaults to _true_.
   */
  session?: boolean;
}

/**
 * Terminate an existing login session.
 */
export function logOut (): void;

/**
 * Test if request is authenticated.
 */
export function isAuthenticated (): boolean;

/**
 * Test if request is unauthenticated.
 */
export function isUnauthenticated (): boolean;
