import { test as base, Page } from '@playwright/test';
import { HamburgerMenu } from '../hamburger-menu';
import { InventoryPage } from '../inventory.page';
import { LoginPage } from '../login.page';

type Fixtures = {
    page: Page;
    hamburgerMenu: HamburgerMenu;
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