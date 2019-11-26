import axios from "axios";
import { all, call, fork, put, takeEvery } from "redux-saga/effects";
import { getCookie } from 'Util/Utils';
import { ORDER_GET_LIST, ORDER_POST_ITEM, ORDER_DELETE_ITEM } from "Constants/actionTypes";
import { apiOrder } from "Constants/defaultValues";

import {
  getOrderListSuccess,
  postOrderSuccess,
} from "./actions";

import OrderData from "Data/order.json";
const LocalOrder = OrderData.data

// getOrder //
const getOrderListRequest = async () => {
  return axios.get(`${apiOrder}`)
    .then(response => response)
    .catch(error => error);
}

function* getOrderListItems() {
  try {
    const response = yield call(getOrderListRequest);
    if (!response.message) {
      yield put(getOrderListSuccess(response.data.data));
    } else {
      yield put(getOrderListSuccess(LocalOrder));
      console.log('DataLocalOrder')
    }
  } catch (error) {
  }
}

// postOrder //
const postOrderItemAsync = async (items, id) => {
  return await postOrderItemRequest(items, id)
    .then(response => response.json())
    .catch(error => error);
}

function postOrderItemRequest(items, id) {
  var path = apiOrder
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

function* postOrderItem({ payload }) {
  const { items, id } = payload
  try {
    const response = yield call(postOrderItemAsync, items, id);
    const getOrder = yield call(getOrderListRequest);
    if (!response.message) {
      yield put(postOrderSuccess("Success"))
      yield put(getOrderListSuccess(getOrder.data.data));
    } else {
      yield put(postOrderSuccess(response.message))
    }
  } catch (error) {

  }
}

//  deleteOrder //

const deleteOrderItemAsync = async (id) => {
  return await deleteOrderItemRequest(id)
    .then(response => response.json())
    .catch(error => error);
}

function deleteOrderItemRequest(id) {
  var path = apiOrder + id + "/delete/"
  var csrftoken = getCookie('csrftoken');
  return fetch(path, {
    credentials: 'include',
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
      'X-CSRFToken': csrftoken,
    },
  })
    .then(response => response)
    .catch((error) => { throw error })
}

function* deleteOrderItem({ payload }) {
  const { id } = payload;
  try {
    const response = yield call(deleteOrderItemAsync, id);
    const getOrder = yield call(getOrderListRequest);
    if (!response.message) {
    } else {
      yield put(getOrderListSuccess(getOrder.data.data));
      //console.log("delete")
    }
  } catch (error) {

  }
}

export function* watchGetList() {
  yield takeEvery(ORDER_GET_LIST, getOrderListItems);
}

export function* watchPostItem() {
  yield takeEvery(ORDER_POST_ITEM, postOrderItem);
}

export function* watchDeleteItem() {
  yield takeEvery(ORDER_DELETE_ITEM, deleteOrderItem);
}

export default function* rootSaga() {
  yield all([
    fork(watchGetList),
    fork(watchPostItem),
    fork(watchDeleteItem),
  ]);
}