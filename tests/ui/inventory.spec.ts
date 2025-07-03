import { test, expect } from '../../pages/fixtures/fixtures.page.ts';
import { InventoryDetails, inventoryDetails } from '../../test-data/inventory-details.ts';
import {
  sortByNameAlphabetically,
  sortByNameReverseAlphabetically,
  sortByPriceHighToLow,
  sortByPriceLowToHigh,
} from '../../utils/sorting.utils.ts';

test.describe('Verify Inventory Details', () => {
  test.beforeEach(async ({ inventoryPage }) => {
    await inventoryPage.navigateTo();
  });

  test('Inventory Items on the Inventory Page should contain all the correct information', async ({ inventoryPage }) => {
    const inventoryItems: Array<InventoryDetails> = inventoryDetails; // Use the imported inventory details

    for (const item of inventoryItems) {
      // Assert the 'Add To Cart' button is visible
      const button = inventoryPage.getButtonByLabelText(item.name);
      await expect(button).toBeVisible();

      // Assert the image is visible
      const image = inventoryPage.getImageByLabelText(item.name);
      await expect(image).toBeVisible();

      // Assert the description is correct
      const description = inventoryPage.getDescriptionByLabelText(item.name);
      await expect(description).toHaveText(item.description);

      // Assert the price is correct
      const price = inventoryPage.getPriceByLabelText(item.name);
      await expect(price).toHaveText(item.price);
    }
  });

  test('Verify clicking on an item opens the item details page and all the information is correct', async ({
    inventoryPage,
    itemDetailsPage,
  }) => {
    const inventoryItems = inventoryDetails;

    // Select a random item from the inventoryDetails object
    const randomItem = inventoryItems[Math.floor(Math.random() * inventoryItems.length)];

    // Click on the randomly selected item
    const itemLink = inventoryPage.getItemLinkByLabelText(randomItem.name);
    await itemLink.click();

    // Verify the item details page displays the correct information
    const itemName = itemDetailsPage.getItemDetailsName();
    const itemDescription = itemDetailsPage.getItemDetailsDescription();
    const itemPrice = itemDetailsPage.getItemDetailsPrice();

    await expect(itemName).toHaveText(randomItem.name);
    await expect(itemDescription).toHaveText(randomItem.description);
    await expect(itemPrice).toHaveText(randomItem.price);
  });
});

test.describe('Verify Sorting functionality', () => {
  test.beforeEach(async ({ inventoryPage }) => {
    await inventoryPage.navigateTo();
  });

  test('Inventory Items can be sorted by Name', async ({ inventoryPage }) => {
    const inventoryItems = inventoryDetails;

    await test.step('Iventory items should be sorted alphabetically', async () => {
      const sortedItems = sortByNameAlphabetically(inventoryItems);
      await inventoryPage.selectSortByNameAZ();
      const displayedItems = await inventoryPage.getInventoryItemNames();
      expect(displayedItems).toEqual(sortedItems.map((item) => item.name));
    });

    await test.step('Iventory items should be sorted alphabetically in reverse', async () => {
      const reversedSortedItems = sortByNameReverseAlphabetically(inventoryItems);
      await inventoryPage.selectSortByNameZA();
      const displayedItemsReversed = await inventoryPage.getInventoryItemNames();
      expect(displayedItemsReversed).toEqual(reversedSortedItems.map((item) => item.name));
    });
  });

  test('Inventory Items can be sorted by Price', async ({ inventoryPage }) => {
    const inventoryItems = inventoryDetails;

    await test.step('Iventory items should be sorted by Priec Low to High', async () => {
      const sortedItems = sortByPriceLowToHigh(inventoryItems);
      await inventoryPage.selectSortByPriceLowToHigh();
      const displayedItems = await inventoryPage.getInventoryItemNames();
      expect(displayedItems).toEqual(sortedItems.map((item) => item.name));
    });

    await test.step('Iventory items should be sorted by Price High to Low', async () => {
      const reversedSortedItems = sortByPriceHighToLow(inventoryItems);
      await inventoryPage.selectSortByPriceHighToLow();
      const displayedItemsReversed = await inventoryPage.getInventoryItemNames();
      expect(displayedItemsReversed).toEqual(reversedSortedItems.map((item) => item.name));
    });
  });
});
