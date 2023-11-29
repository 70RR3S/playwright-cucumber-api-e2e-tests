import { Locator, Page, expect } from '@playwright/test';

export default class LoginPage {
  readonly page: Page;
  readonly userNameInput: Locator;
  readonly passwordInput: Locator;
  readonly loginButton: Locator;
  readonly userNewButton: Locator;
  readonly userLoggedIn: Locator;

  constructor(page: Page) {
    this.page = page;
    this.userNameInput = page.locator('#userName');
    this.passwordInput = page.locator('#password');
    this.loginButton = page.locator('#login');
    this.userNewButton = page.locator('#newUser');
    this.userLoggedIn = page.locator('#userName-value');
  }

  async visitLogin() {
    await this.page.goto(`${process.env.BASE_URL}/login`);
  }

  async enterUserName(user: string) {
    await this.userNameInput.fill(user);
  }

  async enterPassword(password: string) {
    await this.passwordInput.fill(password);
  }

  async doLogin(user: string, password: string) {
    await this.enterUserName(user);
    await this.enterPassword(password);
    await this.loginButton.click();
  }

  async checkLoggedIn(user: string) {
    await expect(this.userLoggedIn).toHaveText(user);
  }
}
