import {
    FILL_GET_LIST,
    FILL_GET_LIST_SUCCESS,
    FILL_POST_ITEM,
    FILL_POST_ITEM_SUCCESS,

} from 'Constants/actionTypes';

const INIT_STATE = {
    list: null,
    loading: false,
    message: "",
};

export default (state = INIT_STATE, action) => {
    switch (action.type) {
        case FILL_GET_LIST:
            return { ...state, loading: false };

        case FILL_GET_LIST_SUCCESS:
            return { ...state, loading: true, list: action.payload, message: "" };
        
        case FILL_POST_ITEM:
            return { ...state, loading: false };

        case FILL_POST_ITEM_SUCCESS:
            return { ...state, loading: true, message: action.payload };   

        default: return { ...state };
    }
}