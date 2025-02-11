import { ExceptionParser } from '../../common/exception/ExceptionParser';
import { HttpClient } from '../../common/httpClient/HttpClient';
import { ResponseFindMany } from '../../common/response/response-find-many';
import { Superhero } from './types/Superhero';
import { SuperheroCreateDto } from './types/SuperheroCreateDto';
import { SuperheroToken } from './types/SuperheroToken';

const create = async (createDto: SuperheroCreateDto): Promise<Superhero> => {
  try {
    const endpoint = `/${SuperheroToken.BaseUrl}`;

    const response = await HttpClient().post<Superhero>(endpoint, createDto);
    const { data } = response;

    return data;
  } catch (error) {
    return Promise.reject(ExceptionParser.parse(error));
  }
};

const findMany = async (): Promise<ResponseFindMany<Superhero>> => {
  try {
    const endpoint = `/${SuperheroToken.BaseUrl}`;

    const response = await HttpClient().get<ResponseFindMany<Superhero>>(endpoint);
    const { data } = response;

    return { data: data.data };
  } catch (error) {
    return Promise.reject(ExceptionParser.parse(error));
  }
};

export const SuperheroService = {
  create,
  findMany,
};
