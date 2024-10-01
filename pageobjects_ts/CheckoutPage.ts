import { Page, Locator, expect } from "@playwright/test";
export class CheckoutPage {
    page: Page;
    countriesField: Locator;
    dropDown: Locator;
    sumbitBtn: Locator;
    emailLable: Locator;

    constructor(page: Page) {
        this.page = page;
        this.countriesField = page.locator('[placeholder *= "Country"]');
        this.dropDown = page.locator('.ta-results');
        this.sumbitBtn = page.locator('.action__submit');
        this.emailLable = page.locator('.user__name [type = "text"]').first();
    };

    async selectCountry(countryName) {
        await this.countriesField.pressSequentially(countryName, { delay: 100 });
        await this.dropDown.waitFor();
        const countries = this.dropDown.locator('button');

        for (let i = 0; i < await countries.count(); i++) {
            const temp = await countries.nth(i).textContent();
            if (temp!.trim() === countryName) {
                await countries.nth(i).click();
                break;
            }
        }
    };

    async confirmEmail(email: string) {
        expect(this.emailLable).toHaveText(email);
    };

    async sumbit() {
        await this.sumbitBtn.click();
    };
}
// module.exports = { CheckoutPage };