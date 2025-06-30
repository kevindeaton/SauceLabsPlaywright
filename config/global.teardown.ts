import { test } from '../pages/fixtures/fixtures.ts';
import * as fs from 'fs';
import * as path from 'path';

test('Logout and clear Session', async () => {
    
    // Writes an empty object to the auth.json file to clear session data
    const testData = {};
    const filePath = path.resolve(__dirname, './auth.json');
    fs.writeFileSync(filePath, JSON.stringify(testData, null, 2), 'utf-8');

    console.log(`Test data written to ${filePath}`);
});