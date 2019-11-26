import {
    NOTIFICATION_GET,
    NOTIFICATION_GET_SUCCESS,
    NOTIFICATION_CHANGE

} from 'Constants/actionTypes';

export const getNotification = () => ({
    type: NOTIFICATION_GET
});

export const getNotificationSuccess = (items) => ({
    type: NOTIFICATION_GET_SUCCESS,
    payload: items
});

export const changeNotification = (items) => ({
    type: NOTIFICATION_CHANGE,
    payload: items
});