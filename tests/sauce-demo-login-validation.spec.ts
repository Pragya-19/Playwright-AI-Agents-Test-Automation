import { test, expect } from '@playwright/test';

test.describe('Sauce Demo Authentication', () => {
  test('Login validation and locked-out user', async ({ page }) => {
    // 1. Open Sauce Demo login page
    await page.goto('https://www.saucedemo.com/');

    // 2. Click Login with empty fields and verify a required username error.
    await page.locator('[data-test="login-button"]').click();
    await expect(page.locator('[data-test="error"]')).toContainText('Username is required');

    // 3. Enter standard_user and an incorrect password, click Login, and verify an authentication error.
    await page.locator('[data-test="username"]').fill('standard_user');
    await page.locator('[data-test="password"]').fill('wrong_password');
    await page.locator('[data-test="login-button"]').click();
    await expect(page.locator('[data-test="error"]')).toContainText('Username and password do not match');

    // 4. Enter locked_out_user and secret_sauce, click Login, and verify the locked-out error.
    await page.locator('[data-test="username"]').fill('locked_out_user');
    await page.locator('[data-test="password"]').fill('secret_sauce');
    await page.locator('[data-test="login-button"]').click();
    await expect(page.locator('[data-test="error"]')).toContainText('Sorry, this user has been locked out.');
  });
});
