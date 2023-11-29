import { BeforeAll, AfterAll, Before, After, Status } from '@cucumber/cucumber';
import {
  Browser,
  BrowserContext,
  request,
  APIRequestContext,
} from '@playwright/test';
import { getEnv } from '../env/env';
import { invokeBrowser } from './browserManager';
import DB from '../hooks/dataBaseManager';
export const db = new DB();

let browser: Browser;
let browserContext: BrowserContext;
let apiContext: APIRequestContext;

// Fixture to store references to the page and the API context during the execution of the scenarios
export const fixture = {
  //@ts-ignore
  page: undefined as Page,
  api: undefined as APIRequestContext,
};

BeforeAll(async function () {
  getEnv();
  browser = await invokeBrowser();
});

Before(async function () {
  apiContext = await request.newContext({
    baseURL: process.env.BASE_URL_API,
  });
  browserContext = await browser.newContext({
    recordVideo: {
      dir: 'test-results/videos',
    },
  });
  const page = await browserContext.newPage();
  fixture.page = page;
  fixture.api = apiContext;
});

After(async function ({ pickle, result }) {
  let videoPath: string;
  let img: Buffer;
  if (result?.status == Status.PASSED) {
    img = await fixture.page.screenshot({
      path: `./test-results/screenshots/${pickle.name}.png`,
      type: 'png',
    });
    videoPath = await fixture.page.video().path();
  }
  await fixture.page.close();
  await browserContext.close();
});

AfterAll(async function () {
  await browser.close();
  await db.closeConnection();
});
