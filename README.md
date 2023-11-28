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

## Tests

| Type | Location                           |
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
