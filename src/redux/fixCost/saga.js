import axios from "axios";
import { all, call, fork, put, takeEvery } from "redux-saga/effects";
import { getCookie } from 'Util/Utils';
import {
    FIXCOST_POST_ITEM
} from 'Constants/actionTypes';
import {
    postFixCostSuccess
} from "./actions";
import { apiFixCost } from "Constants/defaultValues";

//POST
const postItemAsync = async (items) => {
    return await postItemRequest(items)
        .then(response => response.json())
        .catch(error => error);
}

function postItemRequest(items) {
    var csrftoken = getCookie('csrftoken');
    return fetch(apiFixCost, {
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
    const { items } = payload
    try {
        const response = yield call(postItemAsync, items);
        if (!response.message) {
            yield put(postFixCostSuccess())
        } else {
            console.log('fixCost Local or Error')
        }
    } catch (error) {

    }
}


export function* watchPostItem() {
    yield takeEvery(FIXCOST_POST_ITEM, postItem);
}

export default function* rootSaga() {
    yield all([
        fork(watchPostItem),
    ]);
}