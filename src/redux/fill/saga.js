import axios from "axios";
import { all, call, fork, put, takeEvery } from "redux-saga/effects";
import { getCookie } from 'Util/Utils';
import { FILL_GET_LIST, FILL_POST_ITEM } from "Constants/actionTypes";
import { apiFill } from "Constants/defaultValues";
import {
  getFillListSuccess,
  postFillSuccess,
} from "./actions";
import { getStockListRequest } from "Redux/stock/saga";
import {
  getStockListSuccess
} from "Redux/stock/actions"; 

import FillData from "Data/fill.json";
const LocalFill = FillData.data

// getFill //
const getFillListRequest = async () => {
  return axios.get(`${apiFill}`)
    .then(response => response)
    .catch(error => error);
}

function* getFillListItems() {
  try {
    const response = yield call(getFillListRequest);
    if (!response.message) {
      yield put(getFillListSuccess(response.data.data));
      // console.log('getCustimerMessage', response)
    } else {
      yield put(getFillListSuccess(LocalFill));
      console.log('DataLocalFill')
    }
  } catch (error) {
    // console.log('GetCustimerListItems Error : ', error)
  }
}

// postFill //
const postFillItemAsync = async (items, id) => {
  return await postFillItemRequest(items, id)
    .then(response => response.json())
    .catch(error => error);
}

function postFillItemRequest(items, id) {
  var path = apiFill
  if (id != "") {
    path = path + id + "/done/"
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

function* postFillItem({ payload }) {
  const { items, id, status } = payload
  try {
    const response = yield call(postFillItemAsync, items, id);
    const getData = yield call(getFillListRequest);
    const getStockData = yield call(getStockListRequest);
    if (!response.message) {
      yield put(postFillSuccess(status))
      yield put(getFillListSuccess(getData.data.data));
      yield put(getStockListSuccess(getStockData.data.data));
    } else {
      // console.log("else", response.message)
      yield put(postFillSuccess(response.message))
    }
  } catch (error) {

  }
}

export function* watchGetList() {
  yield takeEvery(FILL_GET_LIST, getFillListItems);
}

export function* watchPostItem() {
  yield takeEvery(FILL_POST_ITEM, postFillItem);
}

export default function* rootSaga() {
  yield all([
    fork(watchGetList),
    fork(watchPostItem),
  ]);
}