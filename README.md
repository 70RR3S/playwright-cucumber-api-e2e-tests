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

## Estructura del proyecto

El proyecto sigue la siguiente estructura de directorios:
.
├── config # Directorio que contiene los archivos de configuración
│ ├── cucumber.js # Archivo de configuración que define diferentes perfiles de ejecución para los test usando cucumber
├── env # Directorio que contiene los archivos para definir variables de entorno según el entorno de prueba
│ ├── .env.test
│ ├── .env.prod
├── hooks # Directorio que contiene los archivos para modular aspectos claves de los test automatizados
│ ├── browserManager.ts # Archivo para configurar el comportamiento del navegador
│ ├── dataBaseManager.ts # Archivo con la conexión a la BD y metodos para hacer consultas
│ ├── hooks.ts # Archivo con ganchos que se ejecutan en momentos especificos de las pruebas
├── interfaces # Directorio con archivos que sirven como plantillas para el cuerpo de las solicitudes
│ ├── sampleInterface.ts # Archivo ejemplo de una interfaz con setters and getters para las propiedades
├── pages # Directorio con archivos que encapsulan la logica de las solicitudes y la interacción con los elementos de la interfaz
│ ├── samplePomApi.ts # Archivo ejemplo donde se encapsula la logica de las solicitudes apis
│ ├── samplePomE2e.ts # Archivo ejemplo donde se interactua con los selectores de la interface
├── report # Directorio que contiene los archivos de configuración para los informes de cucumber
│ ├── report.ts # Archivo donde se perzonaliza el informe de cucumber
├── tests # Directorio que contiene los archivos de pruebas e2e y api
│ ├── api # Directorio donde estan las pruebas al backend de la aplicación
│ ├──├── sample.feature # Archivo de ejemplo con escenarios según las caracteristicas
│ ├──├── sample.spec.ts # Archivo de ejemplo con steps automatizados
│ ├── e2e # Directorio donde estan las pruebas a la interfaz de la aplicación
│ ├──├── sample.feature
│ ├──├── sample.spec.ts
├── utils
│ ├── apiEndoints.ts # Archivo con los endpoints asociados a diversas funcionalidades de la app
├── env.d.ts # archivo donde puedo tipar las variables de entorno
└── .eslintrc #archivo para configurar la manera en que ESlint analiza y verifica mi codigo
└── .azure-pipelines.yml
└── package.json

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
