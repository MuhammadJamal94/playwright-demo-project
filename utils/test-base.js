const {base} = require('@playwright/test');

exports.test = base.test.extend({
    testDataForOrder: {
            email: "hantoka@fantoka.com",
            password: "Aa123123!",
            productName: "ZARA COAT 3"
    }
})