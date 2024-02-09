import { Module } from '@nestjs/common';
import { DatabaseService } from './database.service';

/* @global() 
if you have to import the same set of modules everywhere
not good design
*/ 
@Module({
  providers: [DatabaseService],
  exports: [DatabaseService]
})
export class DatabaseModule {}
