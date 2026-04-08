import { test } from '../pages/fixtures/fixtures.page.ts';
import * as fs from 'fs';
import * as path from 'path';
import * as allure from "allure-js-commons";
import { setAllureAnnotations } from '../utils/allure.utils.ts';

test('Logout and clear Session', async () => {
  await setAllureAnnotations("Authentication", "Post-Step", allure.Severity.MINOR);

  // Writes an empty object to the auth.json file to clear session data
  const testData = {};
  const filePath = path.resolve(__dirname, './auth.json');
  fs.writeFileSync(filePath, JSON.stringify(testData, null, 2), 'utf-8');

  console.log(`Test data written to ${filePath}`);
});