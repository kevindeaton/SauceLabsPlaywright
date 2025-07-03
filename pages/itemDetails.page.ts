import { Locator, Page } from '@playwright/test';

export class ItemDetailsPage {
  readonly page: Page;

  readonly itemDetailsName: Locator;
  readonly itemDetailsDescription: Locator;
  readonly itemDetailsPrice: Locator;
  readonly addToCartButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.itemDetailsName = this.page.getByTestId('inventory-item-name');
    this.itemDetailsDescription = this.page.getByTestId('inventory-item-desc');
    this.itemDetailsPrice = this.page.getByTestId('inventory-item-price');
    this.addToCartButton = this.page.getByTestId('add-to-cart');
  }

  getItemDetailsName(): Locator {
    return this.itemDetailsName;
  }

  getItemDetailsDescription(): Locator {
    return this.itemDetailsDescription;
  }

  getItemDetailsPrice(): Locator {
    return this.itemDetailsPrice;
  }

  getAddToCartButton(): Locator {
    return this.addToCartButton;
  }
}
