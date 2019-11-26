import {
    PACKAGE_GET_LIST,
    PACKAGE_GET_LIST_SUCCESS,
    PACKAGE_SELECTEDE,
    PACKAGE_CONFIRM,
    PACKAGE_CONFIRM_SUCCESS,
    PAYMENT_GET_LIST,
    PAYMENT_GET_LIST_SUCCESS,
    PAYMENT_CONFIRM,
    PAYMENT_CONFIRM_SUCCESS,
    PAYMENT_CANCLE_ITEM,
    PAYMENT_GET_LIST_BY_STAFF,
    PAYMENT_GET_LIST_BY_STAFF_SUCCESS,
    PAYMENT_APPROVE_ITEM
} from 'Constants/actionTypes'
import { apiPackage, apiPayment, apiApprovePackage } from "Constants/defaultValues";

 // PACKAGE  
export const getPackage = (status="package", path=apiPackage) => ({
    type: PACKAGE_GET_LIST,
    payload: { status, path }
});

export const getPackageListSuccess = (items) => ({
    type: PACKAGE_GET_LIST_SUCCESS,
    payload: items
});

export const selectedPackage = (items) => ({
    type: PACKAGE_SELECTEDE,
    payload: items
});

export const postPackage = (items, id='', status="package", path=apiPayment) => ({
    type: PACKAGE_CONFIRM,
    payload: { items, id, status, path }
});

export const postPackageSuccess = (items) => ({
    type: PACKAGE_CONFIRM_SUCCESS,
    payload: items
});

// PAYMENT  
export const getPayment = (status="payment", path=apiPayment) => ({
    type: PAYMENT_GET_LIST,
    payload: { status, path }
});

export const getPaymentSuccess = (items) => ({
    type: PAYMENT_GET_LIST_SUCCESS,
    payload: items
});

export const postPayment = (items, id, status="payment", path=apiPayment) => ({
    type: PAYMENT_CONFIRM,
    payload: { items, id, status, path }
});

export const postPaymentSuccess = (items) => ({
    type: PAYMENT_CONFIRM_SUCCESS,
    payload: items
});

export const postCanclePayment = (id, items, path=apiPayment) => ({
    type: PAYMENT_CANCLE_ITEM,
    payload: { id, items, path }
});

//APPROVE PAYMENT
export const getPaymentApproveState = (status="approve", path=apiApprovePackage) => ({
    type: PAYMENT_GET_LIST_BY_STAFF,
    payload: { status, path }
});

export const getPaymentApproveStateSuccess = (items) => ({
    type: PAYMENT_GET_LIST_BY_STAFF_SUCCESS,
    payload: items
});

export const postPaymentApprove = (id, items={}, path=apiApprovePackage) => ({
    type: PAYMENT_APPROVE_ITEM,
    payload: { id, items, path }
});