import { test, expect } from '@playwright/test';

test.describe('Sauce Demo Navigation', () => {
  test('Generate PDF order after purchase', async ({ page }) => {
    // 1. Complete a purchase.
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
    await page.locator('[data-test="finish"]').click();
    await expect(page.getByText('Thank you for your order!')).toBeVisible();

    // 2. Generate the PDF order artifact.
    const downloadPromise = page.waitForEvent('download');
    await page.getByRole('button', { name: 'Generate PDF order' }).click();
    const download = await downloadPromise;
    expect(download.suggestedFilename()).toMatch(/\.pdf$/i);
  });
});
