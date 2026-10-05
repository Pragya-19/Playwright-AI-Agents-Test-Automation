import { test, expect } from '@playwright/test';

test.describe('Sauce Demo Inventory', () => {
  test('Product detail and add to cart', async ({ page }) => {
    // 1. Open Sauce Demo and log in.
    await page.goto('https://www.saucedemo.com/');
    await page.locator('[data-test="username"]').fill('standard_user');
    await page.locator('[data-test="password"]').fill('secret_sauce');
    await page.locator('[data-test="login-button"]').click();

    // 2-3. Open the backpack and verify its detail page.
   await Promise.all([
  page.waitForURL(/inventory-item\.html/),
  page.locator('[data-test="item-4-title-link"]').click()
]);

await expect(
  page.locator('[data-test="inventory-item-name"]')
).toHaveText('Sauce Labs Backpack', { timeout: 10000 });
    
   await expect(
  page.locator('[data-test="inventory-item-price"]')
).toHaveText('$29.99', { timeout: 10000 });

await expect(
  page.locator('[data-test="add-to-cart"]')
).toBeVisible({ timeout: 10000 });

await expect(
  page.getByRole('button', { name: /Back to products/i })
).toBeVisible({ timeout: 10000 });

    // 4. Add the backpack and open the cart.
    await page.locator('[data-test="add-to-cart"]').click();
    await page.locator('[data-test="shopping-cart-link"]').click();

    // 5. Verify the cart contains the backpack with quantity 1.
    await expect(page.locator('[data-test="item-4-title-link"]')).toBeVisible();
    await expect(page.locator('[data-test="item-quantity"]')).toHaveText('1');
  });
});
