import React, { Component, Fragment } from "react";
import { injectIntl } from 'react-intl';
import IntlMessages from "Util/IntlMessages";
import { Row, Card, Button } from "reactstrap";
import { urls } from 'Constants/defaultValues';
import { connect } from "react-redux";
import { getPayment, getPackage, selectedPackage } from "Redux/actions";
import _ from 'lodash';

/* Child Component */
import Header from './header'
import PackageCard from './packageCard'

class PackageControl extends Component {
    constructor(props) {
        super(props)
        this.dataPackage = this.dataPackage.bind(this);
        this.getPaymentData = this.getPaymentData.bind(this);
        this.passToConfirmPackage = this.passToConfirmPackage.bind(this);
        this.passToConfirmPayment = this.passToConfirmPayment.bind(this);
        this.state = {

        };
    }

    componentDidMount() {
        this.dataPackage();
        this.getPaymentData();
    }

    dataPackage() {
        this.props.getPackage()
    }

    getPaymentData() {
        this.props.getPayment();
    }

    passToConfirmPackage(item) {
        this.props.selectedPackage(item)
        let path = '/' + urls.payment + '/' + urls.confirmPackage;
        this.props.history.push(path);
    }

    passToConfirmPayment() {
        let path = '/' + urls.payment + '/' + urls.confirmPayment;
        this.props.history.push(path);
    }

    render() {
        const packages = _.get(this.props.payment, "PACKAGE")
        const payment = _.get(this.props.payment, "PAYMENT", [])
        const status = _.get(payment, "list.status", [])
        return (
            <Fragment>
                {status === 1 || status === 4 ?
                    this.passToConfirmPayment()
                    :
                    ""
                }
                <Header />
                <PackageCard packages={packages} passToConfirmPackage={this.passToConfirmPackage} />
            </Fragment>
        )
    }
}

const mapStateToProps = ({ payment }) => {
    return {
        payment
    };
};

export default injectIntl(connect(
    mapStateToProps,
    {
        getPackage,
        getPayment,
        selectedPackage
    }
)(PackageControl));