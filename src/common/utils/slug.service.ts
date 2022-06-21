import { Injectable } from '@nestjs/common';
import * as randomstring from 'randomstring';

@Injectable()
export class SlugService {
  private generateRandomKey(length = 6, charset = 'numeric') {
    return randomstring.generate({
      length: length,
      charset: charset, //alphanumeric
    });
  }

  createSlug(name: string) {
    if (!name) {
      name = this.generateRandomKey(6, 'abc');
    }
    return (
      name
        .replace(/&/g, 'and')
        .replace(/[\/\\#,@^+()$~%.'":*?<>{}]/g, '-')
        .split(/\s+/)
        .join('-')
        .toLowerCase() +
      '-' +
      this.generateRandomKey()
    );
  }
}
