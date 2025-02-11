import { SuperheroSuperpower } from './SuperheroSuperpower';

export interface Superhero {
  _id: unknown;
  name: string;
  superpower: SuperheroSuperpower;
  humilityScore: number;
}
