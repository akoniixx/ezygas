import axios from "axios";
import { all, call, fork, put, takeEvery } from "redux-saga/effects";
import { getCookie } from 'Util/Utils';
import { PACKAGE_GET_LIST, PACKAGE_CONFIRM, PAYMENT_GET_LIST, PAYMENT_CONFIRM, PAYMENT_CANCLE_ITEM, PAYMENT_GET_LIST_BY_STAFF,
         PAYMENT_APPROVE_ITEM
} from "Constants/actionTypes";

import {
  getPackageListSuccess,
  postPackageSuccess,
  getPaymentSuccess,
  postPaymentSuccess,
  getPaymentApproveStateSuccess,
} from "./actions";

import PackageData from 'Data/package.json';
import PaymentData from "Data/payment.json";
import PaymentApprove from "Data/paymentApprove.json"

const localData = {
  package: PackageData.data,
  payment: PaymentData.data,
  approve: PaymentApprove.data
}

/* getPackage */
const getListRequest = async (path) => {
  return axios.get(`${path}`)
    .then(response => response)
    .catch(error => error);
}

function* getCondition(status, response) {
  let data = response === undefined || response === null ? localData[status] : response
  if (status === "package") {
    yield put(getPackageListSuccess(data));
  } 
  else if(status === "payment"){
    yield put(getPaymentSuccess(data));
  }
  else if(status === "approve"){
    yield put(getPaymentApproveStateSuccess(data));
  }
}

function* getListItems({ payload }) {
  const { status, path } = payload
  try {
    const response = yield call(getListRequest, path);
    if (!response.message) {
      yield call(getCondition, status, response.data.data);
    } else {
      yield call(getCondition, status);
      console.log('DataLocal')
    }
  } catch (error) {
  }
}

/* post */
const postPaymentItemAsync = async (items, path) => {
  return await postPaymentItemRequest(items, path)
    .then(response => response.json())
    .catch(error => error);
}

function postPaymentItemRequest(items, path) {
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


function* postCondition(status, response) {
  let data = response === undefined || response === null ? response.message : response
  if (status === "package") {
    yield put(postPackageSuccess(data))
  } 
  else if(status === "payment"){
    yield put(postPaymentSuccess(data));
  }
}

function* postPaymentItem({ payload }){
  const { items, id, status, path } = payload
  let pathPost = path
  if(id != ''){
    pathPost = pathPost+id+"/"
  }
  try {
    const response = yield call(postPaymentItemAsync, items, pathPost);
    if (!response.message) {
      yield call(postCondition, status, "Success");
    } else {
      yield call(postCondition, status, response);
    }
  } catch (error) {

  }
}

export function* watchGetList() {
  yield takeEvery(PACKAGE_GET_LIST, getListItems);
}

export function* watchPostItem() {
  yield takeEvery(PACKAGE_CONFIRM, postPaymentItem);
}

export function* watchGetPaymentList() {
  yield takeEvery(PAYMENT_GET_LIST, getListItems);
}

export function* watchPostPaymentList() {
  yield takeEvery(PAYMENT_CONFIRM, postPaymentItem);
}

export function* watchPostCanclePayment() {
  yield takeEvery(PAYMENT_CANCLE_ITEM, postPaymentItem);
}

export function* watchGetPaymentApproveList() {
  yield takeEvery(PAYMENT_GET_LIST_BY_STAFF, getListItems);
}

export function* watchPostPaymentApprove() {
  yield takeEvery(PAYMENT_APPROVE_ITEM, postPaymentItem);
}

export default function* rootSaga() {
  yield all([
    fork(watchGetList),
    fork(watchPostItem),
    fork(watchGetPaymentList),
    fork(watchPostPaymentList),
    fork(watchPostCanclePayment),
    fork(watchGetPaymentApproveList),
    fork(watchPostPaymentApprove)
  ]);
}