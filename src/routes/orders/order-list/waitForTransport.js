import React, { Component, Fragment } from 'react';
import _ from 'lodash';
import Button from 'Components/Button';
import OrderCard from './order-card';
import * as fragment from './fragment';
import * as utils from './utils';

class WaitForTransport extends Component {

    render() {
        const orders = _.get(this.props, 'orders');
        const toggleModal = _.get(this.props, 'toggleModal');
        if (utils.isError(orders)) return fragment.errorPlaceHolder;
        if (utils.isOrderEmpty(orders)) return fragment.noDataPlaceHolder;
        const buttonsComponent = (order, toggleFunction) => {
            return (
                <Fragment>
                    {utils.infoButton(order, toggleFunction)}
                    {sendToTransitButton(order, toggleFunction)}
                    {utils.deleteButton(order, toggleFunction)}
                </Fragment>
            );
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

const sendToTransitButton = (order, toggleFunction) => {
    return (
        <Button
            type="image"
            path="/assets/img/icon_transit.png"
            alt="การส่งสำเร็จ"
            onClick={() => toggleFunction("SEND_TO_TRANSIT", order)} />
    )
}

export default WaitForTransport;