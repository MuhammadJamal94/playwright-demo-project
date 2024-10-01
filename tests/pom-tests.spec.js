const { test, expect } = require('@playwright/test');
const { POManager } = require('../pageobjects/POManager');
const testData = JSON.parse(JSON.stringify(require('../utils/placeOrderTestData.json')));

for (const data of testData) {
    test(`pom e2e ${data.productName}`, async ({ browser }) => {
        const context = await browser.newContext();
        const page = await context.newPage();
        const poManager = new POManager(page);
        const loginPage = poManager.getLoginPage();
        const dashboardPage = poManager.getDashboardPage();
        const cartPage = poManager.getCartPage();
        const checkoutPage = poManager.getCheckoutPage();
        const thankyouPage = poManager.getThankyouPage();

        await loginPage.goTo();
        await loginPage.validLogin(data.email, data.password);

        await dashboardPage.searchProduct(data.productName);
        await dashboardPage.goToCart();

        await cartPage.validateOrder(data.productName);
        await cartPage.goToCheckoutPage();

        await checkoutPage.selectCountry('India');
        await checkoutPage.confirmEmail(data.email);
        await checkoutPage.sumbit();

        await expect(thankyouPage.mainTitle).toHaveText(' Thankyou for the order. ');
        const orderId = await thankyouPage.getOrderId();
        await thankyouPage.goToMyOrdersPage();

        const orders = page.locator('tbody tr');
        await page.locator('text = Your Orders').waitFor();
        for (let i = 0; i < await orders.count(); i++) {
            if (await orders.locator('[scope = "row"]').nth(i).textContent() === orderId) {
                await orders.nth(i).locator('.btn-primary').click();
                console.log(`Order is found!`);
                break;
            }
        }
        const orderDetailsPageId = await page.locator('.col-text').textContent();
        expect(orderDetailsPageId).toEqual(orderId);
    });
}