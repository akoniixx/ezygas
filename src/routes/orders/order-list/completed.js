import React, { Component, Fragment } from 'react';
import OrderCard from './order-card';
import _ from 'lodash';
import * as fragment from './fragment';
import * as utils from './utils';

class Completed extends Component {

    render() {
        const orders = _.get(this.props, 'orders');
        const toggleModal = _.get(this.props, 'toggleModal');
        if (utils.isError(orders)) return fragment.errorPlaceHolder;
        if (utils.isOrderEmpty(orders)) return fragment.noDataPlaceHolder;
        const buttonsComponent = (order, toggleFunction) => {
            return utils.infoButton(order, toggleFunction);
        }
        return orders.map(
            (order, i) => {
                return (
                    <Fragment key={i}>
                        <OrderCard
                            order={order}
                            toggleModal={toggleModal}
                            buttonsComponent={buttonsComponent} />
                    </Fragment>
                );
            }
        );
    }
}

export default Completed;