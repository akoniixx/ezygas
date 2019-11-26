import {
    STOCK_GET_LIST,
    STOCK_GET_LIST_SUCCESS,
    STOCK_POST_ITEM,
    STOCK_POST_ITEM_SUCCESS,
} from 'Constants/actionTypes';

export const getStock = () => ({
    type: STOCK_GET_LIST,
});

export const getStockListSuccess = (items) => ({
    type: STOCK_GET_LIST_SUCCESS,
    payload: items
});

export const postStock = (items, id) => ({
    type: STOCK_POST_ITEM,
    payload: { items, id }
});

export const postStockSuccess = (items) => ({   
    type: STOCK_POST_ITEM_SUCCESS,
    payload: items
});
