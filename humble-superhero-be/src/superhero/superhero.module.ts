import { Module } from '@nestjs/common';
import { DatabaseMongoMongooseModule } from '../database/mongo/database.mongo.mongoose.module';
import { SuperheroModel, SuperheroSchema } from './entity/superhero.model';
import { SuperheroController } from './superhero.controller';
import { SuperheroRepository } from './superhero.repository';
import { SuperheroService } from './superhero.service';

@Module({
  imports: [DatabaseMongoMongooseModule.forFeature([{ name: SuperheroModel.name, schema: SuperheroSchema }])],
  controllers: [SuperheroController],
  providers: [SuperheroRepository, SuperheroService],
})
export class SuperheroModule {}
