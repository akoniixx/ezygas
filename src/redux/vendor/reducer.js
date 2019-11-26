import {
    VENDOR_GET_LIST,
    VENDOR_GET_LIST_SUCCESS,
    
} from 'Constants/actionTypes';


const INIT_STATE = {
    list: null,
    loading: false,
    message: "",
};

export default (state = INIT_STATE, action) => {
    switch (action.type) {
        case VENDOR_GET_LIST:
            return { ...state, loading: false };

        case VENDOR_GET_LIST_SUCCESS:
            return { ...state, loading: true, list: action.payload, message: "" };
           
        default: return { ...state };
    }
}