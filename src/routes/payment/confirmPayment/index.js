import React, { Component, Fragment } from "react";
import { injectIntl } from 'react-intl';
import IntlMessages from "Util/IntlMessages";
import { Row, Card, Button } from "reactstrap";
import { urls } from 'Constants/defaultValues';
import { withRouter } from 'react-router-dom';
import _ from "lodash";
import { connect } from "react-redux";
import { getPayment, getPackage, postPayment, postCanclePayment } from "Redux/actions";

/* Child Component */
import NotiPayment from './notificationPayment';
import ModalNotiPayment from "./modal"
class ConfirmPaymentControl extends Component {
    constructor(props) {
        super(props)
        this.canclePayment = this.canclePayment.bind(this);
        this.confirmPayment = this.confirmPayment.bind(this);
        this.getPaymentData = this.getPaymentData.bind(this);
        this.togglePayment = this.togglePayment.bind(this);
        this.toggleModalWaitApprove = this.toggleModalWaitApprove.bind(this);
        this.toggleModalCancelPayment = this.toggleModalCancelPayment.bind(this);
        this.packageState = this.packageState.bind(this);
        this.state = {
            modalOpenPayment: false,
            modalOpenWaitApprove: false,
            modalOpenCencelPayment: false,
        };
    }
    canclePayment() {
        const payment = _.get(this.props.payment, "PAYMENT", [])
        let id = payment.list.id
        let items = { action: 2 }
        this.props.postCanclePayment(id, items)
        this.toggleModalCancelPayment()
        this.getPaymentData()
        this.packageState()
    }
    componentDidMount() {
        this.props.getPayment();
        this.props.getPackage();
    }
    confirmPayment(payment, url, price, date, time) {
        let id = payment.list.id
        let data = {
            amount_of_payment: price,
            date_of_payment: date + "T" + time + ":00+07:00",
            image_url: url,
        }
        this.props.postPayment(data, id)
        this.getPaymentData();
    }
    getPaymentData() {
        this.props.getPayment();
        this.props.getPayment();
    }
    packageState() {
        let path = '/' + urls.payment + '/' + urls.package;
        this.props.history.push(path);
    }
    togglePayment() {
        this.setState({ modalOpenPayment: !this.state.modalOpenPayment })
    }
    toggleModalWaitApprove() {
        this.setState({ modalOpenWaitApprove: !this.state.modalOpenWaitApprove })
    }
    toggleModalCancelPayment() {
        this.setState({ modalOpenCencelPayment: !this.state.modalOpenCencelPayment })
    }
    render() {
        const payment = _.get(this.props.payment, "PAYMENT", [])
        const packages = _.get(this.props.payment, "PACKAGE", [])
        const packageSelected = _.find(packages.list, (item) => { return item.id === _.get(payment, "list.package", []) })
        return (
            <Fragment>
                <div className="d-flex justify-content-center">
                    <NotiPayment
                        packageSelected={packageSelected}
                        payment={payment}
                        togglePayment={this.togglePayment}
                        toggleModalCancelPayment={this.toggleModalCancelPayment}
                    />
                </div>
                <ModalNotiPayment
                    state={this.state}
                    payment={payment}
                    togglePayment={this.togglePayment}
                    toggleModalWaitApprove={this.toggleModalWaitApprove}
                    toggleModalCancelPayment={this.toggleModalCancelPayment}
                    canclePayment={this.canclePayment}
                    confirmPayment={this.confirmPayment}
                />
            </Fragment>
        )
    }
}

const mapStateToProps = ({ payment }) => {
    return {
        payment,
    };
};

export default injectIntl(connect(
    mapStateToProps,
    {
        getPayment,
        postPayment,
        getPackage,
        postCanclePayment
    }
)(ConfirmPaymentControl));