import React, { Component } from 'react';
import StockCard from '../stock-card';
import _ from 'lodash';

function collect(props) {
    return { data: props.data };
}

class Overview extends Component {
    constructor(props) {
        super(props);
        this.state = {

        };
    }
    render() {
        const props = this.props;
        const state = _.get(props, 'state', [])
        const stockList = _.get(props, 'stockList', []);
        const methods = {
            toggleModal: this.props.toggleModal,
            createProductStock: this.props.createProductStock
        };
        return (
            <StockCard
                stockList={stockList}
                state={state}
                methods={methods}
                type="OVERVIEW" />
        );
    }
}

export default Overview;