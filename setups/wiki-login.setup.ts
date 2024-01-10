import { test as setup, expect } from '@playwright/test';
import { STORAGE_STATE } from '../playwright.config';

setup('Login', async ({ page }) => {
    await page.goto('/');
    await page.getByRole('link', { name: 'Log in' }).click();
    await page.getByPlaceholder('Enter your username').fill(process.env.USERNAME!);
    await page.getByPlaceholder('Enter your password').fill(process.env.PASSWORD!);
    await page.getByRole('button', { name: 'Log in' }).click();

    await expect(page.locator('[id*=pt-userpage]  .new > span')).toContainText(process.env.USERNAME!, { timeout: 10000 });

    await page.context().storageState({ path: STORAGE_STATE });
})

