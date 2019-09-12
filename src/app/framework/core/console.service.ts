import { Injectable } from '@angular/core';

import { Console } from './models/console';

@Injectable()
export class ConsoleService implements Console {
  log(m: any, c?: any): void {
    if (!console.log) {
      // tslint:disable-line:no-console
      return;
    } else if (c) {
      console.log(m, c); // tslint:disable-line:no-console
    } else {
      console.log(m); // tslint:disable-line:no-console
    }
  }

  debug(m: any, c?: any): void {
    if (!console.debug) {
      // tslint:disable-line:no-console
      return;
    } else if (c) {
      console.debug(m, c); // tslint:disable-line:no-console
    } else {
      console.debug(m); // tslint:disable-line:no-console
    }
  }

  error(m: any, c?: any): void {
    if (!console.error) {
      return;
    } else if (c) {
      console.error(m, c);
    } else {
      console.error(m);
    }
  }

  warn(m: any, c?: any): void {
    if (!console.warn) {
      return;
    } else if (c) {
      console.warn(m, c);
    } else {
      console.warn(m);
    }
  }

  info(m: any, c?: any): void {
    if (!console.info) {
      // tslint:disable-line:no-console
      return;
    } else if (c) {
      console.info(m, c); // tslint:disable-line:no-console
    } else {
      console.info(m); // tslint:disable-line:no-console
    }
  }
}
