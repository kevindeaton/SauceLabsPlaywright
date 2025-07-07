import * as allure from 'allure-js-commons';

/**
 * @description Sets common Allure annotations for a test.
 *
 * @param feature The feature name for the test
 * @param suite The suite name for the test
 * @param severity The severity level of the test
 */
export async function setAllureAnnotations(feature: string, suite: string, severity: allure.Severity): Promise<void> {
  await allure.feature(feature);
  await allure.suite(suite);
  await allure.severity(severity);
}
