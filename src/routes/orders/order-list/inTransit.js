import React, { Component, Fragment } from 'react';
import Button from 'Components/Button';
import OrderCard from './order-card';
import _ from 'lodash';
import * as fragment from './fragment';
import * as utils from './utils';

class InTransit extends Component {

    render() {
        const orders = _.get(this.props, 'orders');
        const toggleModal = _.get(this.props, 'toggleModal');
        if (utils.isError(orders)) return fragment.errorPlaceHolder;
        if (utils.isOrderEmpty(orders)) return fragment.noDataPlaceHolder;
        const buttonsComponent = (order, toggleFunction) => {
            return (
                <Fragment>
                    {utils.infoButton(order, toggleFunction)}
                    {transitCompletedButton(order, toggleFunction)}
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

const transitCompletedButton = (order, toggleFunction) => {
    return (
        <Button
            type="image"
            path='/assets/img/icon_completed.png'
            alt="การส่งสำเร็จ"
            onClick={() => toggleFunction("TRANSIT_COMPLETED", order)} />
    )
}

export default InTransit;