import { test, expect } from '@playwright/test';

test.describe('Sauce Demo Navigation', () => {
  test('Navigation drawer controls', async ({ page }) => {
    // 1. Log in and open the navigation drawer.
    await page.goto('https://www.saucedemo.com/');
    await page.locator('[data-test="username"]').fill('standard_user');
    await page.locator('[data-test="password"]').fill('secret_sauce');
    await page.locator('[data-test="login-button"]').click();
    await page.locator('button:has-text("Open Menu")').click();

    // 2. Verify drawer options and close/reopen behavior.
    await expect(page.locator('[data-test="inventory-sidebar-link"]')).toBeVisible();
    await expect(page.locator('[data-test="logout-sidebar-link"]')).toBeVisible();
    await expect(page.locator('[data-test="reset-sidebar-link"]')).toBeVisible();
    await page.locator('button:has-text("Close Menu")').click();
    await page.locator('button:has-text("Open Menu")').click();
    await page.locator('[data-test="inventory-sidebar-link"]').click();

    // 3. Verify All Items returns to inventory.
    await expect(page).toHaveURL(/inventory\.html/);
    await expect(page.locator('[data-test="title"]')).toHaveText('Products');
  });
});
