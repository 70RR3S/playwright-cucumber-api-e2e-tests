import * as dotenv from 'dotenv';

//You get the variables so you can use them later
export const getEnv = () => {
  if (process.env.ENV) {
    dotenv.config({
      override: true,
      path: `env/.env.${process.env.ENV}`,
    });
  } else {
    console.error('No env variables passed!');
  }
};
