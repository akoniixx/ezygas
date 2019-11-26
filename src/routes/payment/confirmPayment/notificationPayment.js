import React, { Component, Fragment } from 'react';
import { Row, Button, Modal, ModalHeader, ModalBody, ModalFooter, Card, CardBody, CardImg, } from "reactstrap";
import { Colxx } from "Components/CustomBootstrap";
import { injectIntl } from 'react-intl';
import IntlMessages from "Util/IntlMessages";
import * as jsx from "Assets/JSX-Style/InlineStyle";
import _ from "lodash";
/* child component */
import BankCard from "../bankCard";

const formatNumber = (item) => {
    return item.toLocaleString(navigator.language, { minimumFractionDigits: 0 })
}

class NotiPayment extends Component {
    constructor(props) {
        super(props);
        this.state = {
            statusCheckPayment: true
        }
    }
    render() {
        const payment = _.get(this.props, "payment.list");
        const packageSelected = _.get(this.props, "packageSelected", [])
        const status = _.get(payment, "status", [])
        const cost = formatNumber(_.get(packageSelected, "full_cost", []))
        const method = {
            togglePayment: this.props.togglePayment,
            toggleModalCancelPayment: this.props.toggleModalCancelPayment,
        }
        const buttonStyle = (function (width) {
            if (width >= 575) {
                return {
                    xxs: "3"
                }
            } return {
                xxs: "5"
            }
        })(window.innerWidth);
        const checkStatus = (function (status) {
            if (status === 1) {
                return true
            }
            else {
                return false
            }
        })(status)
        return (
            <Fragment>
                <div
                    className="d-flex flex-column justify-content-center"
                    style={{
                        ...jsx.headerStyle,
                        height: "fit-content",
                        width: "fit-content",
                        textAlign: "center"
                    }}>
                    <Row>
                        <Colxx xxs="12" className="d-flex flex-row justify-content-center mb-3">
                            <h1>
                                <b><IntlMessages id={"การสั่งซื้อเรียบร้อยแล้ว "} /></b>
                            </h1>
                        </Colxx>
                    </Row>
                    <Row className="d-flex justify-content-center">
                        <Colxx xxs="auto" className="d-flex flex-row">
                            <h1>
                                <b><IntlMessages id={"หมายเลขใบสั่งซื้อ"} /></b>
                            </h1>
                        </Colxx>
                        <Colxx xxs="auto" className="d-flex flex-row">
                            <h1 className="text-warning" >
                                <b><IntlMessages id={_.get(payment, "purchase_number", "DataLocal_Status_4(เกิดข้อผิดพลลาด)")} /></b>
                            </h1>
                        </Colxx>
                    </Row>

                    <Row>
                        <Colxx xxs="12" className="d-flex flex-row justify-content-center mb-3">
                            <h1>
                                <b><IntlMessages id={`ราคารวม ${cost} บาท`} /></b>
                            </h1>
                        </Colxx>
                    </Row>

                    <Row
                        style={{
                        }}>
                        <Colxx xxs="12" className="d-flex flex-row justify-content-center mb-5">
                            <div className="text-danger" >
                                {checkStatus ?
                                    <b><h1><IntlMessages id={"**ใบสั่งซื้อจะถูกยกเลิก หากไม่ชำระภายใน 7 วันนับจากวันสั่งซื้อ*"} /> </h1> </b>
                                    :
                                    <b><h1><IntlMessages id={"รอการตรวจสอบการชำระเงิน"} /> </h1> </b>
                                }
                            </div>

                        </Colxx>
                    </Row>


                    <Row >
                        <Colxx xxs="12" className="d-flex flex-row justify-content-center mb-3">
                            <h2>
                                <b> <IntlMessages id={"โอนเงินผ่านบัญชีธนาคาร"} /></b>
                            </h2>
                        </Colxx>
                    </Row>

                    <BankCard />

                    <Row className="d-flex flex-row justify-content-center">
                        <Colxx xxs={buttonStyle.xxs} className="d-flex flex-row justify-content-center mb-5">
                            <Button
                                style={{ backgroundColor: "#0c0ca9" }}

                                // size="lg"
                                className=""
                                onClick={method.togglePayment}>
                                <IntlMessages id={"แจ้งการชำระเงิน"} />
                            </Button>
                        </Colxx>

                        {checkStatus ?
                            <Colxx xxs={buttonStyle.xxs} className="d-flex flex-row  justify-content-center mb-5">
                                <Button
                                    style={{
                                        backgroundColor: "#f5aa23",
                                        borderColor: "#f5aa23"
                                    }}
                                    // size="lg"
                                    className=""
                                    onClick={method.toggleModalCancelPayment}>
                                    <IntlMessages id={"ยกเลิกการสั่งซื้อ"} />
                                </Button>
                            </Colxx>
                            :
                            ""
                        }
                    </Row>
                </div>
            </Fragment>
        );
    }
}
export default injectIntl(NotiPayment);