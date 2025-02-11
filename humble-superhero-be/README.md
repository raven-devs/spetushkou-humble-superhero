# humble-superhero-be

The backend is implemented with NestJS and the template I was using in my daily work. There is some code in the `src/common` folder, please do not pay attention to it. The rest of the code is related to the task. The in-memory db is impelmented with a MongoDB instance and the `mongodb-memory-server` package.

There are 2 tests: 1 unit test and 1 e2e test.

## How To Start

1. Install dependencies

```bash
npm install
```

2. Run the server in the Development mode

```bash
npm run start:dev
```

3. The server is running on port `8080` and ready to serve API's

```bash
GET http://localhost:8080/superheroes
POST http://localhost:8080/superheroes
```

4. Run tests

```bash
npm run test
```

## Note on how to improve or expand this task

1. Currently the app deals with the `_id` field. It is more common to work the `id` field when we receive data from a repository.
2. The repository should be implemented in a more common way to accept entities of other types. That can be done with interfaces, abstract classes and generics.

## If I had more time

1. The controller should return the `count` property in a response when fetching all entities.
2. The `findMany` method in the service should implement more general parameter when requesting filtered / sorted data from the repository. Currently the plain `sortOrder` is used.
