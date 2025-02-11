import { Injectable } from '@nestjs/common';
import { SuperheroCreateDto } from './dto/superhero.create.dto';
import { Superhero } from './superhero';
import { SuperheroRepository } from './superhero.repository';

@Injectable()
export class SuperheroService {
  constructor(private readonly repository: SuperheroRepository) {}

  async findMany(): Promise<Superhero[]> {
    return this.repository.findMany('desc');
  }

  async create(createDto: SuperheroCreateDto): Promise<Superhero> {
    return this.repository.create(createDto);
  }
}
