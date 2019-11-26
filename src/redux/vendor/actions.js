import {
    VENDOR_GET_LIST,
    VENDOR_GET_LIST_SUCCESS,
    
} from 'Constants/actionTypes';


export const getVendor = () => ({
    type: VENDOR_GET_LIST
});

export const getVendorListSuccess = (items) => ({
    type: VENDOR_GET_LIST_SUCCESS,
    payload: items
});
