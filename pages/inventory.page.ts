import { Locator, Page } from '@playwright/test';

export class InventoryPage {
  readonly page: Page;

  // Locators
  readonly inventoryItemsList: Locator;
  readonly sortDropdown: Locator;

  constructor(page: Page) {
    this.page = page;
    this.inventoryItemsList = this.page.locator('div.inventory_item');
    this.sortDropdown = this.page.getByTestId('product-sort-container');
  }

  async navigateTo(): Promise<void> {
    await this.page.goto('/inventory.html');
  }

  // Method to get the parent element based on label text
  getParentElementByLabelText(labelText: string): Locator {
    return this.inventoryItemsList.filter({
      has: this.page.getByTestId('inventory-item-name').filter({ hasText: labelText }),
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

  // Method to get the clickable link for an item by label text
  getItemLinkByLabelText(labelText: string): Locator {
    const parentLocator = this.getParentElementByLabelText(labelText);
    return parentLocator.locator('[data-test$="title-link"]');
  }

  /**
   * This method retrieves the names of all inventory items currently displayed on the inventory page.
   *
   * @returns An array of inventory item names displayed on the page.
   */
  async getInventoryItemNames(): Promise<Array<string>> {
    const itemElements = this.page.getByTestId('inventory-item-name');
    return itemElements.allInnerTexts();
  }

  // Methods to select a sorting option by value
  async selectSortingOption(optionValue: string): Promise<void> {
    await this.sortDropdown.selectOption(optionValue);
  }

  async selectSortByNameAZ(): Promise<void> {
    await this.selectSortingOption('az'); // Name (A to Z)
  }

  async selectSortByNameZA(): Promise<void> {
    await this.selectSortingOption('za'); // Name (Z to A)
  }

  async selectSortByPriceLowToHigh(): Promise<void> {
    await this.selectSortingOption('lohi'); // Price (low to high)
  }

  async selectSortByPriceHighToLow(): Promise<void> {
    await this.selectSortingOption('hilo'); // Price (high to low)
  }
}
