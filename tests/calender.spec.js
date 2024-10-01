import { test, expect } from "@playwright/test";

test('select date test', async ({ page }) => {
    const monthNumber = "06";
    const date = "15";
    const year = "2027";

    await page.goto('https://rahulshettyacademy.com/seleniumPractise/#/offers');
    await page.locator('.react-date-picker__wrapper').click();
    await page.locator('.react-calendar__navigation__label').click();
    await page.locator('.react-calendar__navigation__label').click();
    await page.getByText(year).click();
    await page.locator('.react-calendar__year-view__months__month').nth(monthNumber - 1).click();
    await page.locator('abbr').getByText(date).click();

    const selectedDate = page.locator('[name="date"]');
    await expect(selectedDate).toHaveValue(`${year}-${monthNumber}-${date}`);
    console.log(`This is it => ${selectedDate}`);
})

test('pop-ups handeling', async ({page}) => {
    await page.goto('https://rahulshettyacademy.com/AutomationPractice/');
    await page.locator('#confirmbtn').click();
    page.on("dialog", dialog => dialog.accept());

    const iFrame = page.frameLocator('#courses-iframe');
    await iFrame.locator('li a[href *= "lifetime"]:visible').click();
    const text = await iFrame.locator('.text h2').textContent();
    const numOnly = text.split(' ')[1];
    expect(numOnly).toEqual('13,522');
})