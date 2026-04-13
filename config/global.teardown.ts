import { test } from '../pages/fixtures/fixtures.page.ts';
import * as fs from 'fs';
import * as path from 'path';
import { uploadAllureReportToGCS } from '../utils/gcs.utils.ts';

/**
 * Clears the session authentication file to reset user state
 */
async function clearSessionData(): Promise<void> {
  const sessionData = {};
  const filePath = path.resolve(__dirname, './auth.json');
  fs.writeFileSync(filePath, JSON.stringify(sessionData, null, 2), 'utf-8');
  console.log(`Session data cleared: ${filePath}`);
}

/**
 * Clears Session data and uploads the Allure Rerport to Google CLoud Storage
 * where a public link can be accessed to view the report. 
 */
export async function globalTeardown(): Promise<void> {
  try {
    // Clear session data
    await clearSessionData();

    // Upload Allure Report to GCS
    const bucketName = process.env.GCS_BUCKET_NAME || 'allure-reports-100423';
    const reportPath = path.resolve(__dirname, '../allure-report');
    await uploadAllureReportToGCS(bucketName, reportPath);

    console.log('Allure Report uploaded successfully!');
  } catch (error) {
    console.error('Error with uploading Allure Report:', error);
    // Set to true if you want test suite to fail when cleanup fails
    // Set to false if you want tests to pass regardless of cleanup status
  }
}

export default globalTeardown;
