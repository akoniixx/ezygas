import axios from "axios";
import { all, call, fork, put, takeEvery } from "redux-saga/effects";
import { getCookie } from 'Util/Utils';
import { CUSTOMER_GET_LIST, CUSTOMER_POST_ITEM, CUSTOMER_POST_CHECK_NAME } from "Constants/actionTypes";
import {
  getCustomerListSuccess,
  postCustomerSuccess,
} from "./actions";

import CustomerData from "Data/customer.json";
const LocalCustomer = CustomerData.data

// getCustomer //
const getCustimerListRequest = async (path) => {
  return axios.get(`${path}`)
    .then(response => response)
    .catch(error => error);
}

function* getCustimerListItems({ payload }) {
  const { path } = payload
  try {
    const response = yield call(getCustimerListRequest, path);
    if (!response.message) {
      yield put(getCustomerListSuccess(response.data.data));
      // console.log('getCustimerMessage', response)
    } else {
      yield put(getCustomerListSuccess(LocalCustomer));
      console.log('DataLocal')
    }
  } catch (error) {
    // console.log('GetCustimerListItems Error : ', error)
  }
}

// postCustomer //
const postCustomerItemAsync = async (path, items, id) => {
  return await postCustomerItemRequest(path, items, id)
    .then(response => response.json())
    .catch(error => error);
}

function postCustomerItemRequest(path, items, id) {
  if (id != "") {
    path = path + id + "/"
  }
  var csrftoken = getCookie('csrftoken');
  return fetch(path, {
    credentials: 'include',
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
      'X-CSRFToken': csrftoken,
    },
    body: JSON.stringify(items),
  })
    .then(response => response)
    .catch((error) => { throw error })
}

function* postCustomerItem({ payload }) {
  const { path, items, id, status } = payload
  try {
    const response = yield call(postCustomerItemAsync, path, items, id);
    if (!response.message) {
      yield put(postCustomerSuccess(status))
    } else {
      // console.log("else", response.message)
      yield put(postCustomerSuccess(response.message))
    }
  } catch (error) {

  }
}

export function* watchGetList() {
  yield takeEvery(CUSTOMER_GET_LIST, getCustimerListItems);
}

export function* watchPostItem() {
  yield takeEvery(CUSTOMER_POST_ITEM, postCustomerItem);
}

export function* watchPostCheckNameItem() {
  yield takeEvery(CUSTOMER_POST_CHECK_NAME, postCustomerItem);
}

export default function* rootSaga() {
  yield all([
    fork(watchGetList),
    fork(watchPostItem),
    fork(watchPostCheckNameItem)
  ]);
}