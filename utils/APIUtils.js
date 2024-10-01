class APIUtils {
    constructor(apiContext, loginPayLoad) {
        this.apiContext = apiContext;
        this.loginPayLoad = loginPayLoad;
    }
    async getToken() {
        const loginResponse = await this.apiContext.post('https://rahulshettyacademy.com/api/ecom/auth/login',
            { data: this.loginPayLoad });
        // expect(loginResponse.ok()).toBeTruthy();
        const loginResponseJson = await loginResponse.json();
        const token = loginResponseJson.token
        console.log('token => ' + token);
        return token;
    }
    async createOrder(orderPayLoad) {
        let resp = {};

        resp.token = await this.getToken();
        const orderResponse = await this.apiContext.post('https://rahulshettyacademy.com/api/ecom/order/create-order',
            {
                data: orderPayLoad,
                headers: {
                    'Authorization': resp.token,
                    'content-type': 'application/json'
                }
            });
        const orderResponseJson = await orderResponse.json();
        const orderId = orderResponseJson.orders[0];
        resp.orderId = orderId;
        console.log('OrderId => ' + orderId)
        return resp;
    }
}
module.exports = {APIUtils};