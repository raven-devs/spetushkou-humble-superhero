import { Body, Controller, Get, Post } from '@nestjs/common';
import { SuperheroCreateDto } from './dto/superhero.create.dto';
import { Superhero } from './superhero';
import { SuperheroService } from './superhero.service';

@Controller('superheroes')
export class SuperheroController {
  constructor(private readonly service: SuperheroService) {}

  @Get()
  async findMany(): Promise<{ data: Superhero[] }> {
    const entities = await this.service.findMany();
    return { data: entities };
  }

  @Post()
  async create(@Body() createDto: SuperheroCreateDto): Promise<Superhero> {
    return this.service.create(createDto);
  }
}
