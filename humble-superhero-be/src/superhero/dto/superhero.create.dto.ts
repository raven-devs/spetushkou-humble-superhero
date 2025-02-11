import { IsEnum, IsInt, IsNotEmpty, IsString, Max, Min } from 'class-validator';
import { Superhero } from '../superhero';
import { SuperheroSuperpower } from '../superhero.superpower';

export class SuperheroCreateDto implements Omit<Superhero, '_id'> {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsEnum(SuperheroSuperpower)
  superpower: SuperheroSuperpower;

  @IsInt()
  @Min(1)
  @Max(10)
  humilityScore: number;
}
