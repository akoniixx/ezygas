import axios from "axios";
import { all, call, fork, put, takeEvery } from "redux-saga/effects";
import { getCookie } from 'Util/Utils';
import {
    PROMOTION_GET_LIST,
    PROMOTION_POST_ITEM,
    PROMOTION_HISTORY_GET_LIST
} from "Constants/actionTypes"
import {
    getPromotionSuccess,
    getPromotionHistorySuccess
} from "./actions";

import PromotionData from "Data/promotion.json";
const LocalPromotion = PromotionData.data

import PromotionHistoryData from "Data/promotionHistory.json";
const LocalPromotionHistory = PromotionHistoryData.data

// get //
const getListRequest = async (path) => {
    return axios.get(`${path}`)
        .then(response => response)
        .catch(error => error);
}

function* getListItems({ payload }) {
    const { path, status } = payload
    try {
        const response = yield call(getListRequest, path);
        if (!response.message) {
            if (status === "promotion") {
                yield put(getPromotionSuccess(response.data.data));
            } else if (status === "promotionHistory") {
                yield put(getPromotionHistorySuccess(response.data.data));
            }
        } else {
            if (status === "promotion") {
                yield put(getPromotionSuccess(LocalPromotion));
            } else if (status === "promotionHistory") {
                yield put(getPromotionHistorySuccess(LocalPromotionHistory));
            }
            console.log('DataLocal')
        }
    } catch (error) {
    }
}

// post //
const postItemAsync = async (path, items) => {
    return await postItemRequest(path, items)
        .then(response => response.json())
        .catch(error => error);
}

function postItemRequest(path, items) {
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

function* postItems({ payload }) {
    const { path, items } = payload
    //console.log("path", path, "items", items)
    try {
        const response = yield call(postItemAsync, path, items);
        if (!response.message) {

        } else {

        }
    } catch (error) {

    }
}


export function* watchGetList() {
    yield takeEvery(PROMOTION_GET_LIST, getListItems);
}

export function* watchPostList() {
    yield takeEvery(PROMOTION_POST_ITEM, postItems);
}

export function* watchGetHistoryList() {
    yield takeEvery(PROMOTION_HISTORY_GET_LIST, getListItems);
}

export default function* rootSaga() {
    yield all([
        fork(watchGetList),
        fork(watchPostList),
        fork(watchGetHistoryList)
    ]);
}