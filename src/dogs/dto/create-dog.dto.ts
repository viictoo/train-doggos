// input validation type ( DTO )
import { IsString , IsEnum, IsNotEmpty } from "class-validator";
export class CreateDogDto {
  @IsString()
  @IsNotEmpty()
  name: string;
  age: number;
  @IsEnum(['GUARD', 'PET', 'HUNTER', 'SEARCH_AND_RESCUE', 'SERVICE'])
  role: 'GUARD' | 'PET' | 'HUNTER' | 'SEARCH_AND_RESCUE' | 'SERVICE';
}


