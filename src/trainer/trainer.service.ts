import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { DatabaseService } from 'src/database/database.service';
import { NotFoundException } from '@nestjs/common';

@Injectable()
export class TrainerService {
  constructor(private readonly databaseService: DatabaseService) { }

  async create(createTrainerDto: Prisma.TrainerCreateInput) {
    return this.databaseService.trainer.create({
      data: createTrainerDto
    });
  }

  async findAll(role?: 'BASIC_TRAINER' | 'BEHAVIOR_SPECIALIST' | 'PUPPY_TRAINER' | 'ADULT_DOG_TRAINER' | 'SERVICE_DOG_TRAINER') {
    if (role) {
      const rolesArray = this.databaseService.trainer.findMany({
      // return this.databaseService.trainer.findMany({
        where: {
          role,
        }
      });
      if (!(await rolesArray).length) throw new NotFoundException('Trainer Role Not Found')
      return rolesArray
    }
    return this.databaseService.trainer.findMany()
  }

  async findOne(id: number) {
    const trainer = this.databaseService.trainer.findFirst({
      where: {
        // id: id same name use comma
        id,
      }
    });
    if (!trainer) throw new NotFoundException("Trainer Not Found")
    return trainer
  }

  async update(id: number, updateTrainerDto: Prisma.TrainerUpdateInput) {
    return this.databaseService.trainer.update({
      where: {
        id,
      },
      data: updateTrainerDto
    });
  }

  async remove(id: number) {
    return this.databaseService.trainer.delete({
      where: {
        // id: id same name use comma
        id,
      }
    });
  }
}
