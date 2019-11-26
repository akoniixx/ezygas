import React, { Component, Fragment } from 'react';
import { Row, Card } from "reactstrap";
import { Colxx } from "Components/CustomBootstrap";
import Button from "Components/Button";
import { NavLink } from "react-router-dom";
import _ from 'lodash';
import * as status from 'Constants/orderStatus';
import * as Utils from 'Util/Utils';
import Media from 'react-media';
import Text from 'Components/Text'
import * as screen from 'Constants/screenWidth';

class Historycontrol extends Component {
    constructor(props) {
        super(props)
        this.state = {

        }
    }
    render() {
        const historyData = this.props.historyData
        const loading = this.props.loading
        const state = this.props.state
        const func = this.props
        return (
            <Fragment>
                <Media query={screen.desktopScreenQuery}>
                    <HistoryListHeader />
                </Media>
                <HistoryList historyData={historyData} loading={loading} state={state} func={func} />
            </Fragment>
        )
    }
}

export default Historycontrol

class HistoryListHeader extends Component {
    render() {
        return (
            <Card style={{
                background: 'transparent',
                boxShadow: 'none'
            }}>
                <Row style={{
                    padding: "10px 20px 20px 20px"
                }}>
                    <Colxx xxs="2">
                        <b><Text type="normal" text="วันที่" align="start" /></b>
                    </Colxx>
                    <Colxx xxs="1">
                        <b><Text type="normal" text="เวลา" align="start" /></b>
                    </Colxx>
                    <Colxx xxs="2">
                        <b><Text type="normal" text="ชื่อ" align="start" /></b>
                    </Colxx>
                    <Colxx xxs="2">
                        <b><Text type="normal" text="เบอร์โทรศัพท์" align="start" /></b>
                    </Colxx>
                    <Colxx xxs="4">
                        <b><Text type="normal" text="ที่อยู่" align="start" /></b>
                    </Colxx>
                    <Colxx xxs="1" />
                </Row>
            </Card>
        );
    }
}

class HistoryList extends Component {
    render() {
        const props = this.props;
        const data = _.get(props, "historyData");
        const loading = _.get(props, "loading");
        const state = _.get(props, "state");
        const func = _.get(props, "func");
        const isCompletedOrder = (order) => {
            if (order.status != status.COMPLETED) return false;
            return true;
        }
        const start = _.get(props, "state.startDate", -1).toString();
        const time = start.split(" ")
        const day = time[2];
        const historyData = _.filter(data, (order) => { return isCompletedOrder(order) && order.deliver_time.substring(8, 10) === day });
        if (loading && !_.isEmpty(historyData)) {
            return historyData.map(
                order => {
                    return (
                        <Fragment key={order.id}>
                            <Media query={screen.desktopScreenQuery}>
                                <HistoryCardDesktop
                                    order={order}
                                    state={state}
                                    func={func} />
                            </Media>
                            <Media query={screen.tabletScreenQuery}>
                                <HistoryCardTablet
                                    order={order}
                                    state={state}
                                    func={func} />
                            </Media>
                            <Media query={screen.mobileScreenQuery}>
                                <HistoryCardMobile
                                    order={order}
                                    state={state}
                                    func={func} />
                            </Media>
                        </Fragment>
                    );
                }
            );
        } else return (
            <div className="order-history-placeholder">
                <Text type="title" text="ยังไม่มีรายการสั่งซื้อส่งสำเร็จ" align="start" />
            </div>
        );
    }
}

class HistoryCardDesktop extends Component {
    render() {
        const props = this.props;
        const order = _.get(props, "order", []);
        const start = _.get(props, "state.startDate", -1).toString();
        const func = _.get(props, 'func');
        const time = start.split(" ")
        const day = time[2];
        if (day === order.deliver_time.substring(8, 10)) {
            const tel = Utils.convertTel(_.get(order, "customer.tel", ""));
            return (
                <Card className="mb-2">
                    <Row style={{ padding: "20px 20px 20px 20px" }} className="">
                        <Colxx xxs="2" className="d-flex flex-column justify-content-center">
                            <div style={{ textAlign: "left" }}>
                                <Text type="normal" text={order.deliver_time.substring(0, 10)} />
                            </div>
                        </Colxx>
                        <Colxx xxs="1" className="d-flex flex-column justify-content-center">
                            <div style={{ textAlign: "left" }}>
                                <Text type="normal" text={order.deliver_time.substring(11, 16)} />
                            </div>
                        </Colxx>
                        <Colxx xxs="2" className="d-flex flex-column justify-content-center">
                            <div style={{ textAlign: "left" }}>
                                <Text type="normal" text={_.get(order, "customer.name", "Customer Name")} />
                            </div>
                        </Colxx>
                        <Colxx xxs="2" className="d-flex flex-column justify-content-center">
                            <div style={{ textAlign: "left" }}>
                                <Text type="normal" text={tel} />
                            </div>
                        </Colxx>
                        <Colxx xxs="4" className="d-flex flex-column justify-content-center">
                        <div style={{ textAlign: "left" }}>
                            <Text type="normal" text={_.get(order, "customer.address", "Address")} />
                            </div>
                        </Colxx>
                        <Colxx xxs="1" className="d-flex flex-column justify-content-center">
                        <div style={{ textAlign: "left" }}>
                            <NavLink
                                to={`?id=${_.get(order, 'id', -1)}`}>
                                {infoButton(order, func.toggleModal)}
                            </NavLink>
                            </div>
                        </Colxx>
                    </Row>
                </Card>
            );
        }
        return (
            <Fragment>

            </Fragment>
        );
    }
}

