import axios from "axios";
import { all, call, fork, put, takeEvery } from "redux-saga/effects";
import { getCookie } from 'Util/Utils';
import { STOCK_GET_LIST, STOCK_POST_ITEM } from "Constants/actionTypes";
import { apiStock } from "Constants/defaultValues";

import {
  getStockListSuccess,
  postStockSuccess,
} from "./actions";

import StockData from "Data/stock.json";
const LocalStock = StockData.data

// getStock //
export const getStockListRequest = async () => {
    return axios.get(`${apiStock}`)
      .then(response => response)
      .catch(error => error);
  }
  
  function* getStockListItems() {
    try {
      const response = yield call(getStockListRequest);
      if (!response.message) {
        yield put(getStockListSuccess(response.data.data));
        // console.log('getCustimerMessage', response)
      } else {
        yield put(getStockListSuccess(LocalStock));
        console.log('DataLocalStock')
      }
    } catch (error) {
      // console.log('GetCustimerListItems Error : ', error)
    }
  }

// postStock //
const postStockItemAsync = async (items, id) => {
    return await postStockItemRequest(items, id)
      .then(response => response.json())
      .catch(error => error);
  }
  
  function postStockItemRequest(items, id) {
    var path = apiStock
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
  
  function* postStockItem({ payload }) {
    const { items, id } = payload
    try {
      const response = yield call(postStockItemAsync, items, id);
      const getData = yield call(getStockListRequest);
      if (!response.message) {
        yield put(postStockSuccess("Success"))
        yield put(getStockListSuccess(getData.data.data));
      } else {
        yield put(postStockSuccess(response.message))
      }
    } catch (error) {
  
    }
  }

  export function* watchGetList() {
    yield takeEvery(STOCK_GET_LIST, getStockListItems);
  }
  
  export function* watchPostItem() {
    yield takeEvery(STOCK_POST_ITEM, postStockItem);
  }
  
  export default function* rootSaga() {
    yield all([
      fork(watchGetList),
      fork(watchPostItem),
    ]);
  }