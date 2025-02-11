import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import { Exception } from '../../common/exception/Exception';
import { ResponseFindMany } from '../../common/response/response-find-many';
import './Superhero.css';
import { SuperheroService } from './SuperheroService';
import { Superhero as SuperheroType } from './types/Superhero.ts';
import { SuperheroCreateDto } from './types/SuperheroCreateDto';
import { SuperheroSuperpower } from './types/SuperheroSuperpower';
import { SuperheroToken } from './types/SuperheroToken.ts';

export function Superhero() {
  // http client to communicate with backend
  const queryClient = useQueryClient();

  // component state for creating a new entity
  const [superhero, setSuperhero] = useState<SuperheroCreateDto>({
    name: '',
    superpower: SuperheroSuperpower.WallCrawling,
    humilityScore: 1,
  });

  // find many entities handler
  const {
    isLoading: superheroFindManyLoading,
    data: superheroFindManyResponse,
    error: superheroFindManyError,
  } = useQuery<ResponseFindMany<SuperheroType>, Exception>(
    [`${SuperheroToken.BaseUrl}`, 'findMany'],
    async () => await SuperheroService.findMany(),
    {
      enabled: true,
    },
  );
  const superheroCollection = superheroFindManyResponse?.data ?? [];

  // create entity handler
  const superheroSubmit = useMutation({
    mutationFn: (createDto: SuperheroCreateDto) => {
      return SuperheroService.create(createDto);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: [`${SuperheroToken.BaseUrl}`, 'findMany'] });
    },
  });
  const superheroSubmitError = superheroSubmit.error as Exception;
  const superheroSubmitLoading = superheroSubmit.isLoading;

  // form field input handler that updates the component state
  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setSuperhero((prevSuperhero) => ({
      ...prevSuperhero,
      [name]: name === 'humilityScore' ? parseInt(value, 10) : value,
    }));
  };

  // form field input handler that updates the component state
  const onSuperpowerChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = e.target;
    setSuperhero((prevSuperhero) => ({
      ...prevSuperhero,
      superpower: value as SuperheroSuperpower,
    }));
  };

  // submit handler
  const onSubmit = () => {
    superheroSubmit.mutate(superhero);
  };

  // component loading and error states
  const loading = superheroFindManyLoading || superheroSubmitLoading;
  const error = superheroFindManyError || superheroSubmitError;

  return (
    <>
      {loading && <div>Loading...</div>}

      <h1>Add a new Super Hero!</h1>

      <div>
        <div>
          <label htmlFor='name'>Name: </label>
          <input id='name' name='name' type='text' value={superhero.name} onChange={onInputChange} />
        </div>

        <div>
          <label htmlFor='superpower'>Superpower: </label>
          <select id='superpower' name='superpower' value={superhero.superpower} onChange={onSuperpowerChange}>
            {Object.values(SuperheroSuperpower).map((power) => (
              <option key={power} value={power}>
                {power}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor='humilityScore'>Humility Score: </label>
          <input
            id='humilityScore'
            name='humilityScore'
            type='number'
            min={1}
            max={10}
            value={superhero.humilityScore}
            onChange={onInputChange}
          />
        </div>
        <div className='card'>
          <button onClick={onSubmit}>Submit a new Super Hero!</button>
          {error && <div className='error'>{error.message}</div>}
        </div>
      </div>
      <h1>Super Heroes</h1>
      <div>
        {superheroCollection.map((superhero) => {
          return (
            <div
              key={superhero._id as string}
            >{`${superhero.name} with super power ${superhero.superpower} and humility score of ${superhero.humilityScore}`}</div>
          );
        })}
      </div>
    </>
  );
}
