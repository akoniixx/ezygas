import React, { Component, Fragment } from "react";
import { injectIntl } from 'react-intl';
import _ from "lodash";
import Header from './header';
import VendorList from './vendorList';
import { Separator } from "Components/CustomBootstrap";
import { dateTimeForm } from 'Util/Utils';
import { connect } from "react-redux";
import { adminGetVendorList, approveRegister, getPromotion, postPromotion } from "Redux/actions";

class approve extends Component {
    constructor(props) {
        super(props)
        this.changeStatusUser = this.changeStatusUser.bind(this);
        this.handlePromotion = this.handlePromotion.bind(this);
        this.getDataPromotion = this.getDataPromotion.bind(this);
        this.loadData = this.loadData.bind(this);
        this.state = {

        }
    }

    componentDidMount() {
        this.loadData();
        this.getDataPromotion();
    }

    changeStatusUser(id, status) {
        let items = { status: status }
        this.props.approveRegister(id, items)
    }

    handlePromotion(item) {
        const dateTime = dateTimeForm()
        const data = {
            ...item,
            accept_time: dateTime
        }
        if (item.promotion != 0) {
            this.props.postPromotion(data)
        }    
    }

    getDataPromotion() {
        this.props.getPromotion();
    }

    loadData() {
        this.props.adminGetVendorList()
        this.props.adminGetVendorList()
    }

    render() {
        const vendors = (_.get(this.props, "admin_vendor_management.list", []))
        const promotion = (_.get(this.props, "promotions", []))
        return (
            <Fragment>
                <Header />
                <Separator className="mb-2" />
                <VendorList vendors={vendors} promotion={promotion} changeStatusUser={this.changeStatusUser} handlePromotion={this.handlePromotion} />
            </Fragment>
        );
    }
}
const mapStateToProps = ({ admin_vendor_management, promotion }) => {
    const { promotions } = promotion
    return {
        admin_vendor_management,
        promotions
    };
};

export default injectIntl(connect(
    mapStateToProps,
    {
        adminGetVendorList,
        approveRegister,
        getPromotion,
        postPromotion
    }
)(approve));