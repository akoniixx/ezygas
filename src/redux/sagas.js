import { all } from 'redux-saga/effects';
import authSagas from './auth/saga';
import customerSaga from './customer/saga';
import stockSaga from './stock/saga';
import orderSaga from './order/saga';
import historySaga from './history/saga';
import vendorSaga from './vendor/saga';
import userSaga from './user/saga';
import fillSaga from './fill/saga';
import dashbordSaga from './dashboard/saga';
import paymentSaga from './payment/saga';
import notificationSaga from './notification/saga';
import admin_vendor_managementSaga from './admin/saga';
import promotiomSaga from './promotion/saga';
import fixCostSaga from './fixCost/saga';
import private_price_Saga from './privatePrice/saga';

export default function* rootSaga(getState) {
  yield all([
    authSagas(),
    customerSaga(),
    stockSaga(),
    orderSaga(),
    historySaga(),
    vendorSaga(),
    userSaga(),
    fillSaga(),
    dashbordSaga(),
    paymentSaga(),
    notificationSaga(),
    admin_vendor_managementSaga(),
    promotiomSaga(),
    fixCostSaga(),
    private_price_Saga(),
  ]);
}
