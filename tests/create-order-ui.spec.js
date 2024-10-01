import { test, expect } from "@playwright/test";

let globalContext;
const email = 'hantoka@fantoka.com';

test.beforeAll(async ({browser}) => {
    const context = await browser.newContext();
    const page = await context.newPage();
    
    const emailField = page.locator('#userEmail');
    const passwordField = page.locator('#userPassword');
    const signInBtn = page.locator('#login');
    
    await page.goto('https://rahulshettyacademy.com/client');
    await emailField.fill(email);
    await passwordField.fill('Aa123123!');
    await signInBtn.click();
    await page.waitForLoadState('networkidle');
    await context.storageState({path: 'state.json'});

    globalContext = await browser.newContext({storageState: 'state.json'});
});

test('check user can create order', async () => {
    const page = await globalContext.newPage();
    await page.goto('https://rahulshettyacademy.com/client');
    const products = page.locator('.card-body');

    const productName = 'ZARA COAT 3';

    const count = await products.count()
    for (let i = 0; i < count; i++) {
        if (await products.nth(i).locator('b').textContent() === productName) {
            await products.nth(i).locator('text = Add To Cart').click();
            break;
        }
    }
    await page.locator('[routerlink *= "cart"]').click();

    await page.locator('div li').first().waitFor();
    const bool = await page.locator('h3:has-text("ZARA COAT 3")').isVisible();
    expect(bool).toBeTruthy();

    await page.locator('text = Checkout').click();
    await page.locator('[placeholder *= "Country"]').pressSequentially('ind', { delay: 100 });
    const dropDown = page.locator('.ta-results');
    await dropDown.waitFor();
    const countries = dropDown.locator('button');

    for (let i = 0; i < await countries.count(); i++) {
        if (await countries.nth(i).textContent() === ' India') {
            await countries.nth(i).click();
            break;
        }
    }
    expect(page.locator('.user__name [type = "text"]').first()).toHaveText(email);
    await page.locator('.action__submit').click();
    await expect(page.locator('.hero-primary')).toHaveText(' Thankyou for the order. ');
    const orderId = await page.locator('.em-spacer-1 .ng-star-inserted').textContent();
    console.log(`Order ID = ${orderId}`);
    const trimmedId = orderId.replace(/\|/g, '').trim();
    console.log(trimmedId);

    await page.locator('[routerlink *= "myorders"]').nth(0).click();
    const orders = page.locator('tbody tr');

    await page.locator('text = Your Orders').waitFor();
    for (let i = 0; i < await orders.count(); i++) {
        if (await orders.locator('[scope = "row"]').nth(i).textContent() === trimmedId) {
            await orders.nth(i).locator('.btn-primary').click();
            console.log(`Order is found!`);
            break;
        }
    }

    const orderDetailsPageId = await page.locator('.col-text').textContent();
    expect(orderDetailsPageId).toEqual(trimmedId);
});