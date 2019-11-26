import {
    CUSTOMER_GET_LIST,
    CUSTOMER_GET_LIST_SUCCESS,
    CUSTOMER_POST_ITEM,
    CUSTOMER_POST_ITEM_SUCCESS,
    CUSTOMER_POST_CHECK_NAME,
    CUSTOMER_POST_CHECK_NAME_RESPONSE,
    CUSTOMER_SELECTED
} from 'Constants/actionTypes';
import { apiCustomer, apiCheckCustomerName } from "Constants/defaultValues";

export const getCustomer = (path=apiCustomer) => ({
    type: CUSTOMER_GET_LIST,
    payload: { path }
});

export const getCustomerListSuccess = (items) => ({
    type: CUSTOMER_GET_LIST_SUCCESS,
    payload: items
});

export const postCustomer = (items, id="", status="Success", path=apiCustomer) => ({
    type: CUSTOMER_POST_ITEM,
    payload: { path, items, id, status }
});

export const postCustomerSuccess = (items) => ({   
    type: CUSTOMER_POST_ITEM_SUCCESS,
    payload: items
});

export const postCheckCustomerName = (items, id="", status="name available", path=apiCheckCustomerName) => ({
    type: CUSTOMER_POST_CHECK_NAME,
    payload: { path, items, id, status }
});

export const postCheckCustomerNameResponse = (items) => ({
    type: CUSTOMER_POST_CHECK_NAME_RESPONSE,
    payload: items
});

export const selectedCustomer = (items) => ({
    type: CUSTOMER_SELECTED,
    payload: items
});


