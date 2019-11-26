import axios from "axios";
import { all, call, fork, put, takeEvery } from "redux-saga/effects";

import { GRAPH_GET_LIST, HISTOGRAM_GET_LIST, SALE_GET_LIST, STOCKTABLE_GET_LIST } from "Constants/actionTypes";

import {
    getGraphSuccess,
    getHistogramSuccess,
    getSaleSuccess,
    getStockTableSuccess,
} from "./actions";

import testIncome from 'Data/testIncome.json';
import testSales from 'Data/testSales.json';
import testTodaySales from 'Data/testTodaySales.json';
import testStockTable from 'Data/testStockTable.json';

const localData = {
    graph: testIncome.data,
    histogram: testSales.data,
    sale: testTodaySales.data,
    stockTable: testStockTable.data
}

// getDashboard //
const getDashboardRequest = async (path) => {
    return axios.get(`${path}`)
        .then(response => response)
        .catch(error => error);
}

function* condition(status, response) {
    //let data = response === undefined || response === null ?  localData[status] : response //comment this line on production
    let data = response; //uncomment this line on production.
    if (status === "graph") {
        yield put(getGraphSuccess(data));
    }
    else if (status === "histogram") {
        yield put(getHistogramSuccess(data));
    }
    else if (status === "sale") {
        yield put(getSaleSuccess(data));
    }
    else if (status === "stockTable") {
        yield put(getStockTableSuccess(data));
    }
}

function* getDashboardItems({ payload }) {
    const { status, path } = payload
    try {
        const response = yield call(getDashboardRequest, path);
        if (!response.message) {
            yield call(condition, status, response.data.data);
        } else {
            yield call(condition, status);
        }
    } catch (error) {
    }
}

export function* watchGetGraph() {
    yield takeEvery(GRAPH_GET_LIST, getDashboardItems);
}

export function* watchGetHistogram() {
    yield takeEvery(HISTOGRAM_GET_LIST, getDashboardItems);
}

export function* watchGetSale() {
    yield takeEvery(SALE_GET_LIST, getDashboardItems);
}

export function* watchGetStockTable() {
    yield takeEvery(STOCKTABLE_GET_LIST, getDashboardItems);
}

export default function* rootSaga() {
    yield all([
        fork(watchGetGraph),
        fork(watchGetHistogram),
        fork(watchGetSale),
        fork(watchGetStockTable),
    ]);
}