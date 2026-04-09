import { GoogleGenerativeAI, GoogleGenerativeAIFetchError } from '@google/generative-ai';
import { TestInfo } from '@playwright/test';

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_GENAI_API_KEY!);
// Using the older lite model for faster more reliable responses and to avoid rate limits
const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash-lite' });

export async function getAIAnalysis(testInfo: TestInfo): Promise<string> {
  const errorMessage = testInfo.error?.message || 'No error message available';
  const stackTrace = testInfo.error?.stack || 'No stack trace available';
  const testTitle = testInfo.title;

  const prompt = `Analyze this Playwright test failure:
    Test Name: ${testTitle}
    Error: ${errorMessage}
    Stack: ${stackTrace}

    Please provide:
    1. SUGGESTED FIX: How to solve this.
    2. CATEGORY: One of [Locator Issue, Data Issue, Environment, Bug, Flaky].
    3. CONFIDENCE: 0-100%.`;

  try {
    const aiResponse = await generateWithRetry(prompt);
    return aiResponse.response.text();
  } catch (error) {
    console.error('AI Analysis failed:', error);

    // If Gemini is busy and max retries are exceeded, return a specific message
    if (error instanceof Error && error.message.includes('Max retries exceeded')) {
      return 'AI analysis unavailable: Gemini model is currently busy. Please try again later.';
    } else {
      return 'AI analysis unavailable due to error.';
    }
  }
}

/**
 * Sends the prompt to the AI Model and retries it multiple times is the model is busy
 *
 * @param prompt
 * @param maxRetries
 *
 * @returns aiResponse or throws an Error
 */
async function generateWithRetry(prompt: string, maxRetries = 3) {
  for (let i = 0; i < maxRetries; i++) {
    try {
      const aiResponse = await model.generateContent(prompt);
      return aiResponse;
    } catch (error) {
      if (error instanceof GoogleGenerativeAIFetchError && error.status === 503 && i < maxRetries - 1) {
        const delay = Math.pow(2, i) * 1000; // Exponential backoff: 1s, 2s, 4s
        console.warn(`Gemini busy. Retrying in ${delay / 1000}s...`);
        await new Promise((res) => setTimeout(res, delay));
        continue;
      }
      throw error; // Re-throw if it's a different error or we're out of retries
    }
  }
  throw new Error('Max retries exceeded');
}
