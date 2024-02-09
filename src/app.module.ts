import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DogsModule } from './dogs/dogs.module';
import { DatabaseModule } from './database/database.module';
import { TrainerModule } from './trainer/trainer.module';
import { ThrottlerModule, ThrottlerGuard } from '@nestjs/throttler';
import { APP_GUARD } from '@nestjs/core';
import { MyLoggerModule } from './my_logger/my_logger.module';

@Module({
  imports: [
    DogsModule,
    DatabaseModule,
    TrainerModule,
    ThrottlerModule.forRoot([
      {
        name: "short", 
        ttl: 60000,
        limit: 3,
      },
      {
        name: "long", 
        ttl: 60000,
        limit: 10,
      },
    ]),
    MyLoggerModule,
  ],

  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
  ],
})
export class AppModule { }
