import { Page } from 'playwright';
import { LoginPage } from '../../pages/login.page.ts';

export async function loginFlow(page: Page, loginPage: LoginPage) {
  loginPage = new LoginPage(page);
  const USERNAME = 'standard_user';
  const PASSWORD = 'secret_sauce';

  await page.goto('https://www.saucedemo.com/');
  await loginPage.login(USERNAME, PASSWORD);
}
