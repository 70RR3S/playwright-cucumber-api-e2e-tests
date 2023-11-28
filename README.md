# Playwright-cucumber-api-e2e-tests

![playwright icon](https://playwright.dev/python/img/playwright-logo.svg)
![cucumber icon](https://avatars.githubusercontent.com/u/320565?s=280&v=4)

Automatización de pruebas utilizando Playwright y Cucumber.  
Simplifica tus pruebas de extremo a extremo y al backend de tu aplicación con escenarios escritos en lenguaje natural.

## Configuración del Proyecto

### Requisitos previos

Asegúrate de tener Node.js y npm instalados en tu sistema. Puedes instalarlos desde [https://nodejs.org/].

### Instalación de Dependencias

Ejecuta el siguiente comando para instalar las dependencias del proyecto:

```bash
npm install
```

## Base de Datos

Este proyecto te la posibilidad de establecer conexión con la base de datos en dev, testing o producción desde tus pruebas automatizadas. Esto es algo supremamente útil y hace que tus pruebas sean más robustas y seguras.

El archivo **dataBaseManager.ts** facilita la conexión y ejecución de consultas a la base de datos. La configuración se realiza mediante las variables de entorno en el archivo **.env.test.** Asegúrate de establecer estas variables antes de ejecutar las pruebas.

En los steps automatizados de cucumber puedes utilizar los metodos en el **dataBaseManager.ts** para interactuar con la base de datos, ejemplos:

```typescript
//Este step se ocupa de eliminar la data previa en la base de datos al ejecutar el test
//Es decir, yo siempre estoy registrando un nuevo usuario cada que ejecuto el escenario de crear usuario, sin importar que sea la misma data
Given('este usuario no ha sido procesado antes', async () => {
  await db.executeDeleteQuery(
    'historico_registro_usuarios',
    `id_usuario = '${usuario.getIdUsuario()}'`,
  );
  await db.executeDeleteQuery(
    'registro_usuarios',
    `id_usuario = '${usuario.getIdUsuario()}'`,
  );
});
```

```typescript
//Este step te permite validar los resultados desde la base de datos después de actualizar la data de un usuario
//Esto puede ser realmente util en pruebas apis
Then('el nuevo apellido del usuario debe ser {string}', async (string) => {
  await db
    .executeSelectQuery(
      ['last_name'],
      'registro_usuarios',
      `id_usuario = '${usuario.getIdUsuario()}'`,
    )
    .then((lastName) => {
      createUser.verifyLastName(lastName[0].last_name, string);
    });
});
```

Todos los metodos disponibles en el **dataBaseManager.ts** son:

- <span style="color:blue"> executeSelectQuery(columns: string[], table: string, condition: string, subQuery?: string): Promise<any[]> ></span>
- <span style="color:blue"> executeCountQuery(table: string, condition: string): Promise<number> ></span>
- <span style="color:blue"> executeUpdateQuery(table: string, updatedColumn: string, condition: string, subQuery?: string): Promise<void>></span>
- <span style="color:blue"> executeDeleteQuery(table: string, condition: string, subQuery?: string): Promise<void> ></span>
- <span style="color:blue"> wait(ms: number): Promise<void> ></span>

## Tests

| Tipo | Ubicación                          |
| ---- | ---------------------------------- |
| api  | [tests/api](./tests/api/features/) |
| ui   | [tests/e2e](./tests/e2e/features/) |

## Ejecución de pruebas

Para ejecutar las pruebas utiliza los siguientes comandos:

- Ejecuta las pruebas e2e CON interfaz

```json
"testing_e2e": "cross-env ENV=test HEADLESS=false cucumber-js -p e2e --config=config/cucumber.js || true",
```

- Ejecuta las pruebas api SIN interfaz

```json
"testing_e2e": "cross-env ENV=test HEADLESS=false cucumber-js -p e2e --config=config/cucumber.js || true",
```

si quiero le puedo pasar --TAGS="@etiquetaTest" desde la terminal o a cualquiera de los scripts para ejecutar solo los escenarios que tengan esa etiqueta

## Generación de reportes

El proyecto utiliza [multiple-cucumber-html-reporter] para generar reportes HTML después de ejecutar las pruebas.
Los reportes se generan en el directorio 'test-results'
