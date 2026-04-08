import { test, expect } from '../../pages/fixtures/fixtures.page.ts';
import * as allure from 'allure-js-commons';
import { setAllureAnnotations } from '../../utils/allure.utils.ts';

test('Hamburger Menu should expand and show all options when clicked', async ({ hamburgerMenu, inventoryPage }) => {
  await setAllureAnnotations('Hamburger Menu', 'Regression', allure.Severity.NORMAL);

  await inventoryPage.navigateTo();
  await hamburgerMenu.openHamburgerMenu();

  // Assert that the menu is open
  await expect(hamburgerMenu.allItemsButton).toBeVisible();
  await expect(hamburgerMenu.aboutButton).toBeVisible();
  await expect(hamburgerMenu.logoutButton).toBeVisible();
});

test('Session should be cleared when Logout is clicked', async ({ hamburgerMenu, inventoryPage, loginPage }) => {
  await setAllureAnnotations('Hamburger Menu', 'Regression', allure.Severity.NORMAL);

  await inventoryPage.navigateTo();
  await hamburgerMenu.openHamburgerMenu();

  // Click the logout button
  await hamburgerMenu.clickLogout();

  // Assert that the user is redirected to the login page
  await expect(loginPage.usernameInput).toBeVisible();
  await expect(loginPage.passwordInput).toBeVisible();
});
