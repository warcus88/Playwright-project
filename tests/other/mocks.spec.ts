import { test, expect } from '@playwright/test';

test("mocks", async ({ page}) => {
    await page.route('https://www.google.com', async route => {
        const json = [{ name: 'Melon', id: 21 }];
        await route.fulfill({ json });
    });

    await page.goto('https://www.google.com');

    await expect(page.getByText('Melon')).toBeVisible();
});

test("mocks modify API responses", async ({ page}) => {
    await page.route('https://www.google.com', async route => {
        const response = await route.fetch();
        console.log(JSON.stringify(response.body));
        // const json = await response.json();
        // json.push({ name: 'Playwright', id: 100 });
        // await route.fulfill({ response, json });
    });

    // await page.goto('https://www.google.com');

    // await expect(page.getByText('Playwright', { exact: true })).toBeVisible();
});