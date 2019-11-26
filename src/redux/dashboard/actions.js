import {
    GRAPH_GET_LIST,
    GRAPH_GET_LIST_SUCCESS,
    HISTOGRAM_GET_LIST,
    HISTOGRAM_GET_LIST_SUCCESS,
    SALE_GET_LIST,
    SALE_GET_LIST_SUCCESS,
    STOCKTABLE_GET_LIST,
    STOCKTABLE_GET_LIST_SUCCESS
} from 'Constants/actionTypes';

import { graphApi, histogramApi, todaySalesApi, stockTableApi}  from "Constants/defaultValues";

/* GRAPH */
export const getGraph = (status="graph", path=graphApi) => ({
    type: GRAPH_GET_LIST,
    payload: { status, path }
});

export const getGraphSuccess = (items) => ({
    type: GRAPH_GET_LIST_SUCCESS,
    payload: items
});

/* HISTOGRAM */
export const getHistogram = (status="histogram", path=histogramApi) => ({
    type: HISTOGRAM_GET_LIST,
    payload: { status, path }
});

export const getHistogramSuccess = (items) => ({
    type: HISTOGRAM_GET_LIST_SUCCESS,
    payload: items
});

/* SALE */
export const getSale = (status="sale", path=todaySalesApi) => ({
    type: SALE_GET_LIST,
    payload: { status, path }
});

export const getSaleSuccess = (items) => ({
    type: SALE_GET_LIST_SUCCESS,
    payload: items
});

/* STOCKTABLE */
export const getStockTable = (status="stockTable", path=stockTableApi) => ({
    type: STOCKTABLE_GET_LIST,
    payload: { status, path }
});

export const getStockTableSuccess = (items) => ({
    type: STOCKTABLE_GET_LIST_SUCCESS,
    payload: items
});