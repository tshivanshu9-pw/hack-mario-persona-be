import { ConsoleLogger, Injectable, Scope } from '@nestjs/common';

@Injectable({ scope: Scope.TRANSIENT })
export class PpLoggerService extends ConsoleLogger {
  /**
   * Write a 'log' level log.
   */
  log(...messages: any[]) {
    const message = messages.join(' ');
    super.log(message);
  }

  /**
   * Write an 'error' level log.
   */
  error(...messages: any[]) {
    const message = messages.join(' ');
    super.error(message);
  }

  /**
   * Write a 'warn' level log.
   */
  warn(...messages: any[]) {
    const message = messages.join(' ');
    super.warn(message);
  }

  /**
   * Write a 'debug' level log.
   */
  debug(...messages: any[]) {
    const message = messages.join(' ');
    super.debug(message);
  }

  /**
   * Write a 'verbose' level log.
   */
  verbose(...messages: any[]) {
    const message = messages.join(' ');
    super.verbose(message);
  }
  // /**
  //  * Write a 'log' level log.
  //  */
  // log(message: any, ...optionalParams: any[]) {
  //   super.log(message, optionalParams);
  // }

  // /**
  //  * Write an 'error' level log.
  //  */
  // error(message: any, ...optionalParams: any[]) {
  //   super.error(message, optionalParams);
  // }

  // /**
  //  * Write a 'warn' level log.
  //  */
  // warn(message: any, ...optionalParams: any[]) {
  //   super.warn(message, optionalParams);
  // }

  // /**
  //  * Write a 'debug' level log.
  //  */
  // debug(message: any, ...optionalParams: any[]) {
  //   super.debug(message, optionalParams);
  // }

  // /**
  //  * Write a 'verbose' level log.
  //  */
  // verbose(message: any, ...optionalParams: any[]) {
  //   super.verbose(message, optionalParams);
  // }
}

export interface PpLogger extends PpLoggerService {}
