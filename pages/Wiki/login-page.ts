import { type Locator, type Page, expect } from "@playwright/test";

export class LoginPage {
    page: Page;
    loginLink: Locator;
    userNamePlaceholder: Locator;
    passwordPlaceholder: Locator;
    loginButton: Locator;

    constgructor(page: any) {
        this.page = page;
        this.loginLink = page.getByRole('link', { name: 'Log in' });
        this.userNamePlaceholder = page.getByPlaceholder('Enter your username');
        this.passwordPlaceholder = page.getByPlaceholder('Enter your password');
        this.loginButton = page.getByRole('button', { name: 'Log in' });
    }

    async clickLoginLink() {
        await this.loginLink.click();
    }

    async enterUserName(username: string) {
        await this.userNamePlaceholder.fill(username);
    }

    async enterPassword(password: string) {
        await this.passwordPlaceholder.fill(password);
    }

    async clickLoginButton() {
        await this.loginButton.click();
    }

    async loginIntoWiki(username: string, password: string) {
        this.clickLoginLink();
        this.enterUserName(username);
        this.enterPassword(password);
        this.clickLoginButton();
    }
}