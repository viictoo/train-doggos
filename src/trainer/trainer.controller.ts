import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  ParseIntPipe,
  ValidationPipe,
} from '@nestjs/common';
import { TrainerService } from './trainer.service';
import { Prisma } from '@prisma/client';
import { Throttle, SkipThrottle } from '@nestjs/throttler';

@SkipThrottle()
@Controller('trainer')
export class TrainerController {
  constructor(private readonly trainerService: TrainerService) { }

  @Post()
  create(@Body(ValidationPipe) createTrainerDto: Prisma.TrainerCreateInput) {
    return this.trainerService.create(createTrainerDto);
  }

  // rate limit this particular request
  @SkipThrottle({default: false})
  @Get()
  findAll(
    @Query('role')
    role?:
      | 'BASIC_TRAINER'
      | 'BEHAVIOR_SPECIALIST'
      | 'PUPPY_TRAINER'
      | 'ADULT_DOG_TRAINER'
      | 'SERVICE_DOG_TRAINER',
  ) {
    return this.trainerService.findAll(role);
  }

  // use customised throttle previously defined
  @Throttle({ short: {ttl: 10000, limit: 1}})
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.trainerService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: string,
    @Body(ValidationPipe) updateTrainerDto: Prisma.TrainerUpdateInput,
  ) {
    return this.trainerService.update(+id, updateTrainerDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.trainerService.remove(+id);
  }
}
