import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Superhero } from '../superhero';
import { SuperheroSuperpower } from '../superhero.superpower';

@Schema({ versionKey: false })
export class SuperheroModel extends Document implements Omit<Superhero, 'id'> {
  @Prop()
  name: string;

  @Prop()
  superpower: SuperheroSuperpower;

  @Prop()
  humilityScore: number;
}

export const SuperheroSchema = SchemaFactory.createForClass(SuperheroModel);
