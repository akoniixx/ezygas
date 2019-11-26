import {
    HISTORY_GET_LIST,
    HISTORY_GET_LIST_SUCCESS,
    
} from 'Constants/actionTypes';


export const getHistory = (path) => ({
    type: HISTORY_GET_LIST,
    payload: { path }
});

export const getHistoryListSuccess = (items) => ({
    type: HISTORY_GET_LIST_SUCCESS,
    payload: items
});

