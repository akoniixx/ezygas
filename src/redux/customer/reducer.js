import {
    CUSTOMER_GET_LIST,
    CUSTOMER_GET_LIST_SUCCESS,
    CUSTOMER_POST_ITEM,
    CUSTOMER_POST_ITEM_SUCCESS,
    CUSTOMER_POST_CHECK_NAME,
    CUSTOMER_POST_CHECK_NAME_RESPONSE,
    CUSTOMER_SELECTED
} from 'Constants/actionTypes';

const INIT_STATE = {
    list: null,
    loading: false,
    message: "",
    selected: null
};

export default (state =  INIT_STATE ,  action) => {
    switch (action.type) {
        case CUSTOMER_GET_LIST:
            return { ...state, loading: false, message: "" };

        case CUSTOMER_GET_LIST_SUCCESS:
            return { ...state, loading: true, list: action.payload, message: "" };

        case CUSTOMER_POST_ITEM:
            return { ...state, loading: false, message: "" };

        case CUSTOMER_POST_ITEM_SUCCESS:
            return { ...state, loading: true, message: action.payload };

        case CUSTOMER_POST_CHECK_NAME:
            return { ...state, message: "" };

        case CUSTOMER_POST_CHECK_NAME_RESPONSE:
            return { ...state, message: action.payload };

        case CUSTOMER_SELECTED: 
            return { ...state, selected: action.payload }

        default: return { ...state };
    }
}