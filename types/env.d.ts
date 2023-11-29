export {};

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      BROWSER: 'chrome' | 'firefox' | 'webkit';
      ENV: 'test' | 'dev' | 'prod';
      HEADLESS: 'true' | 'false';
    }
  }
}
