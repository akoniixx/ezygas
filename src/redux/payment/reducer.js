import {
    PACKAGE_GET_LIST,
    PACKAGE_GET_LIST_SUCCESS,
    PACKAGE_SELECTEDE,
    PACKAGE_CONFIRM,
    PACKAGE_CONFIRM_SUCCESS,
    PAYMENT_GET_LIST,
    PAYMENT_GET_LIST_SUCCESS,
    PAYMENT_CONFIRM,
    PAYMENT_CONFIRM_SUCCESS,
    PAYMENT_CANCLE_ITEM,
    PAYMENT_GET_LIST_BY_STAFF,
    PAYMENT_GET_LIST_BY_STAFF_SUCCESS,
    PAYMENT_APPROVE_ITEM
} from 'Constants/actionTypes'

const PACKAGE = {
    list: null,
    loading: false,
    message: "",
    selectedItem: null
};

const PAYMENT = {
    list: null,
    loading: false,
    message: "",
}

const APPROVELIST = {
    list: null,
    loading: false,
    message: "",
}

export default (state = { PACKAGE, PAYMENT, APPROVELIST }, action) => {
    switch (action.type) {
         // PACKAGE   
        case PACKAGE_GET_LIST:
            state.PACKAGE = { ...PACKAGE, loading: false };
            return { ...state };

        case PACKAGE_GET_LIST_SUCCESS:
            state.PACKAGE = { ...PACKAGE, loading: true, list: action.payload, message: "" };
            return { ...state };

        case PACKAGE_SELECTEDE:
            state.PACKAGE = { ...PACKAGE, selectedItem: action.payload, message: "" }
            return { ...state };

        case PACKAGE_CONFIRM:
            state.PACKAGE = { ...PACKAGE, loading: false, message: "" }
            return { ...state };

        case PACKAGE_CONFIRM_SUCCESS:
            state.PACKAGE = { ...PACKAGE, loading: true, message: "" }
            return { ...state };

        // PAYMENT    
        case PAYMENT_GET_LIST:
            state.PAYMENT = { ...PAYMENT, loading: false, message: "" }
            return { ...state };

        case PAYMENT_GET_LIST_SUCCESS:
            state.PAYMENT = { ...PAYMENT, loading: true, list: action.payload, message: "" }
            return { ...state };

        case PAYMENT_CONFIRM:
            state.PAYMENT = { ...PAYMENT, loading: false, message: "" };
            return { ...state };

        case PAYMENT_CONFIRM_SUCCESS:
            state.PAYMENT = { ...PAYMENT, loading: true, message: "" }
            return { ...state };
        
        case PAYMENT_CANCLE_ITEM:
            return { ...state };
        
        //APPROVE PAYMENT
        case PAYMENT_GET_LIST_BY_STAFF:
            state.APPROVELIST = { ...APPROVELIST, loading: false, message: "" };
            return { ...state };

        case PAYMENT_GET_LIST_BY_STAFF_SUCCESS:
            state.APPROVELIST = { ...APPROVELIST, loading: true, list: action.payload, message: "" }
            return { ...state };

        case PAYMENT_APPROVE_ITEM:
            return { ...state };

        default: return { ...state };
    }
}