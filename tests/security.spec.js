const { test, expect } = require("@playwright/test");

test('verify user cannot access orders not associated with them', async ({ page }) => {
    const email = 'hantoka@fantoka.com';

    const emailField = page.locator('#userEmail');
    const passwordField = page.locator('#userPassword');
    const signInBtn = page.locator('#login');
    
    await page.goto('https://rahulshettyacademy.com/client');
    await emailField.fill(email);
    await passwordField.fill('Aa123123!');
    await signInBtn.click();
    await page.waitForLoadState('networkidle');
    await page.locator("button[routerlink*='myorders']").click();

    await page.route('https://rahulshettyacademy.com/api/ecom/order/get-orders-details?id=*', 
        async route => route.continue({url: 'https://rahulshettyacademy.com/api/ecom/order/get-orders-details?id=621661f884b053f6765465b6'}));
    await page.locator('button:has-text("View")').first().click();
    await expect(page.locator("p").last()).toHaveText("You are not authorize to view this order");
});