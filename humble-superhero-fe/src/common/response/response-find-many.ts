import { Entity } from '../entity/entity';

export interface ResponseFindMany<T extends Entity> {
  data: T[];
}
