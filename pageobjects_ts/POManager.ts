import { Page } from "@playwright/test";
import { LoginPage } from "./LoginPage";
import { DashboardPage } from "./DashboardPage";
import { CartPage } from "./CartPage";
import { CheckoutPage } from "./CheckoutPage"
import { ThankyouPage } from "./ThankyouPage";

export class POManager {
    page: Page;
    loginPage : LoginPage;
    dashboardPage: DashboardPage;
    cartPage: CartPage;
    checkoutPage: CheckoutPage;
    thankyouPage: ThankyouPage;
    
    constructor(page: Page) {
        this.page = page;
        this.loginPage = new LoginPage(this.page);
        this.dashboardPage = new DashboardPage(this.page);
        this.cartPage = new CartPage(this.page);
        this.checkoutPage = new CheckoutPage(this.page);
        this.thankyouPage = new ThankyouPage(this.page);
    };

    getLoginPage() {
        return this.loginPage;
    }
    getDashboardPage() {
        return this.dashboardPage;
    }
    getCartPage() {
        return this.cartPage;
    }
    getCheckoutPage() {
        return this.checkoutPage;
    }
    getThankyouPage() {
        return this.thankyouPage;
    }
}