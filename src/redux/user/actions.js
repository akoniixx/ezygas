import {
    USER_GET_LIST,
    USER_GET_LIST_SUCCESS,
    
} from 'Constants/actionTypes';


export const getUser = () => ({
    type: USER_GET_LIST
});

export const getUserListSuccess = (items) => ({
    type: USER_GET_LIST_SUCCESS,
    payload: items
});
