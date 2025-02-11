import { SuperheroSuperpower } from './superhero.superpower';

export interface Superhero {
  _id: unknown;
  name: string;
  superpower: SuperheroSuperpower;
  humilityScore: number;
}
