import { test as base, Page } from '@playwright/test';
import { HamburgerMenu } from '../hamburger-menu.page';
import { InventoryPage } from '../inventory.page';
import { LoginPage } from '../login.page';
import { ItemDetailsPage } from '../itemDetails.page';
import { getAIAnalysis } from '../../utils/ai-analysis.utils';

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
    await inventoryPage.navigateTo();
    await use(inventoryPage);
  },

  loginPage: async ({ page }, use) => {
    const loginPage = new LoginPage(page);
    await use(loginPage);
  },
});

/**
 * Global AfterEch Hook that runs for any test that has FAILED.
 * It sends the failure details to an AI Model for analysis and
 * attaches the results to the test reports.
 *
 * Results should include a suggested fix and confidence level as
 * well as categorize the failure into one of various predefined buckets.
 */
test.afterEach(async ({}, testInfo) => {
  if (testInfo.status === 'failed') {
    const analysis = await getAIAnalysis(testInfo);
    testInfo.attach('AI Failure Analysis', { body: analysis, contentType: 'text/plain' });
  }
});

export { expect } from '@playwright/test';
