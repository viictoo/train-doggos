import { Body, Controller, Delete, Get, Param, ParseIntPipe, ValidationPipe, Patch, Post, Query } from '@nestjs/common';
import { DogsService } from './dogs.service';
import { Prisma } from '@prisma/client';

// decorator: this will handle the dogs route
// functions prefixed with the @ symbol:
// run automatically when called

@Controller('dogs')
export class DogsController {
  constructor(private readonly dogsService: DogsService) {}
  /*
  GET /dogs
  GET /dogs/:id
  POST /dogs
  PATCH /dogs:id
  DELETE /dogs/:id
  */
 @Get()
 findAll(@Query('role') role?: 'GUARD' | 'PET' | 'HUNTER' | 'SEARCH_AND_RESCUE' | 'SERVICE'){
  return this.dogsService.findAll(role)
}

 @Get(':id')
 findOne(@Param('id', ParseIntPipe) id: number){
  return this.dogsService.findOne(id)
 }

@Post()
create(@Body(ValidationPipe) createDogDto: Prisma.DogsCreateInput){
  return this.dogsService.create(createDogDto)
}
@Patch(':id')
update(@Param('id', ParseIntPipe) id: number, @Body(ValidationPipe) updateDogDto: Prisma.DogsCreateInput) {
  return this.dogsService.update(id, updateDogDto)
}

@Delete(':id')
delete(@Param('id', ParseIntPipe) id: number) {
  return this.dogsService.remove(id)
}
}