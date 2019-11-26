import {
    FILL_GET_LIST,
    FILL_GET_LIST_SUCCESS,
    FILL_POST_ITEM,
    FILL_POST_ITEM_SUCCESS,

} from 'Constants/actionTypes';


export const getFillList = () => ({
    type: FILL_GET_LIST,
});

export const getFillListSuccess = (items) => ({
    type: FILL_GET_LIST_SUCCESS,
    payload: items
});

export const postFill = (items, id, status="Success") => ({
    type: FILL_POST_ITEM,
    payload: { items, id, status }
});

export const postFillSuccess = (items) => ({   
    type: FILL_POST_ITEM_SUCCESS,
    payload: items
});
