# Playwright-cucumber-api-e2e-tests

Test automation using Playwright and Cucumber.
Simplify your end-to-end and backend testing of your application with scenarios written in natural language.

![playwright icon](https://playwright.dev/python/img/playwright-logo.svg)
![cucumber icon](https://avatars.githubusercontent.com/u/320565?s=280&v=4)

## Project setup

### Previous requirements

Make sure you have Node.js and npm installed on your system. You can install them from [https://nodejs.org/].

### install dependencies

Run the following command to install the project dependencies:

```bash
npm install
```

## Database

This project gives you the possibility of establishing a connection with the database in dev, testing or production from your automated tests. This is extremely useful and makes your tests more robust and secure.

The **dataBaseManager.ts** file makes it easy to connect and execute queries to the database. Configuration is done using environment variables in the **.env.test** file, be sure to set these variables before running the tests.

In the cucumber automated steps, you can use the methods in the **dataBaseManager.ts** to interact with the database, examples:

```typescript
//This step takes care of removing the previous data in the database when running the test.
//I am always registering a new user every time I run the user creation scenario, it doesn't matter if it's the same data.
Given('this user has not been processed before', async () => {
  await db.executeDeleteQuery(
    'user_record_history',
    `user_id = '${user.getUserId()}'`,
  );
  await db.executeDeleteQuery('user_record', `user_id = '${user.getUserId()}'`);
});
```

```typescript
//This step allows you to validate results from the database after updating a user's data.
//This can be really useful in apis tests
Then('The users new last name must be {string}', async (string) => {
  await db
    .executeSelectQuery(
      ['lastname'],
      'registro_usuarios',
      `id_usuario = '${usuario.getIdUsuario()}'`,
    )
    .then((lastName) => {
      createUser.verifyLastName(lastName[0].lastname, string);
    });
});
```

All the methods available in **dataBaseManager** are:

- executeSelectQuery(columns: string[], table: string, condition: string, subQuery?: string): Promise<any[]>
- executeCountQuery(table: string, condition: string): Promise<number>
- executeUpdateQuery(table: string, updatedColumn: string, condition: string, subQuery?: string): Promise<void>
- executeDeleteQuery(table: string, condition: string, subQuery?: string): Promise<void>
- wait(ms: number): Promise<void>

## Tests

| Type | Location                           |
| ---- | ---------------------------------- |
| api  | [tests/api](./tests/api/features/) |
| ui   | [tests/e2e](./tests/e2e/features/) |

## Testing execution

To run the tests use the following commands:

- Run e2e tests WITH interface

```json
"testing_e2e": "cross-env ENV=test HEADLESS=false cucumber-js -p e2e --config=config/cucumber.js || true",
```

- Run api tests WITHOUT interface

```json
"testing_e2e": "cross-env ENV=test HEADLESS=false cucumber-js -p e2e --config=config/cucumber.js || true",
```

If I want I can pass --TAGS="@testTags" from the terminal or to any of the scripts to execute only the scenarios that have that tag

## Reports generation

The project uses [multiple-cucumber-html-reporter] to generate HTML reports after running the tests.
Reports are generated in the directory 'test-results'

When running any of the tests, e2e or api, 2 scripts are run by default:

```json
"pretest": "npx ts-node report/init.ts", removes previous results before the test is run
"posttest": "npx ts-node report/report.ts", generates the reports after running the test
```

![Generated report](test-results/reports/index.html)
