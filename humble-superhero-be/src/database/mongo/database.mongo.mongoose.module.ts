import { DynamicModule, Module } from '@nestjs/common';
import { ModelDefinition, MongooseModule } from '@nestjs/mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';

// in-memory MongoDB server
@Module({
  imports: [
    MongooseModule.forRootAsync({
      useFactory: async () => {
        const mongoServer = await MongoMemoryServer.create();
        const uri = mongoServer.getUri();
        return {
          uri,
        };
      },
    }),
  ],
})
export class DatabaseMongoMongooseModule {
  static forFeature(models: ModelDefinition[]): DynamicModule {
    return MongooseModule.forFeature(models);
  }
}
