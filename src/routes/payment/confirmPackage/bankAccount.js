import React, { Component, Fragment } from "react";
import IntlMessages from "Util/IntlMessages";
import { Row, Card, CardBody, Input, Button } from "reactstrap";
import { Colxx } from "Components/CustomBootstrap";
import * as screenWidth from "Constants/screenWidth";
import * as jsx from 'Assets/JSX-Style/InlineStyle';
import _ from 'lodash';

/* Child Component */
import BankCard from '../bankCard'

class BankControl extends Component {
    constructor(props) {
        super(props)
        this.state = {

        }
    }
    render() {
        const method = {
            toggleModalConfirm: _.get(this.props, "toggleModalConfirm")
        }
        return (
            <Fragment>
                <BankDetail method={method}/>
            </Fragment>
        )
    }
}

export default BankControl

class BankDetail extends Component {
    render() {
        const method = _.get(this.props, "method")
        const buttonStyle = {
            ...jsx.buttonStyle,
            borderRadius: "25.5px",
            backgroundColor: "#0c0ca9",
            paddingLeft: 30,
            paddingRight: 30
        }
        return (
            <Fragment>
                <div className="d-flex flex-row justify-content-center">
                    <div className="d-flex flex-column w-100" style={jsx.confirmPackageSize}>
                        <Row>
                            <Colxx xxs="12" className="mb-2 ">
                                <h2 style={jsx.fontStyle}><b><IntlMessages id={"บัญชีธนาคาร"} /></b></h2>
                            </Colxx>
                        </Row>
                        <Row>
                            <Colxx xxs="12">
                                <div className="mb-5">
                                    <BankCard />
                                </div>

                                <div className="d-flex flex-row justify-content-center">
                                    <Button
                                        style={buttonStyle}
                                        onClick={method.toggleModalConfirm}
                                    >
                                        <IntlMessages id={"ยืนยันการสั่งซื้อ"} />
                                    </Button>
                                </div>

                            </Colxx>
                        </Row>
                    </div>
                </div>
            </Fragment>
        )
    }
}