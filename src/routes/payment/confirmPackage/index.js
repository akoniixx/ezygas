import React, { Component, Fragment } from "react";
import { injectIntl } from 'react-intl';
import IntlMessages from "Util/IntlMessages";
import { Row, Card, CardBody, Button } from "reactstrap";
import { Colxx } from "Components/CustomBootstrap";
import { urls } from 'Constants/defaultValues';
import * as jsx from 'Assets/JSX-Style/InlineStyle';
import { numeralSystem } from 'Constants/numeralSystem';
import { month } from "Constants/dataTime";
import { connect } from "react-redux";
import { getVendor, getUser, postPackage, getPayment } from "Redux/actions";
import _ from "lodash";

//Child Components
import Package from './package'
import UserDetail from './userDetail'
import BankAccount from './bankAccount'
import ModalControl from './modal'

class ConfirmPackageControl extends Component {
    constructor(props) {
        super(props)
        this.controlModal = this.controlModal.bind(this);
        this.confirmPackage = this.confirmPackage.bind(this);
        this.handleState = this.handleState.bind(this);
        this.generate = this.generate.bind(this);
        this.passToConfirmPayment = this.passToConfirmPayment.bind(this);
        this.passToPackage = this.passToPackage.bind(this);
        this.toggleModalConfirm = this.toggleModalConfirm.bind(this);
        this.toggleModalNotification = this.toggleModalNotification.bind(this);
        this.toggleModalDelayPayment = this.toggleModalDelayPayment.bind(this);
        this.state = {
            modalConfirmOpen: false,
            modalNotificationOpen: false,
            modalDelayPaymentOpen: false,
            name: '',
            email: '',
            tel: '',
            vendorData: [],
            userData: [],
        };
    }

    componentWillReceiveProps(nextProps) {
        let { vendorData, userData } = this.state
        this.setState({
            vendorData: _.get(nextProps.vendor, "list[0]", []),
            userData: _.get(nextProps.user, "list", []),
            name: _.get(userData, "first_name", '') + " " + _.get(userData, "last_name", ''),
            email: _.get(userData, "username", ''),
            tel: "0"+_.get(vendorData, "tel", '').substring(3)
        });
    }

    componentDidMount() {
        this.props.getVendor();
        this.props.getUser();
        this.props.getPayment();
    }

    controlModal() {
        let { name, email, tel } = this.state
        if (name != '' && email != '' && tel != '') {
            this.toggleModalConfirm();
        } else {
            this.toggleModalNotification();
        }
    }
    confirmPackage(item) {
        let { name, email, tel, vendorData } = this.state
        let oldPurchaseNumber = _.get(this.props.payment, "PAYMENT.list.purchase_number", "")
        let code = this.generate(vendorData.id);
        let dateTime = new Date().toString().split(" ")
        let time = dateTime[4].substring(0, 5).split(":")
        let purchaseNumber = code + dateTime[3] + month[dateTime[1]] + dateTime[2] + time[0] + time[1]
        dateTime = "" + dateTime[3] + "-" + month[dateTime[1]] + "-" + dateTime[2] + "T" + dateTime[4].substring(0, 5) + ":00+07:00"
        if(oldPurchaseNumber != purchaseNumber){
            if (name != '' && email != '' && tel != '') {
                let data = {
                    purchase_number: purchaseNumber,
                    package: item.id,
                    fullname: name,
                    email: email,
                    phonenumber: tel,
                    date_of_purchase: dateTime,
                }
                this.props.postPackage(data);
            } else {
            }
            this.props.getPayment()
            this.passToConfirmPayment();
        } else {
            this.toggleModalConfirm();
            this.toggleModalDelayPayment();
        }
    }

    generate(id) {
        let num = id
        let mod = 0
        let code = ''
        for (let i = 0; num >= 26; i++) {
            mod = (num % 26)
            num = (num / 26) >> 0
            code = numeralSystem[mod] + code
        }
        code = numeralSystem[num] + code
        for (; code.length < 4;) {
            code = 0 + code
        }
        return code
    }

    handleState(e, index) {
        let state = {}
        state[index] = e.target.value
        this.setState(state)
    }
    passToPackage() {
        let path = '/' + urls.payment + '/' + urls.package;
        this.props.history.push(path);
    }
    passToConfirmPayment() {
        let path = '/' + urls.payment + '/' + urls.confirmPayment;
        this.props.history.push(path);
    }
    toggleModalConfirm() {
        this.setState({ modalConfirmOpen: !this.state.modalConfirmOpen })
    }
    toggleModalNotification() {
        this.setState({ modalNotificationOpen: !this.state.modalNotificationOpen })
    }
    toggleModalDelayPayment() {
        this.setState({modalDelayPaymentOpen: !this.state.modalDelayPaymentOpen})
    }
    render() {
        const packages = _.get(this.props.payment, "PACKAGE")
        return (
            <Fragment>
                <ModalControl
                    state={this.state}
                    selectedItem={packages.selectedItem}
                    confirmPackage={this.confirmPackage}
                    toggleModalConfirm={this.toggleModalConfirm}
                    toggleModalNotification={this.toggleModalNotification}
                    toggleModalDelayPayment={this.toggleModalDelayPayment}
                />
                <Package selectedItem={packages.selectedItem} passToPackage={this.passToPackage} />
                <UserDetail state={this.state} handleState={this.handleState} />
                <BankAccount toggleModalConfirm={this.controlModal} />
            </Fragment>
        )
    }
}

const mapStateToProps = ({ payment, vendor, user }) => {
    return {
        payment,
        vendor,
        user
    };
};

export default injectIntl(connect(
    mapStateToProps,
    {
        getVendor,
        getPayment,
        getUser,
        postPackage
    }
)(ConfirmPackageControl));