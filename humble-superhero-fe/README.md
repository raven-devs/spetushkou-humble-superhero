# humble-superhero-client

The client is implemented with React / Vite and the template I was using in my daily work. There is some code in the `src/common` folder, please do not pay attention to it. The rest of the code is related to the task.

## How To Start

1. Install dependencies

```bash
npm install
```

2. Run the app in the Development mode

```bash
npm run start:dev
```

3. Open the app in a browser

```bash
http://localhost:5173/
```

## Note on how to improve or expand this task

1. The superhero component can be splitted into 2 separate component - one that is responsable for creating a new entity and another - for listing entites. Currently the superhero component contains both logic for creating and displaying entities.
2. When creating a new entity a more robust validation is required. For example, it is possible to enter the `humilityScore` value that is more than 10. Also it is possible to provide an empty value for the `superpower` field. It would be more appropriate to fail early and do not send invalid data to the server for the validation purpose.

## If I had more time

1. Improve the error handler.
