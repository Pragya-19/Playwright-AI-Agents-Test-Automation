import { test, expect } from '@playwright/test';

test.describe('Sauce Demo Checkout', () => {
  test('Checkout cancellation preserves cart', async ({ page }) => {
    // 1. Add a product and enter checkout step one.
    await page.goto('https://www.saucedemo.com/');
    await page.locator('[data-test="username"]').fill('standard_user');
    await page.locator('[data-test="password"]').fill('secret_sauce');
    await page.locator('[data-test="login-button"]').click();
    await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();
    await page.locator('[data-test="shopping-cart-link"]').click();
    await page.locator('[data-test="checkout"]').click();

    // 2. Cancel checkout.
    await page.locator('[data-test="cancel"]').click();

    // 3. Verify the cart is restored without submitting an order.
    await expect(page).toHaveURL(/cart\.html/);
    await expect(page.locator('[data-test="item-4-title-link"]')).toHaveText('Sauce Labs Backpack');
  });
});
