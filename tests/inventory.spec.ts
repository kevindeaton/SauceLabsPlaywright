import { test, expect } from '../pages/fixtures/fixtures.page.ts';

test('Inventory Items should contain all the correct information', async ({ inventoryPage }) => {
  inventoryPage.navigateTo();

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

const inventoryItems = [
  {
    name: 'Sauce Labs Backpack',
    price: '$29.99',
    description:
      'carry.allTheThings() with the sleek, streamlined Sly Pack that melds uncompromising style with unequaled laptop and tablet protection.',
  },
  {
    name: 'Sauce Labs Bike Light',
    price: '$9.99',
    description:
      "A red light isn't the desired state in testing but it sure helps when riding your bike at night. Water-resistant with 3 lighting modes, 1 AAA battery included.",
  },
  {
    name: 'Sauce Labs Bolt T-Shirt',
    price: '$15.99',
    description:
      'Get your testing superhero on with the Sauce Labs bolt T-shirt. From American Apparel, 100% ringspun combed cotton, heather gray with red bolt.',
  },
];
