import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import request from 'supertest';
import { AppModule } from '../../app/app.module';
import { SuperheroCreateDto } from '../dto/superhero.create.dto';
import { SuperheroSuperpower } from '../superhero.superpower';

describe('SuperheroController.e2e', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('should create a superhero', async () => {
    const createDto: SuperheroCreateDto = {
      name: 'Hero 1',
      superpower: SuperheroSuperpower.AdamantiumSkeletonandClaws,
      humilityScore: 10,
    };

    const response = await request(app.getHttpServer()).post('/superheroes').send(createDto).expect(201);

    expect(response.body.name).toBe('Hero 1');
    expect(response.body.superpower).toBe('Adamantium Skeleton and Claws');
    expect(response.body.humilityScore).toBe(10);
  });
});
