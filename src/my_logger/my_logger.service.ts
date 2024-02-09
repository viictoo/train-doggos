import { ConsoleLogger, Injectable } from '@nestjs/common';
import e from 'express';

@Injectable()
export class MyLoggerService extends ConsoleLogger {
  log(message: any, context?: string) {
    const entry = `${context}\t${message}`
    console.log(entry);
    super.log(message, context)
  }
  error(message: any, stackOrContext?: string) {
    const entry = `${stackOrContext}\t${message}`
    console.log(entry);
    super.error(message, stackOrContext)
  }
}
