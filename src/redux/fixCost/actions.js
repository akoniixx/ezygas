import {
    FIXCOST_POST_ITEM,
    FIXCOST_POST_ITEM_SUCCESS
} from 'Constants/actionTypes';


export const postFixCost = (items) => ({
    type: FIXCOST_POST_ITEM,
    payload: { items }
})

export const postFixCostSuccess = (items) => ({
    type: FIXCOST_POST_ITEM_SUCCESS,
    payload: items
})

