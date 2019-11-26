import {
    ORDER_GET_LIST,
    ORDER_GET_LIST_SUCCESS,
    ORDER_POST_ITEM,
    ORDER_POST_ITEM_SUCCESS,
    ORDER_DELETE_ITEM,

} from 'Constants/actionTypes';

const INIT_STATE = {
    list: null,
    loading: false,
    message: "",
};

export default (state = INIT_STATE, action) => {
    switch (action.type) {
        case ORDER_GET_LIST:
            return { ...state, loading: false };

        case ORDER_GET_LIST_SUCCESS:
            return { ...state, loading: true, list: action.payload, message: "" };

        case ORDER_POST_ITEM:
            return { ...state, loading: false };

        case ORDER_POST_ITEM_SUCCESS:
            return { ...state, loading: true, message: action.payload };

        case ORDER_DELETE_ITEM:
            return { ...state, loading: true};

        default: return { ...state };
    }
}