import { Superhero } from './Superhero';

export type SuperheroCreateDto = Omit<Superhero, '_id'>;
