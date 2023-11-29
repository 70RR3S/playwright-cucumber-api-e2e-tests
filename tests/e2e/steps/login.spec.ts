import {
  Given,
  When,
  Then,
  setDefaultTimeout,
  DataTable,
} from '@cucumber/cucumber';
import LoginPage from '../../../pages/loginPage';
import { fixture } from '../../../hooks/hooks';

let loginPage: LoginPage;
setDefaultTimeout(60 * 1000);

Given('I am on the login page of the Book Store', async () => {
  loginPage = new LoginPage(fixture.page);
  await loginPage.visitLogin();
});

When('enter my credentials', async (dataTable: DataTable) => {
  const user = dataTable.rows()[0][0];
  const password = dataTable.rows()[0][1];
  await loginPage.doLogin(user, password);
});

Then(
  'I should see my user {string} in the home of the Book Store',
  async (user: string) => {
    await loginPage.checkLoggedIn(user);
  },
);
