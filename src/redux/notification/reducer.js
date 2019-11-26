import {
    NOTIFICATION_GET,
    NOTIFICATION_GET_SUCCESS,
    NOTIFICATION_CHANGE
} from 'Constants/actionTypes';

const INIT_STATE = {
    notificationData: false,
    loading: false,
    message: "",
};

export default (state = INIT_STATE, action) => {
    switch (action.type) {
        case NOTIFICATION_GET:
            return { ...state, loading: false };

        case NOTIFICATION_GET_SUCCESS:
            return { ...state, loading: true, notificationData: action.payload, message: "" };

        case NOTIFICATION_CHANGE:
            return { ...state, notificationData:action.payload}

        default: return { ...state };
    }
}