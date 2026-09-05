import { test, expect } from '@playwright/test';

test.describe('Sauce Demo Inventory', () => {
  test('Product sorting options', async ({ page }) => {
    // 1. Open Sauce Demo and log in.
    await page.goto('https://www.saucedemo.com/');
    await page.locator('[data-test="username"]').fill('standard_user');
    await page.locator('[data-test="password"]').fill('secret_sauce');
    await page.locator('[data-test="login-button"]').click();

    // 2. Verify the default sort is Name (A to Z).
    await expect(page.locator('[data-test="product-sort-container"]')).toHaveValue('az');

    // 3. Select each supported sort option.
    await page.locator('[data-test="product-sort-container"]').selectOption('za');
    await expect(page.locator('[data-test="product-sort-container"]')).toHaveValue('za');
    await page.locator('[data-test="product-sort-container"]').selectOption('lohi');
    await expect(page.locator('[data-test="product-sort-container"]')).toHaveValue('lohi');
    await page.locator('[data-test="product-sort-container"]').selectOption('hilo');

    // 4. Verify the selected sort option is retained.
    await expect(page.locator('[data-test="product-sort-container"]')).toHaveValue('hilo');
  });
});
