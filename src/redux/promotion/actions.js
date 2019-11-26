import {
    PROMOTION_GET_LIST,
    PROMOTION_GET_LIST_SUCCESS,
    PROMOTION_POST_ITEM,
    PROMOTION_HISTORY_GET_LIST,
    PROMOTION_HISTORY_GET_LIST_SUCCESS
} from "Constants/actionTypes"
import { apiPromotion, apiPromotionHistory } from 'Constants/defaultValues';

export const getPromotion = (path=apiPromotion, status="promotion") => ({
    type: PROMOTION_GET_LIST,
    payload: { path, status }
})

export const getPromotionSuccess = (items) => ({
    type: PROMOTION_GET_LIST_SUCCESS,
    payload: items
})

export const postPromotion = ( items, path=apiPromotionHistory ) => ({
    type: PROMOTION_POST_ITEM,
    payload: { path, items }
})

export const getPromotionHistory = (path=apiPromotionHistory, status="promotionHistory") => ({
    type: PROMOTION_HISTORY_GET_LIST,
    payload: { path, status }
})

export const getPromotionHistorySuccess = (items) => ({
    type: PROMOTION_HISTORY_GET_LIST_SUCCESS,
    payload: items
})
