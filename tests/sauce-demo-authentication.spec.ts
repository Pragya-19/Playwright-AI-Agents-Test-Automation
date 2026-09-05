import { test, expect } from '@playwright/test';

test.describe('Sauce Demo Authentication', () => {
  test('Successful login with standard user', async ({ page }) => {
    // 1. Open Sauce Demo login page
    await page.goto('https://www.saucedemo.com/');

    // 2. Verify the Swag Labs login page shows Username, Password, and Login.
    await expect(page.locator('[data-test="username"]')).toBeVisible();
    await expect(page.locator('[data-test="password"]')).toBeVisible();
    await expect(page.locator('[data-test="login-button"]')).toBeVisible();

    // 3. Enter standard_user in Username.
    await page.locator('[data-test="username"]').fill('standard_user');

    // 4. Enter secret_sauce in Password.
    await page.locator('[data-test="password"]').fill('secret_sauce');

    // 5. Click Login.
    await page.locator('[data-test="login-button"]').click();

    // 6. Verify the URL is /inventory.html, Products is visible, and six products are shown.
    await expect(page).toHaveURL(/inventory\.html/);
    await expect(page.locator('[data-test="title"]')).toHaveText('Products');
    await expect(page.locator('[data-test="inventory-item"]')).toHaveCount(6);
  });
});
