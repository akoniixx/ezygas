import axios from "axios";
import { all, call, fork, put, takeEvery } from "redux-saga/effects";
import { getCookie } from 'Util/Utils';
import { ADMIN_VENDOR_GET_LIST, ADMIN_REGISTER_APPROVE_ITEM } from "Constants/actionTypes";
import { apiVendorManagement } from "Constants/defaultValues";

import {
    adminGetVendorListSuccess
} from "./actions";

import admin_vendor_management from "Data/admin_vendor_management.json";
const LocalAdmin_vendor_management = admin_vendor_management.data

// get //
const getListRequest = async () => {
    return axios.get(`${apiVendorManagement}`)
        .then(response => response)
        .catch(error => error);
}

function* getListItems() {
    try {
        const response = yield call(getListRequest);
        if (!response.message) {
            yield put(adminGetVendorListSuccess(response.data.data));
        } else {
            yield put(adminGetVendorListSuccess(LocalAdmin_vendor_management));
            console.log('LocalAdmin_vendor_management')
        }
    } catch (error) {
        // console.log('GetCustimerListItems Error : ', error)
    }
}

// post //
const postItemAsync = async (items, id) => {
    return await postItemRequest(items, id)
        .then(response => response.json())
        .catch(error => error);
}

function postItemRequest(items, id) {
    var path = apiVendorManagement
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

function* postItem({ payload }) {
    const { items, id } = payload
    try {
        const response = yield call(postItemAsync, items, id);
        const getData = yield call(getListRequest);
        if (!response.message) {
            yield put(adminGetVendorListSuccess(getData.data.data));
        } else {
            yield put(adminGetVendorListSuccess(LocalAdmin_vendor_management));
            console.log('LocalAdmin_vendor_management')
        }
    } catch (error) {

    }
}

export function* watchGetList() {
    yield takeEvery(ADMIN_VENDOR_GET_LIST, getListItems);
}

export function* watchPostItem() {
    yield takeEvery(ADMIN_REGISTER_APPROVE_ITEM, postItem);
}

export default function* rootSaga() {
    yield all([
        fork(watchGetList),
        fork(watchPostItem),
    ]);
}