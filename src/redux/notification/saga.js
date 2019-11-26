import axios from "axios";
import { all, call, fork, put, takeEvery } from "redux-saga/effects";
import { NOTIFICATION_GET } from "Constants/actionTypes";

import {
    getNotificationSuccess
} from "./actions";

const getNotificationRequest = async () => {
    return axios.get(`${apiCustomer}`)
        .then(response => response)
        .catch(error => error);
}

function* getNotification() {
    try {
        const response = yield call(getNotificationRequest);
        if (!response.message) {
            yield put(getNotificationSuccess(response.data.data));
        } else {
            // yield put(getNotificationSuccess(LocalNotification));
            console.log('DataLocal')
        }
    } catch (error) {
    }
}

export function* watchGetList() {
    yield takeEvery(NOTIFICATION_GET, getNotification);
}

export default function* rootSaga() {
    yield all([
        fork(watchGetList),
    ]);
}