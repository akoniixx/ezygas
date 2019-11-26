import {
    ORDER_GET_LIST,
    ORDER_GET_LIST_SUCCESS,
    ORDER_POST_ITEM,
    ORDER_POST_ITEM_SUCCESS,
    ORDER_DELETE_ITEM,

} from 'Constants/actionTypes';


export const getOrder = () => ({
    type: ORDER_GET_LIST,
});

export const getOrderListSuccess = (items) => ({
    type: ORDER_GET_LIST_SUCCESS,
    payload: items
    
});

export const postOrder = (items, id) => ({
    type: ORDER_POST_ITEM,
    payload: { items, id }
});

export const postOrderSuccess = (items) => ({   
    type: ORDER_POST_ITEM_SUCCESS,
    payload: items
});

export const deleteOrder = (id) => ({
    type: ORDER_DELETE_ITEM,
    payload: { id }
});