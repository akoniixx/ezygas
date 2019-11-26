import React, { Component, Fragment } from "react";
import IntlMessages from "Util/IntlMessages";
import { Row, Modal, ModalHeader, ModalBody, Button } from "reactstrap";
import { Colxx } from "Components/CustomBootstrap";
import * as jsx from 'Assets/JSX-Style/InlineStyle';
import _ from 'lodash';

class ModalControl extends Component {
    constructor(props) {
        super(props)
        this.state = {

        }
    }
    render() {
        const props = _.get(this.props, "state")
        const selectedItem = _.get(this.props, "selectedItem")
        const method = {
            toggleModalConfirm: _.get(this.props, "toggleModalConfirm"),
            toggleModalNotification: _.get(this.props, "toggleModalNotification"),
            confirmPackage: _.get(this.props, "confirmPackage"),
            toggleModalDelayPayment: _.get(this.props, "toggleModalDelayPayment")
        }
        return (
            <Fragment>
                <ModalConfirm props={props} selectedItem={selectedItem} method={method} />
                <ModalNotification props={props} method={method} />
                <ModalDelayPayment props={props} method={method} />
            </Fragment>
        )
    }
}

export default ModalControl

class ModalConfirm extends Component {
    render() {
        const props = _.get(this.props, "props")
        const selectedItem = _.get(this.props, "selectedItem")
        const method = _.get(this.props, "method")
        const modalStyle = (function (w) {
            if (w >= 500) {
                return {
                    ...jsx.modalStyle
                }
            } else {
                return {
                    ...jsx.modalStyle, top: "50%", left: "35%", maxWidth: "65vw"
                }
            }
        })(window.innerWidth)
        return (
            <Fragment>
                <Modal
                    style={modalStyle}
                    isOpen={props.modalConfirmOpen}
                    toggle={method.toggleModalConfirm}
                    aria-labelledby="example-modal-sizes-title-sm"
                    backdrop={true}
                >
                    <ModalHeader className="pb-2" style={jsx.headerModalNonLine}>
                        <div className="d-flex flex-row justify-content-center">
                            <IntlMessages id={"ยืนยันการสั่งซื้อ"} />
                        </div>
                        <div className="d-flex flex-row justify-content-center text-center" style={{ color: "#DC3545" }}>
                            <IntlMessages id={"โปรดยืนยันความถูกต้องเพื่อความสะดวกในการให้บริการ"} />
                        </div>
                        <div className="d-flex flex-row justify-content-center mb-2">
                            <IntlMessages id={"ขอบคุณค่ะ"} />
                        </div>
                        <div>
                            <UserDetail props={props} />
                        </div>
                    </ModalHeader>
                    <ModalBody className="p-2">
                        <Row>
                            <Colxx xxxs="12" className="d-flex flex-row justify-content-center">
                                <Colxx sm="6" >
                                    <div className="d-flex flex-row justify-content-end">
                                        <Button style={{ backgroundColor: "#0c0ca9", borderColor: "#0c0ca9" }} onClick={() => method.confirmPackage(selectedItem)}>
                                            <IntlMessages id={"ยืนยัน"} />
                                        </Button>
                                    </div>
                                </Colxx>

                                <Colxx sm="6" >
                                    <div className="d-flex flex-row justify-content-start">
                                        <Button style={{ backgroundColor: "#f5aa23", borderColor: "#f5aa23" }} color="warning" onClick={method.toggleModalConfirm}>
                                            <IntlMessages id={"ยกเลิก"} />
                                        </Button>
                                    </div>
                                </Colxx>
                            </Colxx>
                        </Row>
                    </ModalBody>
                </Modal>
            </Fragment >
        )
    }
}

class ModalNotification extends Component {
    render() {
        const props = _.get(this.props, "props")
        const method = _.get(this.props, "method")
        const modalStyle = (function (w) {
            if (w >= 500) {
                return {
                    ...jsx.modalStyle
                }
            } else {
                return {
                    ...jsx.modalStyle, top: "50%", left: "35%", maxWidth: "65vw"
                }
            }
        })(window.innerWidth)
        return (
            <Fragment>
                <Modal
                    style={modalStyle}
                    isOpen={props.modalNotificationOpen}
                    toggle={method.toggleModalNotification}
                    aria-labelledby="example-modal-sizes-title-sm"
                    backdrop={true}
                >
                    <ModalHeader style={jsx.headerModalNonLine}>
                        <div className="">
                            <IntlMessages id={"กรุณากรอกข้อมูลให้สมบูรณ์หรือครบถ้วน"} />
                        </div>
                    </ModalHeader>
                    <ModalBody>
                        <div className="text-center">
                            <Button style={{ backgroundColor: "#0c0ca9", borderColor: "#0c0ca9" }} onClick={method.toggleModalNotification}>
                                <IntlMessages id={"ตกลง"} />
                            </Button>
                        </div>
                    </ModalBody>
                </Modal>
            </Fragment>
        )
    }
}

class UserDetail extends Component {
    render() {
        const props = _.get(this.props, "props")
        return (
            <Fragment>
                <div className="d-flex flex-row justify-content-center">
                    <div className="d-flex flex-column justify-content-center" >
                        <Row>
                            <Colxx xxs="12">
                                <div className="d-flex flex-row justify-content-center mb-2" style={jsx.fontStyle3}>
                                    <h4><IntlMessages id={"คุณ: "} />{props.name}</h4>
                                </div>

                                <div className="d-flex flex-row justify-content-center mb-2" style={jsx.fontStyle3}>
                                    <h4><IntlMessages id={"อีเมล: "} />{props.email}</h4>
                                </div>

                                <div className="d-flex flex-row justify-content-center" style={jsx.fontStyle3}>
                                    <h4><IntlMessages id={"เบอร์โทรศัพท์: "} />{"0" + props.tel.substring(3)}</h4>
                                </div>
                            </Colxx>
                        </Row>
                    </div>
                </div>
            </Fragment>
        )
    }
}

class ModalDelayPayment extends Component {
    render() {
        const modalOpen = _.get(this.props, "props.modalDelayPaymentOpen")
        const toggle = _.get(this.props, "method.toggleModalDelayPayment")
        const modalStyle = (function (w) {
            if (w >= 500) {
                return {
                    ...jsx.modalStyle
                }
            } else {
                return {
                    ...jsx.modalStyle, top: "50%", left: "35%", maxWidth: "65vw"
                }
            }
        })(window.innerWidth)
        return (
            <Fragment>
                <Modal
                    isOpen={modalOpen}
                    toggle={toggle}
                    style={modalStyle}
                    aria-labelledby="example-modal-sizes-title-sm"
                    backdrop={true}
                >
                    <ModalHeader style={jsx.headerModalNonLine}>
                        <div>
                            {"ทำรายการติดต่อกันบ่อย กรุณารอประมาณ 30 วินาที"}
                        </div>
                    </ModalHeader>
                    <ModalBody>
                        <div className="text-center">
                            <Button style={{ backgroundColor: "#0c0ca9", borderColor: "#0c0ca9" }} onClick={toggle}>
                                <IntlMessages id={"ตกลง"} />
                            </Button>
                        </div>
                    </ModalBody>
                </Modal>
            </Fragment>
        )
    }
}