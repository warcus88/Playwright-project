import { test as teardown, expect } from '@playwright/test';

teardown('Clean up', async ({ page }) => {
    await page.goto('https://www.i.ua');
})

