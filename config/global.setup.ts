import { test, expect } from '../pages/fixtures/fixtures.ts';
import { STORAGE_STATE } from '../playwright.config.ts';

test('Loginand store Session', async ({ loginPage }) => {
  const USERNAME =
    process.env.VALID_USER ??
    (() => {
      throw new Error('VALID_USER is not defined');
    })();
  const PASSWORD =
    process.env.VALID_PASSWORD ??
    (() => {
      throw new Error('VALID_PASSWORD is not defined');
    })();

  // Navigate to the target URL
  await loginPage.navigateTo();
  await loginPage.login(USERNAME, PASSWORD);

  // Assert the expected outcome
  await expect(loginPage.page).toHaveURL('https://www.saucedemo.com/inventory.html');

  await loginPage.page.context().storageState({ path: STORAGE_STATE });
});
