import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { SuperheroCreateDto } from './dto/superhero.create.dto';
import { SuperheroModel } from './entity/superhero.model';
import { Superhero } from './superhero';

@Injectable()
export class SuperheroRepository {
  constructor(@InjectModel(SuperheroModel.name) private readonly model: Model<SuperheroModel>) {}

  async findMany(sortOrder: 'asc' | 'desc' = 'asc'): Promise<Superhero[]> {
    return await this.model
      .find()
      .sort({ humilityScore: sortOrder === 'asc' ? 1 : -1 })
      .lean<Superhero[]>(true);
  }

  async create(createDto: SuperheroCreateDto): Promise<Superhero> {
    const entity = new this.model(createDto);
    const entitySaved = await entity.save();
    return entitySaved.toJSON() as Superhero;
  }
}
