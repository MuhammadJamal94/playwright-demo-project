import { test } from "@playwright/test";

test('playwright special locators', async ({page}) => {
    await page.goto('https://rahulshettyacademy.com/angularpractice/');
    await page.getByLabel('Check me out if you Love IceCreams!').click();
    await page.getByLabel('Employed').click();
    await page.getByLabel('Gender').selectOption('Female');
    await page.getByPlaceholder('Password').fill('12345678');
    await page.getByRole("button", {name: 'Submit'}).click();
    await page.getByRole("link", {name: 'Shop'}).click();
    await page.locator('app-card').filter({hasText: 'Nokia Edge'}).getByRole("button").click();
});