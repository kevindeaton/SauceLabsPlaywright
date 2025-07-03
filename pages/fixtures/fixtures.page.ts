import { test as base, Page } from '@playwright/test';
import { HamburgerMenu } from '../hamburger-menu.page';
import { InventoryPage } from '../inventory.page';
import { LoginPage } from '../login.page';
import { ItemDetailsPage } from '../itemDetails.page';

type Fixtures = {
  page: Page;
  hamburgerMenu: HamburgerMenu;
  itemDetailsPage: ItemDetailsPage;
  inventoryPage: InventoryPage;
  loginPage: LoginPage;
};

export const test = base.extend<Fixtures>({
  page: async ({ page }, use) => {
    await use(page);
  },

  hamburgerMenu: async ({ page }, use) => {
    const hamburgerMenu = new HamburgerMenu(page);
    await use(hamburgerMenu);
  },

  itemDetailsPage: async ({ page }, use) => {
    const itemDetailsPage = new ItemDetailsPage(page);
    await use(itemDetailsPage);
  },

  inventoryPage: async ({ page }, use) => {
    const inventoryPage = new InventoryPage(page);
    await use(inventoryPage);
  },

  loginPage: async ({ page }, use) => {
    const loginPage = new LoginPage(page);
    await use(loginPage);
  },
});

export { expect } from '@playwright/test';
