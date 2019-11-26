import { combineReducers } from 'redux';
import settings from './settings/reducer';
import menu from './menu/reducer';
import authUser from './auth/reducer';
import landingPage from './landingPage/reducer';
import customer from './customer/reducer';
import stock from './stock/reducer';
import order from './order/reducer';
import history from './history/reducer';
import vendor from './vendor/reducer';
import user from './user/reducer';
import fill from './fill/reducer';
import dashboard from './dashboard/reducer';
import payment from './payment/reducer';
import notification from './notification/reducer'
import admin_vendor_management from './admin/reducer';
import promotion from './promotion/reduce';
import fixCost from './fixCost/reducer';
import private_price from './privatePrice/reduser';

const reducers = combineReducers({
  menu,
  settings,
  authUser,
  landingPage,
  customer,
  stock,
  order,
  history,
  vendor,
  user,
  fill,
  dashboard,
  payment,
  notification,
  admin_vendor_management,
  promotion,
  fixCost,
  private_price,
});

export default reducers;