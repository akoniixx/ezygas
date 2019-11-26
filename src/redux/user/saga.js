import axios from "axios";
import { all, call, fork, put, takeEvery } from "redux-saga/effects";

import { USER_GET_LIST } from "Constants/actionTypes";
import { apiUser } from "Constants/defaultValues";
import {
  getUserListSuccess,
} from "./actions";

import UserData from "Data/user.json";
const LocalUser = UserData.data

// getUsers //
const getUserListRequest = async () => {
  return axios.get(`${apiUser}`)
    .then(response => response)
    .catch(error => error);
}

function* getUserListItems() {
  try {
    const response = yield call(getUserListRequest);
    if (!response.message) {
      yield put(getUserListSuccess(response.data.data));
    } else {
      yield put(getUserListSuccess(LocalUser));
    }
  } catch (error) {
  }
}

export function* watchGetList() {
  yield takeEvery(USER_GET_LIST, getUserListItems);
}

export default function* rootSaga() {
  yield all([
    fork(watchGetList),
  ]);
}