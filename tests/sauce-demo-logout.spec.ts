import { test, expect } from '@playwright/test';

test.describe('Sauce Demo Authentication', () => {
  test('Logout ends the authenticated session', async ({ page }) => {
    // 1. Open https://www.saucedemo.com/.
    await page.goto('https://www.saucedemo.com/');

    // 2. Log in as standard_user with secret_sauce.
    await page.locator('[data-test="username"]').fill('standard_user');
    await page.locator('[data-test="password"]').fill('secret_sauce');
    await page.locator('[data-test="login-button"]').click();

    // 3. Open the menu and click Logout.
    await page.locator('button:has-text("Open Menu")').click();
    await page.locator('[data-test="logout-sidebar-link"]').click();

    // 4. Verify the login page is shown.
    await expect(page.locator('[data-test="login-button"]')).toBeVisible();

    // 5-6. Verify direct inventory access is blocked after logout.
    await page.goto('https://www.saucedemo.com/inventory.html');
    await expect(page.locator('[data-test="login-button"]')).toBeVisible();
  });
});
