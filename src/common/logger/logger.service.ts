import { ConsoleLogger, Injectable, Scope } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ApmSpanAllMethods } from 'src/common/decorators/apm.decorator';

@ApmSpanAllMethods()
@Injectable({ scope: Scope.TRANSIENT })
export class PpLoggerService extends ConsoleLogger {
  constructor(private configservice: ConfigService) {
    super();
    const levels = this.configservice.get('log_levels');
    this.setLogLevels(levels);
  }
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
}

export interface PpLogger extends PpLoggerService {}
