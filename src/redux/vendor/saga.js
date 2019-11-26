import axios from "axios";
import { all, call, fork, put, takeEvery } from "redux-saga/effects";

import { VENDOR_GET_LIST } from "Constants/actionTypes";
import { apiVendor } from "Constants/defaultValues";
import {
  getVendorListSuccess,
} from "./actions";

import VendorData from "Data/vendor.json";
const LocalVendor = VendorData.data

// getVendor //
const getVendorListRequest = async () => {
  return axios.get(`${apiVendor}`)
    .then(response => response)
    .catch(error => error);
}

function* getVendorListItems() {
  try {
    const response = yield call(getVendorListRequest);
    if (!response.message) {
      yield put(getVendorListSuccess(response.data.data));
    } else {
      yield put(getVendorListSuccess(LocalVendor));
    }
  } catch (error) {
  }
}

export function* watchGetList() {
  yield takeEvery(VENDOR_GET_LIST, getVendorListItems);
}

export default function* rootSaga() {
  yield all([
    fork(watchGetList),
  ]);
}