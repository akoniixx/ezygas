import {
    USER_GET_LIST,
    USER_GET_LIST_SUCCESS,
    
} from 'Constants/actionTypes';


const INIT_STATE = {
    list: null,
    loading: false,
    message: "",
};

export default (state = INIT_STATE, action) => {
    switch (action.type) {
        case USER_GET_LIST:
            return { ...state, loading: false };

        case USER_GET_LIST_SUCCESS:
            return { ...state, loading: true, list: action.payload, message: "" };
           
        default: return { ...state };
    }
}