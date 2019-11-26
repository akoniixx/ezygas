import {
    STOCK_GET_LIST,
    STOCK_GET_LIST_SUCCESS,
    STOCK_POST_ITEM,
    STOCK_POST_ITEM_SUCCESS,
} from 'Constants/actionTypes';

const INIT_STATE = {
    list: null,
    loading: false,
    message: "",
};

export default (state = INIT_STATE, action) => {
    switch (action.type) {
        case STOCK_GET_LIST:
            return { ...state, loading: false };

        case STOCK_GET_LIST_SUCCESS:
            return { ...state, loading: true, list: action.payload, message: "" };
        
        case STOCK_POST_ITEM:
            return { ...state, loading: false };

        case STOCK_POST_ITEM_SUCCESS:
            return { ...state, loading: true, message: action.payload };   

        default: return { ...state };
    }
}