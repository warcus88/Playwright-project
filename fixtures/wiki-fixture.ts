import { LoginPage } from "../pages/Wiki/login-page";
import { test as base } from "./fixture-base";

export const test = base.extend<{ LoginPage }>({
    loginPage: ({ page }, use) => {
        const loginPage = new LoginPage(page);
        use(loginPage);
    },
})