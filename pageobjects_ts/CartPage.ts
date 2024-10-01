import { Locator, Page, expect } from "@playwright/test";

export class CartPage {
    page: Page;
    orderDiv: Locator;
    checkOutBtn: Locator;

    constructor(page: Page) {
        this.page = page;
        this.orderDiv = page.locator('div li');
        this.checkOutBtn = page.locator('text = Checkout');
    };

    async validateOrder(productName: string) {
        await this.orderDiv.first().waitFor();
        const bool = await this.page.locator(`h3:has-text('${productName}')`).isVisible();
        expect(bool).toBeTruthy();
    };

    async goToCheckoutPage() {
        await this.checkOutBtn.click();
    };
};