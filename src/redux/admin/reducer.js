import {
    ADMIN_VENDOR_GET_LIST,
    ADMIN_VENDOR_GET_LIST_SUCCESS,
    ADMIN_REGISTER_APPROVE_ITEM
} from 'Constants/actionTypes';

const INIT_STATE = {
    list: null,
    loading: false,
    message: "",
};

export default (state = INIT_STATE, action) => {
    switch (action.type) {
        
        case ADMIN_VENDOR_GET_LIST:
            return { ...state, loading: false };

        case ADMIN_VENDOR_GET_LIST_SUCCESS:
            return { ...state, loading: true, list: action.payload };

        case ADMIN_REGISTER_APPROVE_ITEM:
            return { ...state, loading: true };

        default: return { ...state };
    }
}