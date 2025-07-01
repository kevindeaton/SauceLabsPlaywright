import { test, expect } from '../../pages/fixtures/fixtures.page.ts';
import { inventoryDetails } from '../../test-data/inventory-details.ts';


test.describe('Verify Inventory Details', () => {

  test.beforeEach(async ({ inventoryPage }) => {
    inventoryPage.navigateTo();
  });

  test('Inventory Items on the Inventory Page should contain all the correct information', async ({ inventoryPage }) => {
    
    const inventoryItems = inventoryDetails; // Use the imported inventory details

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

  test('Inventory Items can be sorted by name', async ({ inventoryPage }) => {
    const inventoryItems = inventoryDetails;

    // Sort the items by name
    const sortedItems = [...inventoryItems].sort((a, b) => a.name.localeCompare(b.name));

    // Get the names of the items displayed on the page
    const displayedItems = await inventoryPage.getInventoryItemNames();

    // Assert that the displayed items match the sorted items
    expect(displayedItems).toEqual(sortedItems.map(item => item.name));
  });

})