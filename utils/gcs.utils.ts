import { Bucket, Storage } from '@google-cloud/storage';
import * as fs from 'fs';
import * as path from 'path';

/**
 * Upload the 'allure-report' folder to Google Cloud Storage
 * Uses Application Default Credentials (ADC) for authentication
 */
export async function uploadAllureReportToGCS(
  bucketName: string,
  localReportPath: string,
  gcsDestinationFolder: string = 'allure-report'
): Promise<void> {
  try {
    // Initialize GCS client with Application Default Credentials
    const storage = new Storage();
    const bucket = storage.bucket(bucketName);

    console.log(`Starting upload to GCS bucket: ${bucketName}`);

    // Verify local directory exists
    if (!fs.existsSync(localReportPath)) {
      throw new Error(`Report directory not found: ${localReportPath}`);
    }

    // First, delete existing folder in GCS (to overwrite)
    console.log('Deleting existing files in GCS, please wait...');
    await clearGCSFolder(bucket, gcsDestinationFolder);

    // Upload all files recursively
    const filesToUpload = getAllFiles(localReportPath);
    const totalFiles = filesToUpload.length;

    console.log('Beginning Allure Report upload...');
    let uploadedCount = 0;
    let lastReportedPercentage = 0;

    for (const filePath of filesToUpload) {
      const relativePath = path.relative(localReportPath, filePath);
      const gcsPath = `${gcsDestinationFolder}/${relativePath}`.replace(/\\/g, '/');

      try {
        await bucket.upload(filePath, {
          destination: gcsPath,
        });
        uploadedCount++;
        lastReportedPercentage = reportUploadProgress(uploadedCount, totalFiles, lastReportedPercentage);
      } catch (error) {
        console.error('Failed to upload files:', error);
        throw error;
      }
    }

    console.log('Successfully uploaded Allure Report to:');
    console.log(`https://console.cloud.google.com/storage/browser/${bucketName}/${gcsDestinationFolder}`);
    console.log(`Report can be viwed at https://storage.googleapis.com/${bucketName}/${gcsDestinationFolder}/index.html`);
  } catch (error) {
    console.error('Failed to upload Allure Report to GCS:', error);
    throw error;
  }
}

/**
 * Recursively get all files in a directory
 */
function getAllFiles(dirPath: string): string[] {
  const files: string[] = [];
  const items = fs.readdirSync(dirPath, { withFileTypes: true });

  for (const item of items) {
    const fullPath = path.join(dirPath, item.name);
    if (item.isDirectory()) {
      files.push(...getAllFiles(fullPath));
    } else {
      files.push(fullPath);
    }
  }

  return files;
}

/**
 * Delete all files in a GCS folder
 */
async function clearGCSFolder(bucket: Bucket, folderPath: string): Promise<void> {
  const [files] = await bucket.getFiles({ prefix: `${folderPath}/` });

  if (files.length === 0) {
    console.log("Folder doesn't exist yet, will create it");
    return;
  }

  for (const file of files) {
    await file.delete();
  }

  console.log('Deleted existing files');
}

/**
 * Its takes a really long time to upload the reports so this will
 * track upload progress every at 10% intervals and again atcompletion
 */
function reportUploadProgress(uploadedCount: number, totalFiles: number, lastReportedPercentage: number): number {
  const currentPercentage = Math.floor((uploadedCount / totalFiles) * 100);
  if (currentPercentage >= lastReportedPercentage + 10 || uploadedCount === totalFiles) {
    console.log(`  ${currentPercentage}% uploaded (${uploadedCount}/${totalFiles} files)`);
    return currentPercentage;
  }
  return lastReportedPercentage;
}
