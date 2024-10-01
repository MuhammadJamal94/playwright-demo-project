import { test, expect, request } from "@playwright/test";
// const { APIUtils } = require('./utils/APIUtils');
const {APIUtils} = require('../utils/APIUtils');

const loginPayLoad = {
    userEmail: "hantoka@fantoka.com",
    userPassword: "Aa123123!"
};
const orderPayLoad = {
    orders: [{
        country: "Germany",
        productOrderedId: "6581ca979fd99c85e8ee7faf"
    }]
};
let resp;
const fakePayLoadOrders = { data: [], message: "No Orders" };

test.beforeAll(async () => {
    const apiContext = await request.newContext();
    const apiUtils = new APIUtils(apiContext, loginPayLoad);
    resp = await apiUtils.createOrder(orderPayLoad);
});

test('check order in summary page', async ({ browser }) => {
    const context = await browser.newContext();
    const page = await context.newPage();

    page.addInitScript((value) => {
        window.localStorage.setItem('token', value)
    }, resp.token);

    await page.goto('https://rahulshettyacademy.com/client/');

    await page.route("https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/*",
        async route => {
            const response = await page.request.fetch(route.request());
            console.log(response);
            let body = JSON.stringify(fakePayLoadOrders);
            route.fulfill(
                {
                    response,
                    body,

                });
            //intercepting response -APi response-> { playwright fakeresponse}->browser->render data on front end
        });

    await page.locator('[routerlink *= "myorders"]').nth(0).click();
    await page.waitForResponse("https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/*")
    console.log(await page.locator(".mt-4").textContent());
})