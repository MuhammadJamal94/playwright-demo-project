const { test, expect } = require('@playwright/test')

test('Browser context test case', async ({ browser }) => {
    const context = await browser.newContext();
    const page = await context.newPage();
    const userNameField = page.locator('#username');
    const passwordField = page.locator('[type = "password"]');
    const signInBtn = page.locator('#signInBtn');
    const cardTitles = page.locator('.card-body a');

    await page.goto('https://rahulshettyacademy.com/loginpagePractise/');
    await userNameField.fill('Mohamad Jamal');
    await passwordField.fill('123123');
    await signInBtn.click();
    console.log(await page.locator('[style *= "block"]').textContent());
    await expect(page.locator('[style *= "block"]')).toContainText('Incorrect');

    await userNameField.fill('rahulshettyacademy');
    await passwordField.fill('learning');
    await signInBtn.click();

    console.log(await cardTitles.first().textContent());
    const allTitles = await cardTitles.allTextContents();
    console.log(allTitles);
});

test('id extraction', async ({ page }) => {
    const productName = 'ZARA COAT 3';
    const email = 'hantoka@fantoka.com';
    const emailField = page.locator('#userEmail');
    const passwordField = page.locator('#userPassword');
    const signInBtn = page.locator('#login');
    const products = page.locator('.card-body');

    await page.goto('https://rahulshettyacademy.com/client');
    await emailField.fill(email);
    await passwordField.fill('Aa123123!');
    await signInBtn.click();
    await page.waitForLoadState('networkidle');

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
    await page.locator('[placeholder *= "Country"]').pressSequentially('ind',{delay:100});
    const dropDown = page.locator('.ta-results');
    await dropDown.waitFor();
    const countries = dropDown.locator('button');

    for(let i = 0; i < await countries.count(); i++){
        if(await countries.nth(i).textContent() === ' India'){
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
    const orders =  page.locator('tbody tr');
    
    await page.locator('text = Your Orders').waitFor();
    for(let i = 0; i < await orders.count(); i++){
        if(await orders.locator('[scope = "row"]').nth(i).textContent() === trimmedId){
            await orders.nth(i).locator('.btn-primary').click();
            console.log(`Order is found!`);
            break;
        }
    }

    const orderDetailsPageId = await page.locator('.col-text').textContent();
    expect(orderDetailsPageId).toEqual(trimmedId);
});

test('ui controls', async ({ page }) => {
    const userNameField = page.locator('#username');
    const passwordField = page.locator('[type = "password"]');
    const dropDown = page.locator('select.form-control');
    const documentLink = page.locator('[href *= "documents-request"]')
    await page.goto('https://rahulshettyacademy.com/loginpagePractise/');
    await userNameField.fill('rahulshettyacademy');
    await passwordField.fill('learning');
    await dropDown.selectOption('consult');
    await page.locator('#terms').check();
    await page.locator('#terms').uncheck();
    await expect(page.locator('#terms')).not.toBeChecked();
    await expect(documentLink).toHaveAttribute('class', 'blinkingText');
});

test('child windows', async ({ browser }) => {
    const context = await browser.newContext();
    const page = await context.newPage();

    const userNameField = page.locator('#username');
    const documentLink = page.locator('[href *= "documents-request"]');

    await page.goto('https://rahulshettyacademy.com/loginpagePractise/');

    const [newPage] = await Promise.all([
        context.waitForEvent('page'),
        documentLink.click()
    ]);

    const text = await newPage.locator('.red').textContent();
    const newTextArray = text.split('@');
    const domain = newTextArray[1].split(' ')[0];
    console.log(domain);

    await userNameField.fill(domain);
});

test('visual testing', async ({page}) => {
    await page.goto('https://www.dc.com/characters/batman');
    expect(await page.screenshot()).toMatchSnapshot('landing.png');
});