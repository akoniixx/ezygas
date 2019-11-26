import React, { Component, Fragment } from 'react';
import { Card, CardBody } from 'reactstrap';
import Text from 'Components/Text';
import Media from 'react-media';
import _ from 'lodash';
import * as screen from 'Constants/screenWidth';
import { convertTel, extractTimeFromAPI } from 'Util/utils';

export default class OrderCard extends Component {
    render() {
        const order = _.get(this.props, 'order');
        const toggleModal = _.get(this.props, 'toggleModal');
        const buttonsComponent = _.get(this.props, 'buttonsComponent', <div></div>);
        return (
            <Fragment>
                <Media query={screen.nonMobileScreenQuery}>
                    <OrderCardDesktop
                        order={order}
                        toggleModal={toggleModal}
                        buttonsComponent={buttonsComponent} />
                </Media>
                <Media query={screen.mobileScreenQuery}>
                    <OrderCardMobile
                        order={order}
                        toggleModal={toggleModal}
                        buttonsComponent={buttonsComponent} />
                </Media>
            </Fragment>
        );
    }
}

class OrderCardDesktop extends Component {
    render() {
        const order = this.props.order;
        const name = _.get(order, 'customer.name', 'ชื่อลูกค้า');
        const tel = _.get(order, 'customer.tel');
        const address = _.get(order, 'customer.address', 'ที่อยู่');
        const toggleModal = _.get(this.props, 'toggleModal');
        const buttonsComponent = _.get(this.props, 'buttonsComponent', <div></div>);
        return (
            <Card className="order-list-item mb-3">
                <CardBody className="py-2 px-4">
                    <div className="order-list-time">
                        <Text
                            type="normal"
                            text={extractTimeFromAPI(_.get(order, 'deliver_time'))} />
                    </div>
                    <div className="order-list-name">
                        <Text
                            type="normal"
                            text={name} />
                    </div>
                    <div className="order-list-tel">
                        <Text
                            type="normal"
                            text={convertTel(tel)} />
                    </div>
                    <div className="order-list-address">
                        <Text
                            type="normal"
                            text={address} />
                    </div>
                    <div className="order-list-buttons">
                        {buttonsComponent(order, toggleModal)}
                    </div>
                </CardBody>
            </Card>
        );
    }
}

class OrderCardMobile extends Component {
    render() {
        const order = this.props.order;
        const name = _.get(order, 'customer.name', 'ชื่อลูกค้า');
        const tel = _.get(order, 'customer.tel');
        const toggleModal = _.get(this.props, 'toggleModal');
        const buttonsComponent = _.get(this.props, 'buttonsComponent', <div></div>);
        return (
            <Card className="order-list-item-mobile mb-3">
                <CardBody className="p-4">
                    <div className="mb-3">
                        <div className="order-list-time">
                            <Text
                                type="normal"
                                text={extractTimeFromAPI(_.get(order, 'deliver_time'))} />
                        </div>
                        <div className="order-list-name">
                            <Text
                                type="normal"
                                text={name} />
                        </div>
                        <div className="order-list-tel">
                            <Text
                                type="normal"
                                text={convertTel(tel)} />
                        </div>
                    </div>
                    <div className="order-list-buttons">
                        {buttonsComponent(order, toggleModal)}
                    </div>
                </CardBody>
            </Card>
        );
    }
}