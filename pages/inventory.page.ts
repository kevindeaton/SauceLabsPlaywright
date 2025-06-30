import { Locator, Page } from '@playwright/test';

export class InventoryPage {
  readonly page: Page;

  // Locators
  readonly inventoryItemsList: Locator;

  constructor(page: Page) {
    this.page = page;
    this.inventoryItemsList = this.page.locator('div.inventory_item');
  }

  async navigateTo(): Promise<void> {
    await this.page.goto('/inventory.html');
  }

  // Method to get the parent element based on label text
  getParentElementByLabelText(labelText: string): Locator {
    return this.inventoryItemsList.filter({
      has: this.page.locator(`div[data-test="inventory-item-name"]`, { hasText: labelText }),
    });
  }

  // Method to get the button within the parent element
  getButtonByLabelText(labelText: string): Locator {
    const parentLocator = this.getParentElementByLabelText(labelText);
    return parentLocator.locator('button[data-test^="add-to-cart-"]');
  }

  // Method to get the image within the parent element
  getImageByLabelText(labelText: string): Locator {
    const parentLocator = this.getParentElementByLabelText(labelText);
    return parentLocator.locator('img[data-test^="inventory-item-"]');
  }

  // Method to get the description within the parent element
  getDescriptionByLabelText(labelText: string): Locator {
    const parentLocator = this.getParentElementByLabelText(labelText);
    return parentLocator.locator('div[data-test="inventory-item-desc"]');
  }

  // Method to get the label header within the parent element
  getLabelHeaderByLabelText(labelText: string): Locator {
    const parentLocator = this.getParentElementByLabelText(labelText);
    return parentLocator.locator('div[data-test="inventory-item-name"]');
  }

  // Method to get the price within the parent element
  getPriceByLabelText(labelText: string): Locator {
    const parentLocator = this.getParentElementByLabelText(labelText);
    return parentLocator.locator('div[data-test="inventory-item-price"]');
  }
}
