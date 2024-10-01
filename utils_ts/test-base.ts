// {base} = require('@playwright/test');
import { test as baseTest } from "@playwright/test";
interface TestDataForOrder {
  email: string;
  password: string;
  productName: string;
}
export const customTest = baseTest.extend<{ testDataForOrder: TestDataForOrder }>({
  testDataForOrder: {
    email: "hantoka@fantoka.com",
    password: "Aa123123!",
    productName: "ZARA COAT 3",
  },
});
