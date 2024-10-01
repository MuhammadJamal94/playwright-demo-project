const { expect } = require("@playwright/test");

class CheckoutPage {
    constructor(page) {
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
            if (temp.trim() === countryName) {
                await countries.nth(i).click();
                break;
            }
        }
    };

    async confirmEmail(email) {
        expect(await this.emailLable).toHaveText(email);
    };

    async sumbit() {
        await this.sumbitBtn.click();
    };
}
module.exports = { CheckoutPage };