import {
    PRIVATE_PRICE_GET_LIST,
    PRIVATE_PRICE_GET_LIST_SUCCESS,
    PRIVATE_PRICE_POST_ITEM
} from 'Constants/actionTypes'

const PRIVATE_PRICE = {
    list: null,
    loading: false,
    message: ""
};

export default (state = PRIVATE_PRICE , action) => {
    switch (action.type) {
        case PRIVATE_PRICE_GET_LIST:
            return { ...state, loading: false, message: "" };

        case PRIVATE_PRICE_GET_LIST_SUCCESS:
            return { ...state, loading: true, list: action.payload , message: "" };

        case PRIVATE_PRICE_POST_ITEM:
            return { ...state, loading: true, message: "" };

        default: return { ...state };
    }
}