import { Locator, Page } from "@playwright/test";
export class ThankyouPage {
    page: Page;
    mainTitle: Locator;
    orderIDField: Locator;
    myOrdersLink: Locator;
    constructor(page: Page) {
        this.mainTitle = page.locator('.hero-primary');
        this.orderIDField = page.locator('.em-spacer-1 .ng-star-inserted');
        this. myOrdersLink = page.locator('[routerlink *= "myorders"]').nth(0);
    };

    async getOrderId() {
        const orderId = await this.orderIDField.textContent();
        console.log(`Order ID = ${orderId}`);
        const trimmedId = orderId!.replace(/\|/g, '').trim();
        console.log(trimmedId);
        return trimmedId;
    };

    async goToMyOrdersPage() {
        await this.myOrdersLink.click();
    };
}