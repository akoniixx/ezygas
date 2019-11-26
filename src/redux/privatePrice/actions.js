import {
    PRIVATE_PRICE_GET_LIST,
    PRIVATE_PRICE_GET_LIST_SUCCESS,
    PRIVATE_PRICE_POST_ITEM
} from 'Constants/actionTypes'
import { apiPrivatePrice } from "Constants/defaultValues";

export const getPrivatePrice = (path=apiPrivatePrice) => ({
    type: PRIVATE_PRICE_GET_LIST,
    payload: { path }
});

export const getPrivatePriceListSuccess = (items) => ({
    type: PRIVATE_PRICE_GET_LIST_SUCCESS,
    payload: items
});

export const postPrivatePrice = (items, id="", customer_id="",status="discout", path=apiPrivatePrice) => ({
    type: PRIVATE_PRICE_POST_ITEM,
    payload: { items, id, customer_id, status, path }
});
