import { Given, Then, When } from '@cucumber/cucumber';
import { User } from '../../../../interfaces/user';
import CreateUser from '../../../../pages/reqres-in/api/users/createUser';
const createUser = new CreateUser();
const user = new User();

Given('I am on the registration page and my name is {string}', (string) => {
  user.setName(string);
});

When('I work as an {string}', (string) => {
  user.setJob(string);
});

When('I create my user', async () => {
  await createUser.sendRequest(user.toJSON());
});

Then('The response code must be {int}', (int) => {
  createUser.verifyResponseCode(int);
});

Then('I should see my name {string} in the response', (string) => {
  createUser.verifyResponseName(string);
});
