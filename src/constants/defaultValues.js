export const defaultMenuType = 'menu-default'; // 'menu-default', 'menu-sub-hidden', 'menu-hidden';
export const defaultStartPath = '/app/analyze/index';
export const subHiddenBreakpoint = 992;
export const menuHiddenBreakpoint = 768;
export const defaultLocale = 'en';
export const localeOptions = [
    { id: 'en', name: 'English' },
    { id: 'es', name: 'Español' },
];

export const copyrightText = `${'\u00A9'} Ezygroup Innovation`;

// export const firebaseConfig = {
//     apiKey: "AIzaSyBBksq-Asxq2M4Ot-75X19IyrEYJqNBPcg",
//     authDomain: "gogo-react-login.firebaseapp.com",
//     databaseURL: "https://gogo-react-login.firebaseio.com",
//     projectId: "gogo-react-login",
//     storageBucket: "gogo-react-login.appspot.com",
//     messagingSenderId: "216495999563"
// };


export const searchPath = "/app/layouts/search"

/* PATH API */
export const apiCustomer = "/api/customer/"
export const apiCheckCustomerName = "/api/customer-exists/"
export const apiStock = "/api/stock/"
export const apiOrder = "/api/order/"
export const apiHistory = "/api/order/history/"
export const apiVendor = "/api/vendor/"
export const apiUser = "/api/user/"
export const apiFill = "/api/fill/"
export const graphApi = "/api/data/cashflow/";
export const histogramApi = "/api/data/summary_sale/";
export const todaySalesApi = "/api/data/today/";
export const stockTableApi = "/api/data/stock/";
export const apiPackage  = "/api/package/"
export const apiPayment = "/api/package_history/"
export const apiFixCost = "/api/consumption/"
export const apiPrivatePrice = "/api/discount/"

/* FOR STAFF */
export const apiVendorManagement = "/api/staff/vendor_list/" // view all vendor
export const apiPromotion = "/api/promotion/"
export const apiPromotionHistory =  "/api/promotion_history/"
export const apiApprovePackage = "/api/staff/approve_package/"
export const apiUserStatus = "/api/staff/admin_list/"

/* URL PATH */
export const urls = {
    activity: 'activity',
    adminSystem: 'adminSystem',
    analyze: 'analyze',
    approve: 'approve',
    confirmPackage: 'confirmPackage',
    confirmPayment: 'confirmPayment',
    customerManagement: 'customer-management',
    ecommerce: 'ecommerce',
    dashboards: 'dashboards',
    error: 'error',
    forgotPassword: 'forgot-password',
    history: 'history',
    landingPage: '/',
    login: 'login',
    management: 'management',
    order: 'order',
    orderList: 'order-list',
    orders: 'orders',
    package: 'package',
    payment: 'payment',
    pending: 'pending',
    privatePriceManagement: "privatePrice-management",
    productManagement: 'product-management',
    register: 'register',
    store: 'store',
    vendorManagement: 'vendorManagement',
    users: 'users'
}