import { test, expect } from '@playwright/test';

test.describe('Sauce Demo Checkout', () => {
  test('Checkout overview totals and completion', async ({ page }) => {
    // 1. Add the Backpack and submit valid checkout information.
    await page.goto('https://www.saucedemo.com/');
    await page.locator('[data-test="username"]').fill('standard_user');
    await page.locator('[data-test="password"]').fill('secret_sauce');
    await page.locator('[data-test="login-button"]').click();
    await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();
    await page.locator('[data-test="shopping-cart-link"]').click();
    await page.locator('[data-test="checkout"]').click();
    await page.locator('[data-test="firstName"]').fill('Ada');
    await page.locator('[data-test="lastName"]').fill('Lovelace');
    await page.locator('[data-test="postalCode"]').fill('12345');
    await page.locator('[data-test="continue"]').click();

    // 2. Verify overview totals.
    await expect(page.locator('[data-test="title"]')).toHaveText('Checkout: Overview');
    await expect(page.getByText('Item total: $29.99')).toBeVisible();
    await expect(page.getByText('Tax: $2.40')).toBeVisible();
    await expect(page.getByText('Total: $32.39')).toBeVisible();

    // 3. Finish and verify the confirmation page.
    await page.locator('[data-test="finish"]').click();
    await expect(page.getByText('Thank you for your order!')).toBeVisible();
    await expect(page.locator('[data-test="back-to-products"]')).toBeVisible();
  });
});