class HistoryCardTablet extends Component {
    render() {
        const props = this.props;
        const order = _.get(props, "order", []);
        const start = _.get(props, "state.startDate", -1).toString();
        const func = _.get(props, 'func');
        const time = start.split(" ")
        const day = time[2];
        if (day === order.deliver_time.substring(8, 10)) {
            const tel = Utils.convertTel(_.get(order, "customer.tel", ""));
            return (
                <Card>
                    <Row style={{ padding: "20px 20px 20px 20px" }}>
                        <Colxx xxs="2" className="d-flex flex-column justify-content-center">
                            {order.deliver_time.substring(0, 10)}
                        </Colxx>
                        <Colxx xxs="1" className="d-flex flex-column justify-content-center" style={{ paddingLeft: 0, paddingRight: 0 }}>
                            {order.deliver_time.substring(11, 16)}
                        </Colxx>
                        <Colxx xxs="2" className="d-flex flex-column justify-content-center">
                            {_.get(order, "customer.name", "Customer Name")}
                        </Colxx>
                        <Colxx xxs="2" className="d-flex flex-column justify-content-center">
                            {tel}
                        </Colxx>
                        <Colxx xxs="4" className="d-flex flex-column justify-content-center">
                            {_.get(order, "customer.address", "Address")}
                        </Colxx>
                        <Colxx xxs="1" className="d-flex flex-column justify-content-center">
                            <NavLink
                                to={`?id=${_.get(order, 'id', -1)}`}
                            >
                                {infoButton(order, func.toggleModal)}
                            </NavLink>
                        </Colxx>
                    </Row>
                </Card>
            );
        }
        return (
            <Fragment>

            </Fragment>
        );
    }
}

class HistoryCardMobile extends Component {
    render() {
        const props = this.props;
        const order = _.get(props, "order", []);
        const start = _.get(props, "state.startDate", -1).toString();
        const func = _.get(props, 'func');
        const time = start.split(" ")
        const day = time[2];
        if (day === order.deliver_time.substring(8, 10)) {
            const tel = Utils.convertTel(_.get(order, "customer.tel", ""));
            return (
                <Card style={{ padding: "20px 20px 20px 20px" }}>
                    <Row>
                        <Colxx xxs="12" className="d-flex flex-column justify-content-center">
                            <span style={{ color: "#9B9B9B" }}>
                                {order.deliver_time.substring(11, 16)}
                            </span>
                        </Colxx>
                    </Row>
                    <Row>
                        <Colxx xxs="5" className="d-flex flex-column justify-content-center">
                            {_.get(order, "customer.name", "Customer Name")}
                        </Colxx>
                        <Colxx xxs="5" className="d-flex flex-column justify-content-center">
                            {tel}
                        </Colxx>
                        <Colxx xxs="2" className="d-flex flex-column justify-content-center"
                            style={{ paddingLeft: 0, paddingRight: 0 }} >
                            <NavLink
                                to={`?id=${_.get(order, 'id', -1)}`}
                            >
                                {infoButton(order, func.toggleModal)}
                            </NavLink>
                        </Colxx>
                    </Row>
                </Card>
            );
        }
        return (
            <Fragment>

            </Fragment>
        );
    }
}

const infoButton = (order, toggleFunction) => {
    return (
        <Button
            type="image"
            path="/assets/img/icon_info.png"
            alt="ดูข้อมูล"
            onClick={() => toggleFunction("info", order)} />
    );
}

const placeholder = (
    <div className="order-history-placeholder">
        <Text type="title" text="ยังไม่มีรายการสั่งซื้อในวันที่เลือก" align="start" />
    </div>
);