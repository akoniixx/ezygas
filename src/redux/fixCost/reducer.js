import {
    FIXCOST_POST_ITEM,
    FIXCOST_POST_ITEM_SUCCESS
} from 'Constants/actionTypes';

const INIT_STATE = {
    list: null,
    loading: false,
    message: "initial",
};

export default (state = INIT_STATE, action) => {
    switch (action.type) {
        case FIXCOST_POST_ITEM:
            return { ...state, loading: false, message: "Sending" };

        case FIXCOST_POST_ITEM_SUCCESS:
            return { ...state, loading: true, list: null, message: "Success" };
            
        default: return { ...state };
    }
}