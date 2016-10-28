import { IncomingMessage, ServerResponse } from 'http';
import { Passport } from '../framework/connect';

declare function initialize (passport: Passport): initialize.Return;

declare namespace initialize {
  export interface Return {
    (req: IncomingMessage, res: ServerResponse, next: (err?: Error) => void): void;
  }
}

export = initialize;
