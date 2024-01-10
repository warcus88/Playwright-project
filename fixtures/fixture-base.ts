import { ConsoleMessage, test as base } from "@playwright/test";

export const test = base.extend({
    page: async ({ page }, use) => {
        await page.setViewportSize({ width: 1920, height: 1080 });
        
        page.on('console',async (msg: ConsoleMessage) => {
            if (msg.type() ==='error') {
                throw new Error('Console error')
            }
        })

        //everything before test executes in use
        await use(page);

        //after you can add clean up logic
    }
});