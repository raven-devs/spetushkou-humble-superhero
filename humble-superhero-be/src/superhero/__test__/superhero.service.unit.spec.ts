import { Test, TestingModule } from '@nestjs/testing';
import { SuperheroCreateDto } from '../dto/superhero.create.dto';
import { Superhero } from '../superhero';
import { SuperheroRepository } from '../superhero.repository';
import { SuperheroService } from '../superhero.service';
import { SuperheroSuperpower } from '../superhero.superpower';

describe(`SuperheroService.unit`, () => {
  let service: SuperheroService;
  let repository: SuperheroRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SuperheroService,
        {
          provide: SuperheroRepository,
          useValue: {
            findMany: jest.fn(),
            create: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<SuperheroService>(SuperheroService);
    repository = module.get<SuperheroRepository>(SuperheroRepository);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findMany', () => {
    it('should return an array of superheroes', async () => {
      const mockSuperheroes: Superhero[] = [
        {
          _id: '67ab0c7115ccd6070520b059',
          name: 'Hero 1',
          superpower: SuperheroSuperpower.VibraniumShield,
          humilityScore: 10,
        },
        {
          _id: '67ab0c7215ccd6070520b05b',
          name: 'Hero 2',
          superpower: SuperheroSuperpower.AdamantiumSkeletonandClaws,
          humilityScore: 8,
        },
      ];

      jest.spyOn(repository, 'findMany').mockResolvedValue(mockSuperheroes);

      const result = await service.findMany();
      expect(result).toEqual(mockSuperheroes);
      expect(repository.findMany).toHaveBeenCalledWith('desc');
    });
  });

  describe('create', () => {
    it('should successfully create a superhero', async () => {
      const createDto: SuperheroCreateDto = {
        name: 'Hero 1',
        superpower: SuperheroSuperpower.ControlofThunder,
        humilityScore: 10,
      };
      const mockSuperhero: Superhero = {
        _id: '67ab0c7215ccd6070520b05b',
        name: 'Hero 1',
        superpower: SuperheroSuperpower.ControlofThunder,
        humilityScore: 10,
      };

      jest.spyOn(repository, 'create').mockResolvedValue(mockSuperhero);

      const result = await service.create(createDto);
      expect(result).toEqual(mockSuperhero);
      expect(repository.create).toHaveBeenCalledWith(createDto);
    });
  });
});
