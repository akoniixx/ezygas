import 'rc-time-picker/assets/index.css';
import "react-datepicker/dist/react-datepicker.css"
import DatePicker from "react-datepicker";
import TimePicker from 'rc-time-picker';
import React, { Component, Fragment } from "react";
import IntlMessages from "Util/IntlMessages";
import { Modal, ModalHeader, ModalBody, ModalFooter, Row, Col } from "reactstrap";
import * as jsx from 'Assets/JSX-Style/InlineStyle';
import Text from 'Components/Text';
import { Input } from 'Components/Input';
import Button from 'Components/Button';
import { isNull } from 'util';
import _ from 'lodash';
import moment from 'moment';

class ModalControl extends Component {
    constructor(props) {
        super(props)
        this.confirmFixcost = this.confirmFixcost.bind(this);
        this.onChange = this.onChange.bind(this);
        this.validateNumber = this.validateNumber.bind(this);
        this.state = {
            title: "",
            cost: "",
            ckeckInputComplete: true,
            date: moment(),
            time: moment()
        }
    }

    componentWillReceiveProps() {
        this.setState(
            {
                title: "",
                cost: "",
                ckeckInputComplete: true,
            }
        )
    }
    confirmFixcost() {
        let { title, cost, date, time } = this.state
        let data = { title, cost, date, time }
        if (data.title === "" || data.cost === "") {
            this.setState({ ckeckInputComplete: false })
        } else {
            this.props.toggleFixCostModal()
            this.props.confirmFixCost(data)
        }
    }
    onChange(e, index) {
        let state = {}
        state[index] = this.validateNumber(e, index)
        this.setState(state)
    }
    validateNumber(e, index) {
        let value = ""
        if (index === "cost") {
            if (!isNaN(parseInt(e, 10))) {
                value = parseInt(e, 10)
            } else {
                value = ""
            }
        } else {
            value = e
        }
        return value
    }

    render() {
        const state = this.state
        const modalOpen = _.get(this.props, "modalOpen")
        const method = {
            confirmFixcost: this.confirmFixcost,
            onChange: this.onChange,
            toggleFixCostModal: _.get(this.props, "toggleFixCostModal"),
        }
        return (
            <Fragment>
                <FixCostModal state={state} modalOpen={modalOpen} method={method} />
            </Fragment>
        )
    }
}

export default ModalControl

class FixCostModal extends Component {
    render() {
        const state = _.get(this.props, "state")
        const modalOpen = _.get(this.props, "modalOpen")
        const method = _.get(this.props, "method")
        //style//
        //style - button 
        const buttonStyle = { margin: "5px" }
        //style - datePicker
        const dateInputStyle = { borderRadius: "25.5px" }
        //style - HeadTitle 
        const headerTitleStyle = { marginLeft: 35 }
        //style - input 
        const inputStyle = "5px"
        //style - modal 
        const modalPosition = { top: "20%" }
        const modalStyle = (function (w) {
            if (w > 768) {
                return {
                    ...jsx.modalStyle, ...modalPosition, maxWidth: "450px"
                }
            } else {
                return {
                    ...jsx.modalStyle, ...modalPosition, maxWidth: "300px", minWidth: "280px"
                }
            }
        })(window.innerWidth)
        //style - timePicker
        const timePickerStyle = { width: "100%", height: "100%" }
        return (
            <Fragment>
                <Modal
                    style={modalStyle}
                    isOpen={modalOpen}
                    toggle={method.toggleFixCostModal}
                    aria-labelledby="example-modal-sizes-title-sm"
                    backdrop={false}
                >
                    <ModalHeader toggle={method.toggleFixCostModal} cssModule={{ 'modal-title': 'w-100 text-center' }}>
                        <div className="d-flex justify-content-center mb-2" style={headerTitleStyle}>
                            <Text type="title" text="รายจ่าย" align="center" />
                        </div>
                    </ModalHeader>
                    <div className="mx-4 pb-4 p-0">
                        <ModalBody className="p-1">
                            {/* Label && input */}
                            <div className="mb-1 mt-2">
                                <Text type="normal" text="ชื่อรายการ" />
                            </div>
                            <div className="mb-3">
                                <Input value={state.title} borderRadius={inputStyle} onChange={(e) => { method.onChange(e, "title") }} />
                            </div>
                            <div className="mb-1">
                                <Text type="normal" text="จำนวนวเงิน (บาท)" />
                            </div>
                            <div className="mb-3">
                                <Input value={state.cost} borderRadius={inputStyle} onChange={(e) => { method.onChange(e, "cost") }} />
                            </div>
                            {/* Label && DateTime */}
                            <Row className="mb-1" id="lebel">
                                <Col><Text type="normal" text="วันที่" /></Col>
                                <Col><Text type="normal" text="เวลา" /></Col>
                            </Row>
                            <Row className="mb-4">
                                <Col>
                                        <DatePicker
                                            selected={state.date}
                                            onChange={(e) => { method.onChange(e, "date") }}
                                            dateFormat="DD/MM/YYYY"
                                        />
                                </Col>
                                <Col>
                                    <TimePicker
                                        style={timePickerStyle}
                                        defaultValue={state.time}
                                        value={state.time}
                                        showSecond={false}
                                        clearIcon
                                        onChange={(e) => method.onChange(e, "time")}
                                    />
                                </Col>
                            </Row>
                            {state.ckeckInputComplete === true ? "" : <Text color={"red"} type="normal" text="กรุณาใส่ข้อมูลให้ครบถ้วน" />}
                        </ModalBody>
                        <ModalFooter
                            style={{ display: "flex", flexDirection: "row", justifyContent: "space-around" }}
                            cssModule={{ 'modal-footer': 'w-100 text-center' }}>
                            <Button
                                type="cancel"
                                text="ยกเลิก"
                                style={buttonStyle}
                                onClick={method.toggleFixCostModal} />
                            <Button
                                type="primary"
                                text="ตกลง"
                                style={buttonStyle}
                                onClick={method.confirmFixcost} />
                        </ModalFooter>
                    </div>
                </Modal>
            </Fragment>
        )
    }
}
