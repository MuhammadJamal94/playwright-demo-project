import { Page, Locator } from "@playwright/test";
export class LoginPage {
    page: Page;
    userEmailField: Locator;
    password: Locator;
    loginBtn: Locator;
    constructor(page: Page) {
        this.page = page;
        this.userEmailField = page.locator('#userEmail');
        this.password = page.locator('#userPassword');
        this.loginBtn = page.locator('#login');
    };

    async goTo() {
        await this.page.goto('https://rahulshettyacademy.com/client');
    };

    async validLogin(userEmail: string, password: string) {
        await this.userEmailField.fill(userEmail);
        await this.password.fill(password);
        await this.loginBtn.click();
        await this.page.waitForLoadState('networkidle');
    };
}