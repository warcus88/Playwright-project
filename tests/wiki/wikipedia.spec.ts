import { test, expect } from '@playwright/test';
test.describe('Simple smoke tests', () => {

  test.describe.configure({ retries: 2 });

  test('user dropdown @smoke', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('[id*=pt-userpage]  .new > span')).toContainText(process.env.USERNAME!);
  });

  test('notification alert @smoke', async ({ page }) => {
    await page.goto('/');

    await expect(page.locator('#pt-notifications-alert')).toBeVisible();
  });

  test('Failed on purpose @failed', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('[id*=pt-userpage]  .new > span')).toHaveText('Failed');
  });
});

test.describe('Annotations usage', () => {

  test.skip('skipped test annotation', async ({ page }) => {
    await page.goto('/');
  });

  test.fixme('Fix me test annotation example', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('[id*=pt-userpage]  .new > span')).toHaveText('Fix me');
  });

  test('Fail test annotation example', async ({ page }) => {
    test.fail();
    await page.goto('/');
    await expect(page.locator('[id*=pt-userpage]  .new > span')).toHaveText('Failed');
  });

  test('Slow test annotation example', async ({ page }) => {
    test.slow();
    await page.goto('/');
  });

  test('Custom test annotation example', async ({ page }) => {
    test.info().annotations.push({
      type: 'bug',
      description: 'link with description of an issue'
    });
    await page.goto('/');
  });
})

test.describe('Timeoouts', () => {
  test.beforeAll(async () => {
    test.setTimeout(40000);
  })

  test.beforeEach(async ({ page }, testInfo) => {
    testInfo.setTimeout(testInfo.timeout + 30000);
  })

  test('slow test', async ({ page }) => {
    test.slow(); // Easy way to triple the default timeout
    // ...
  });
  
  test('very slow test', async ({ page }) => {
    test.setTimeout(120000);
    // ...
  });
})