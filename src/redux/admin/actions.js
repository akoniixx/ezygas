import {
    ADMIN_VENDOR_GET_LIST,
    ADMIN_VENDOR_GET_LIST_SUCCESS,
    ADMIN_REGISTER_APPROVE_ITEM
} from 'Constants/actionTypes';

export const adminGetVendorList = () => ({
    type: ADMIN_VENDOR_GET_LIST,
});

export const adminGetVendorListSuccess = (items) => ({
    type: ADMIN_VENDOR_GET_LIST_SUCCESS,
    payload: items
});

export const approveRegister = (id, items) => ({
    type: ADMIN_REGISTER_APPROVE_ITEM,
    payload: {id, items}
});