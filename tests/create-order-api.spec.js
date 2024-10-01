import { test, expect, request } from "@playwright/test";
const loginPayLoad = {
    userEmail: "hantoka@fantoka.com",
    userPassword: "Aa123123!"
}
const orderPayLoad = {
    orders: [{
        country: "Germany",
        productOrderedId: "6581ca979fd99c85e8ee7faf"
    }]
}
const {APIUtils} = require('../utils/APIUtils');
let resp;

test.beforeAll(async () => {
    const apiContext = await request.newContext();
    const apiUtils = new APIUtils(apiContext, loginPayLoad);
    resp = await apiUtils.createOrder(orderPayLoad);
})

test('check order in summary page', async ({ browser }) => {
    const context = await browser.newContext();
    const page = await context.newPage();

    page.addInitScript((value) => {
        window.localStorage.setItem('token', value)
    }, resp.token);

    await page.goto('https://rahulshettyacademy.com/client/');

    await page.locator('[routerlink *= "myorders"]').nth(0).click();
    const orders =  page.locator('tbody tr');
    
    await page.locator('text = Your Orders').waitFor();
    for(let i = 0; i < await orders.count(); i++){
        if(await orders.locator('[scope = "row"]').nth(i).textContent() === resp.orderId){
            await orders.nth(i).locator('.btn-primary').click();
            console.log(`Order is found!`);
            break;
        }
    }

    const orderDetailsPageId = await page.locator('.col-text').textContent();
    expect(orderDetailsPageId).toEqual(resp.orderId);
})