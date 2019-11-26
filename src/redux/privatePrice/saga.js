import axios from "axios";
import { all, call, fork, put, takeEvery } from "redux-saga/effects";
import { getCookie } from 'Util/Utils';
import { PRIVATE_PRICE_GET_LIST, PRIVATE_PRICE_POST_ITEM } from "Constants/actionTypes";
import { getPrivatePriceListSuccess } from "./actions";
const data = [{ id: 1, name_th: "ซื้อครบ 300 บาท ลด 10 บาท", maximum_price: 300, discount_price: 10 },
              { id: 2, name_th: "ซื้อครบ 500 บาท ลด 20 บาท", maximum_price: 500, discount_price: 20 },
              { id: 3, name_th: "ซื้อครบ 500 ลด 30", maximum_price: 500, discount_price: 30 }
             ]
/* getPRIVATE_PRICE */
const getListRequest = async (path) => {
    return axios.get(`${path}`)
        .then(response => response)
        .catch(error => error);
}

function* getListItems({ payload }) {
    const { path } = payload
    try {
        const response = yield call(getListRequest, path);
        if (!response.message) {
            yield put(getPrivatePriceListSuccess(response.data.data));
        } else {
            yield put(getPrivatePriceListSuccess(data));
            console.log('DataLocal')
        }
    } catch (error) {
    }
}

/* postPRIVATE_PRICE */
const postItemAsync = async (items, path) => {
    return await postItemRequest(items, path)
        .then(response => response.json())
        .catch(error => error);
}

function postItemRequest(items, path) {
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
    const { items, path, id, status, customer_id } = payload
    let pathPost = path
    if (status == "discouts") {
        pathPost = pathPost + id + "/";
    }
    else if(status == "promotion"){
        pathPost = pathPost + id + "/add_customer/" + customer_id + "/";
    }
    console.log(pathPost);
    try {
        const response = yield call(postItemAsync, items, pathPost);
        const get = yield call(getListRequest, path);
        if (!response.message) {
            yield put(getPrivatePriceListSuccess(get.data.data));
        } else {
            yield put(getPrivatePriceListSuccess(data));
            console.log('DataLocal')
        }
    } catch (error) {

    }
}

export function* watchGetList() {
    yield takeEvery(PRIVATE_PRICE_GET_LIST, getListItems);
}

export function* watchPostItem() {
    yield takeEvery(PRIVATE_PRICE_POST_ITEM, postItem);
}

export default function* rootSaga() {
    yield all([
        fork(watchGetList),
        fork(watchPostItem)
    ]);
}
