import {
    GRAPH_GET_LIST,
    GRAPH_GET_LIST_SUCCESS,
    HISTOGRAM_GET_LIST,
    HISTOGRAM_GET_LIST_SUCCESS,
    SALE_GET_LIST,
    SALE_GET_LIST_SUCCESS,
    STOCKTABLE_GET_LIST,
    STOCKTABLE_GET_LIST_SUCCESS
} from 'Constants/actionTypes';

let GRAPH = {
    list: null,
    loading: false,
    message: "",
}

let HISTOGRAM = {
    list: null,
    loading: false,
    message: "",
}

let SALE = {
    list: null,
    loading: false,
    message: "",
};

let STOCKTABLE = {
    list: null,
    loading: false,
    message: "",
};


export default (state = { GRAPH, HISTOGRAM, SALE, STOCKTABLE }, action) => {
    switch (action.type) {
        case GRAPH_GET_LIST:
            state.GRAPH = { ...GRAPH, loading: false }
            return { ...state };

        case GRAPH_GET_LIST_SUCCESS:
            state.GRAPH = { ...GRAPH, loading: true, list: action.payload, message: "" }
            return { ...state };

        case HISTOGRAM_GET_LIST:
            state.HISTOGRAM = { ...HISTOGRAM, loading: false }
            return { ...state };

        case HISTOGRAM_GET_LIST_SUCCESS:
            state.HISTOGRAM = { ...HISTOGRAM, loading: true, list: action.payload, message: "" }
            return { ...state };

        case SALE_GET_LIST:
            state.SALE = { ...SALE, loading: false }
            return { ...state };

        case SALE_GET_LIST_SUCCESS:
            state.SALE = { ...SALE, loading: true, list: action.payload, message: "" }
            return { ...state };

        case STOCKTABLE_GET_LIST:
            state.STOCKTABLE = { ...STOCKTABLE, loading: false }
            return { ...state };

        case STOCKTABLE_GET_LIST_SUCCESS:
            state.STOCKTABLE = { ...STOCKTABLE, loading: true, list: action.payload, message: "" }
            return { ...state };

        default: {
            return { ...state };
        }
    }
}