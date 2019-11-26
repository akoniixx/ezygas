import axios from "axios";
import { all, call, fork, put, takeEvery } from "redux-saga/effects";

import { HISTORY_GET_LIST } from "Constants/actionTypes";

import {
  getHistoryListSuccess,
} from "./actions";

import HistoryData from "Data/order.json";
const LocalHistory = HistoryData.data

// getHistory //
const getHistoryListRequest = async (path) => {
  return axios.get(`${path}`)
    .then(response => response)
    .catch(error => error);
}

function* getHistoryListItems({ payload }) {
    const { path } = payload
  try {
    const response = yield call(getHistoryListRequest, path);
    if (!response.message) {
      yield put(getHistoryListSuccess(response.data.data));
    } else {
      yield put(getHistoryListSuccess(LocalHistory));
      console.log('DataLocalHistory')
    }
  } catch (error) {
  }
}

export function* watchGetList() {
  yield takeEvery(HISTORY_GET_LIST, getHistoryListItems);
}

export default function* rootSaga() {
  yield all([
    fork(watchGetList),
  ]);
}