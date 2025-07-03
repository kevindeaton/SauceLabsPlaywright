import { InventoryDetails } from '../test-data/inventory-details';

/**
 *
 * @description This function sorts an array of items by their name property in alphabetical order (A to Z).
 * @param items Array of items with name properties
 * @returns A new array of items sorted by name alphabetically.
 */
export function sortByNameAlphabetically(items: Array<InventoryDetails>): Array<InventoryDetails> {
  return [...items].sort((a, b) => a.name.localeCompare(b.name));
}

/**
 * @description This function sorts an array of items by their name property in reverse alphabetical order (Z to A).
 * @param items Array of items with name properties
 * @returns A new array of items sorted by name in reverse alphabetical order.
 */
export function sortByNameReverseAlphabetically(items: Array<InventoryDetails>): Array<InventoryDetails> {
  return [...items].sort((a, b) => b.name.localeCompare(a.name));
}

/**
 * @description This function sorts an array of items by price in ascending order (low to high)
 *      and then by name alphabetically if the prices are the same.
 * @param items Array of items with price and name properties
 * @returns A new array of items sorted by price low to high
 */
export function sortByPriceLowToHigh(items: Array<InventoryDetails>): Array<InventoryDetails> {
  return [...items].sort((a, b) => {
    const priceComparison = parseFloat(a.price.replace('$', '')) - parseFloat(b.price.replace('$', ''));
    if (priceComparison !== 0) {
      return priceComparison; // Sort by price (low to high)
    }
    return a.name.localeCompare(b.name); // Sort by name alphabetically if prices are the same
  });
}

/**
 * @description This function sorts an array of items by price in descending order (high to low)
 *      and then by name alphabetically if the prices are the same.
 * @param items Array of items with price and name properties
 * @returns A new array of items sorted by price high to low
 */
export function sortByPriceHighToLow(items: Array<InventoryDetails>): Array<InventoryDetails> {
  return [...items].sort((a, b) => {
    const priceComparison = parseFloat(b.price.replace('$', '')) - parseFloat(a.price.replace('$', ''));
    if (priceComparison !== 0) {
      return priceComparison; // Sort by price (high to low)
    }
    return a.name.localeCompare(b.name); // Sort by name alphabetically if prices are the same
  });
}
