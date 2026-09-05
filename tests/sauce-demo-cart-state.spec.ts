import { test, expect } from '@playwright/test';

test.describe('Sauce Demo Cart', () => {
  test('Add two products, remove one, and reset cart state', async ({ page }) => {
    // 1. Log in as standard_user with secret_sauce.
    await page.goto('https://www.saucedemo.com/');
    await page.locator('[data-test="username"]').fill('standard_user');
    await page.locator('[data-test="password"]').fill('secret_sauce');
    await page.locator('[data-test="login-button"]').click();

    // 2. Add Backpack and Bike Light.
    await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();
    await page.locator('[data-test="add-to-cart-sauce-labs-bike-light"]').click();

    // 3. Verify cart badge is 2.
    await expect(page.locator('[data-test="shopping-cart-badge"]')).toHaveText('2');

    // 4. Open cart, remove Backpack, and verify only Bike Light remains.
    await page.locator('[data-test="shopping-cart-link"]').click();
    await page.locator('[data-test="remove-sauce-labs-backpack"]').click();
    await expect(page.locator('[data-test="item-0-title-link"]')).toHaveText('Sauce Labs Bike Light');
    await expect(page.locator('[data-test="shopping-cart-badge"]')).toHaveText('1');

    // 5. Continue shopping, open menu, select Reset App State.
    await page.locator('[data-test="continue-shopping"]').click();
    await page.locator('button:has-text("Open Menu")').click();
    await page.locator('[data-test="reset-sidebar-link"]').click();

    // 6. Verify cart is empty and product controls are Add to cart.
    await expect(page.locator('[data-test="shopping-cart-badge"]')).toHaveCount(0);
    await expect(page.locator('[data-test="add-to-cart-sauce-labs-backpack"]')).toBeVisible();
  });
});
