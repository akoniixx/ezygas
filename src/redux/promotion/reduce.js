import {
    PROMOTION_GET_LIST,
    PROMOTION_GET_LIST_SUCCESS,
    PROMOTION_POST_ITEM,
    PROMOTION_HISTORY_GET_LIST,
    PROMOTION_HISTORY_GET_LIST_SUCCESS
} from "Constants/actionTypes"

const promotions = {
    list: null,
    loading: false,
    message: "",
}

const promotionHistory = {
    list: null,
    loading: false,
    message: "",
}

export default (state = { promotions, promotionHistory }, action) => {
    switch (action.type) {
        case PROMOTION_GET_LIST:
            state.promotions = { ...promotions, loading: false };
            return { ...state };

        case PROMOTION_GET_LIST_SUCCESS:
            state.promotions = { ...promotions, loading: true, list: action.payload };
            return { ...state };

        case PROMOTION_POST_ITEM:
            state.promotions = { ...promotions, loading: false, message: action.payload };
            return { ...state };

        case PROMOTION_HISTORY_GET_LIST:
            state.promotionHistory = { ...promotionHistory, loading: false };
            return { ...state };

        case PROMOTION_HISTORY_GET_LIST_SUCCESS:
            state.promotionHistory = { ...promotionHistory, loading: true, list: action.payload };
            return { ...state };

        default: return { ...state };
    }
}