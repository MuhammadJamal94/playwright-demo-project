const { expect } = require('@playwright/test');

class CartPage {
    constructor(page) {
        this.page = page;
        this.orderDiv = page.locator('div li');
        this.checkOutBtn = page.locator('text = Checkout');
    };

    async validateOrder(productName) {
        await this.orderDiv.first().waitFor();
        const bool = await this.page.locator(`h3:has-text('${productName}')`).isVisible();
        expect(bool).toBeTruthy();
    };

    async goToCheckoutPage() {
        await this.checkOutBtn.click();
    };
};
module.exports = {CartPage};