import React, { Component, Fragment } from "react";
import { injectIntl } from 'react-intl';
import ApproveList from './approveList';
import _ from "lodash";
import Header from './header';
import { Separator } from "Components/CustomBootstrap";
import { connect } from "react-redux";
import Media from 'react-media';
import * as screenWidth from 'Constants/screenWidth';
import { getPackage, getPaymentApproveState, postPaymentApprove } from "Redux/actions";

class approve extends Component {
    constructor(props) {
        super(props)
        this.approvePatmentState = this.approvePatmentState.bind(this);
        this.dataApproveState = this.dataApproveState.bind(this);
        this.state = {

        }
    }

    approvePatmentState(id) {
        this.props.postPaymentApprove(id)
            .then(this.dataApproveState())
    }

    componentDidMount() {
        this.props.getPackage()
        this.dataApproveState()
    }

    dataApproveState() {
        this.props.getPaymentApproveState()
        this.props.getPaymentApproveState()
    }

    render() {
        const packages = _.get(this.props.payment, "PACKAGE", [])
        const approveList = _.get(this.props.payment, "APPROVELIST", [])
        return (
            <Fragment>
                
                <Header />
                <Separator className="mb-2" />
                <ApproveList packages={packages} approveList={approveList} approvePatmentState={this.approvePatmentState} />
             
            </Fragment>
        );
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
        getPaymentApproveState,
        postPaymentApprove
    }
)(approve));