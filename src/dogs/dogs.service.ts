import { Injectable } from '@nestjs/common';
// import { CreateDogDto } from './dto/create-dog.dto';
// import { UpdateDogDto } from './dto/update-dog.dto';
import { NotFoundException } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class DogsService {
  constructor(private readonly databaseService: DatabaseService) { }

  private dogs = [
    {
      "id": 0,
      "name": "Chelsea",
      "age": 12,
      "role": "SEARCH_AND_RESCUE"
    },
    {
      "id": 1,
      "name": "Bob",
      "age": 14,
      "role": "PET"
    },
    {
      "id": 2,
      "name": "Kelsa",
      "age": 42,
      "role": "GUARD"
    },
    {
      "id": 3,
      "name": "Kiki",
      "age": 43,
      "role": "HUNTER"
    },
    {
      "id": 4,
      "name": "Rex",
      "age": 2,
      "role": "PET"
    },
    {
      "id": 5,
      "name": "Bob",
      "age": 4,
      "role": "GUARD"
    },
  ]

  async findAll(role?: 'GUARD' | 'PET' | 'HUNTER' | 'SEARCH_AND_RESCUE' | 'SERVICE') {
    if (role) {
      const rolesArray = this.databaseService.dogs.findMany({
        where: {
          role,
        }
      });
      if (!(await rolesArray).length) throw new NotFoundException('Dog Role Not Found')
      return rolesArray
    }
    return this.databaseService.dogs.findMany()
  }

  async findOne(id: number) {
    const dog = this.databaseService.dogs.findFirst({
      where: {
        id,
      }
    });
    if (!dog) throw new NotFoundException("Dog Not Found")
    return dog
  }

  // async create(createDogDto: CreateDogDto) {
  //   const dogsByHighestId = [...this.dogs].sort((a, b) => b.id - a.id)
  //   const newDog = {
  //     id: dogsByHighestId[0].id + 1,
  //     ...createDogDto
  //   }
  //   this.dogs.push(newDog)
  //   return newDog
  // }
  async create(createDogDto: Prisma.DogsCreateInput) {
    return this.databaseService.dogs.create({
      data: createDogDto
    });
  }

  // async update(id: Number, updateDogDto: Prisma.UpdateDogDto) {
  //   this.dogs = this.dogs.map(dog => {
  //     if (dog.id === id) {
  //       return { ...dog, ...updateDogDto }
  //     }
  //     return dog
  //   })
  //   return this.findOne(id)
  // }
  async update(id: number, updateDogDto: Prisma.DogsUpdateInput) {
    return this.databaseService.dogs.update({
      where: {
        id,
      },
      data: updateDogDto
    });
  }

//   async delete(id: number) {
//     const deletedDog = this.findOne(id)
//     this.dogs = this.dogs.filter(dog => dog.id !== id)
//     return deletedDog
//   }

async remove(id: number) {
  return this.databaseService.dogs.delete({
    where: {
      // id: id same name use comma
      id,
    }
  });
}
}
