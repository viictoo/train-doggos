import { Module } from '@nestjs/common';
import { MyLoggerService } from './my_logger.service';

@Module({
  providers: [MyLoggerService],
  exports: [MyLoggerModule]
})
export class MyLoggerModule {


}
