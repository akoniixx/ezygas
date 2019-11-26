import 'rc-time-picker/assets/index.css';
import "react-datepicker/dist/react-datepicker.css"
import React, { Component, Fragment } from 'react';
import {
    Row,
    Button,
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Col,
    Label,
    Input
} from "reactstrap";
import { Colxx, Separator } from "Components/CustomBootstrap";
import { month } from "Constants/dataTime";
import IntlMessages from "Util/IntlMessages";
import * as jsx from "Assets/JSX-Style/InlineStyle";
import _ from "lodash";
import DatePicker from "react-datepicker";
import TimePicker from 'rc-time-picker';
import moment from 'moment';
import { cpus } from 'os';
import { NavLink } from "react-router-dom";
import { urls } from 'Constants/defaultValues';
import { isNull } from 'util';
import axios from 'axios'



class ModalControl extends Component {
    constructor(props) {
        super(props)
        this.responsePayment = this.responsePayment.bind(this);
        this.handleApiClodinary = this.handleApiClodinary.bind(this);
        this.handleConfirmPayment = this.handleConfirmPayment.bind(this);
        this.handleState = this.handleState.bind(this);
        this.handleChangeDateTime = this.handleChangeDateTime.bind(this);
        this.uploadBankSlip = this.uploadBankSlip.bind(this);
        this.controlModal = this.controlModal.bind(this);
        this.setStatEmpty = this.setStatEmpty.bind(this);
        this.toggleModalWaitUpload = this.toggleModalWaitUpload.bind(this);
        this.toggleModalNotification = this.toggleModalNotification.bind(this);
        this.toggleImage = this.toggleImage.bind(this);
        this.state = {
            price: "",
            date: moment(this.props.start),
            time: moment(this.props.start),
            dateMessage: "",
            timeMessage: "",
            image: '',
            imagePreview: '',
            modalNotificationOpen: false,
            modalImageOpen: false,
            url: "",
            checkDelay: false,
        }

    }

    responsePayment() {
        let { price, dateMessage, timeMessage, url } = this.state
        this.toggleModalWaitUpload()
        this.props.togglePayment();
        this.props.toggleModalWaitApprove();
        this.setStatEmpty();
        this.props.confirmPayment(this.props.payment, url, price, dateMessage, timeMessage);
        this.setState({
            url: "",
            checkDelay: false,
            date: moment(this.props.start),
            time: moment(this.props.start)
        })
    }

    controlModal() {
        let { price, date, time, image } = this.state
        if (!isNull(price) && !isNull(date) && !isNull(time) && image != '') {
            this.handleConfirmPayment();
        } else {
            this.toggleModalNotification();
        }
    }

    handleApiClodinary(imagePreview) {
        let { date, time } = this.state
        date = date.toString().split(" ")
        time = time.toString().split(" ")
        date = "" + date[3] + "/" + month[date[1]] + "/" + date[2]
        time = time[4].substring(0, 5)
        const cloudName = 'easygas'
        const unsignedUploadPreset = "kpbgwyqt";
        const apiKey = "116744783684914"
        const folder = "slip"
        const path = date + "/"
        const config = {
            headers: { "X-Requested-With": "XMLHttpRequest" },
        };
        let name = path + this.props.payment.list.purchase_number.substring(0, 4) + "_" + date.replace(/[/]/g, '-') + "_" + time
        let url = `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`;
        let formData = new FormData();
        formData.append("upload_preset", unsignedUploadPreset); // Replace the preset name with your own
        formData.append("tags", "slip"); // Optional - add tag for image admin in Cloudinary
        formData.append("public_id", name);
        formData.append("file", imagePreview);
        formData.append("folder", folder);
        formData.append("api_key", apiKey); // Replace API key with your own Cloudinary API key  
        // formData.append("timestamp", (Date.now() / 1000) | 0);
        this.setState({ checkDelay: true })
        setTimeout(async () => {
            return await fetch(url, {
                method: 'POST',
                body: formData
            })
                .then((response) => response.json())
                .then((responseJson) => {
                    // console.log("responseJson", responseJson.secure_url)
                    this.setState({
                        url: responseJson.secure_url,
                        dateMessage: date.replace(/[/]/g, '-'),
                        timeMessage: time
                    })
                })
        }, 2000);
    }

    handleConfirmPayment() {
        let { imagePreview } = this.state
        this.handleApiClodinary(imagePreview)
    }

    handleState(e, index) {
        let state = {}
        if (index === "price") {
            if (!isNaN(parseInt(e.target.value, 10))) {
                state[index] = parseInt(e.target.value, 10)
            } else {
                state[index] = ""
            }
        }
        this.setState(state)
    }

    handleChangeDateTime(DataTime, index) {
        let state = {}
        state[index] = DataTime
        this.setState(state);
    }

    setStatEmpty() {
        this.setState({
            price: null,
            date: moment(this.props.start),
            time: moment(this.props.start),
            image: '',
            imagePreview: ''
        })
    }

    toggleModalWaitUpload() {
        this.setState({ checkDelay: !this.state.checkDelay })
    }

    toggleModalNotification() {
        this.setState({ modalNotificationOpen: !this.state.modalNotificationOpen })
    }

    toggleImage() {
        this.setState({ modalImageOpen: !this.state.modalImageOpen })
    }

    uploadBankSlip(e) {
        let reader = new FileReader();
        let file = e.target.files[0];
        reader.onloadend = () => {
            this.setState({
                image: file,
                imagePreview: reader.result
            });
        }
        reader.readAsDataURL(file)
    }
    render() {
        const state = _.get(this, "state")
        const props = _.get(this.props, "state")
        const payment = _.get(this.props, "payment.list")
        const method = {
            confirmPayment: _.get(this.props, "confirmPayment"),
            controlModal: this.controlModal,
            handleConfirmPayment: this.handleConfirmPayment,
            handleState: this.handleState,
            handleChangeDateTime: this.handleChangeDateTime,
            canclePayment: _.get(this.props, "canclePayment"),
            setStatEmpty: this.setStatEmpty,
            togglePayment: _.get(this.props, "togglePayment"),
            toggleModalWaitApprove: _.get(this.props, "toggleModalWaitApprove"),
            toggleModalCancelPayment: _.get(this.props, "toggleModalCancelPayment"),
            toggleModalNotification: this.toggleModalNotification,
            toggleImage: this.toggleImage,
            uploadBankSlip: this.uploadBankSlip,
        }
        return (
            <Fragment>
                {this.state.url != "" && this.state.checkDelay === true ?
                    this.responsePayment()
                    :
                    ""
                }
                <ModalNotiPayment state={state} modalOpen={props.modalOpenPayment} payment={payment} date={this.state.date} time={this.state.time} method={method} img={this.state.imagePreview} />
                <ModalWaitVeridate modalOpen={props.modalOpenWaitApprove} method={method} />
                <ModalCencelPayment modalOpen={props.modalOpenCencelPayment} method={method} />
                <ModalNotification modalOpen={this.state.modalNotificationOpen} method={method} />
                <ModalImage modalOpen={this.state.modalImageOpen} method={method} img={this.state.imagePreview} />
                <ModalWaitImageUpload modalOpen={this.state.checkDelay} toggle={this.toggleModalWaitUpload} />
            </Fragment>
        )
    }
}

export default ModalControl

class ModalWaitImageUpload extends Component {
    render() {
        const modalOpen = _.get(this.props, "modalOpen")
        const toggle = _.get(this.props, "toggle")
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
                    <ModalBody className="p-3" >
                        <div>
                            {"รอการอัพภาพสักครู่"}
                        </div>
                    </ModalBody>
                </Modal>
            </Fragment>
        )
    }
}

class ModalNotiPayment extends Component {
    render() {
        const { price } = _.get(this.props, "state")
        const payment = _.get(this.props, "payment")
        const modalOpen = _.get(this.props, "modalOpen")
        const method = _.get(this.props, "method")
        const img = _.get(this.props, "img")
        const date = _.get(this.props, "date")
        const time = _.get(this.props, "time")
        const currentlyTime = (function (t) {
            if (t === null) {
                return moment()
            } else {
                return time
            }
        })(time)
        const modalStyle = (function (w) {
            let st = {
                maxWidth: '80vw',
                display: 'flex',
                transform: 'translate(0%, 10vh)',
                borderRadius: 25.5,
                padding: 10,
                margin: '0 auto',
                backgroundColor: 'white'
            }
            if (w >= 701) st = { ...st, maxWidth: 550 };
            else if (w >= 550) st = { ...st, maxWidth: '80vw' };
            else if (w < 400) st = { ...st, maxWidth: 'unset' }
            return st;
        })(window.innerWidth);
        const imgStyle = (function (img) {
            if (img != '') {
                return {
                    objectFit: 'contain', height: 100
                }
            } return {

            }
        })(img);
        return (
            <Fragment>
                <Modal
                    isOpen={modalOpen}
                    // toggle={method.togglePayment} // fix bug when select time , time funtion and this function active a both
                    style={modalStyle}
                    aria-labelledby="example-modal-sizes-title-sm"
                    backdrop={true} >
                    <ModalHeader className="p-3" >
                        <div style={{ ...jsx.headerStyle, textAlign: "center" }}>
                            <h2><b><IntlMessages id={"แจ้งชำระเงิน เลขที่ใบสั่งซื้อ "} /></b>
                                <b><IntlMessages id={_.get(payment, "purchase_number", "1")} /></b></h2>
                        </div>
                    </ModalHeader>
                    <ModalBody className="p-3">
                        <div className="d-flex flex-row justify-content-center">
                            <Row className="w-90">
                                <Colxx xxs="12">
                                    <div className="mb-2" style={jsx.fontStyle3}>
                                        <IntlMessages id={"จำนวนเงิน"} />
                                    </div>
                                    <div className='input-shadow mb-2' style={jsx.inputRadiusStyle}>
                                        <Input value={price} onChange={(e) => method.handleState(e, "price")} style={jsx.inputRadiusStyle} ></Input>
                                    </div>
                                    <div className="mb-2" style={jsx.fontStyle3}>
                                        <IntlMessages id={"วันที่โอน"} />
                                    </div>
                                    <div className='react-datepicker mt-2 mb-2 w-100' style={jsx.inputRadiusStyle}>
                                        <DatePicker
                                            selected={date}
                                            dateFormat="DD/MM/YYYY"
                                            onChange={event => { method.handleChangeDateTime(event, "date") }} />
                                    </div>
                                    <div className="mb-2" style={jsx.fontStyle3}>
                                        <IntlMessages id={"เวลาที่โอน"} />
                                    </div>
                                    <Colxx xxs="6" className="p-0 mb-3">
                                        <div className='time-select mb-4 mt-2'>
                                            <TimePicker
                                                style={jsx.inputRadiusStyle}
                                                defaultValue={moment()}
                                                value={currentlyTime}
                                                clearIcon
                                                showSecond={false}
                                                onChange={event => { method.handleChangeDateTime(event, "time") }}
                                            />
                                        </div>
                                    </Colxx>
                                    <div className="mb-2" style={jsx.fontStyle3}>
                                        <IntlMessages id={"แนบไฟล์หลักฐาน"} />
                                    </div>
                                    <div className="mb-4">
                                        <Row className="mb-4" s>
                                            <Colxx xxs="12">
                                                <Input
                                                    outline
                                                    color="warning"
                                                    type="file"
                                                    onChange={(e) => method.uploadBankSlip(e)}
                                                >
                                                    <IntlMessages id={"อัพโหลดไฟล์"} />
                                                </Input>
                                            </Colxx>
                                        </Row>
                                        <Row>
                                            <Colxx xxs="12" className="d-flex flex-column justify-content-center" >
                                                <div className="text-muted d-flex flex-column justify-content-center" >
                                                    <IntlMessages id={" "} />
                                                    <img src={img} className="ml-2" style={imgStyle} onClick={method.toggleImage} />
                                                </div>
                                            </Colxx>
                                        </Row>
                                    </div>
                                </Colxx>
                            </Row>
                        </div>
                    </ModalBody>
                    <ModalFooter
                        style={{
                            display: 'flex',
                            justifyContent: 'space-between'
                        }} >
                        <Button
                            style={{ backgroundColor: "#0c0ca9" }}
                            onClick={method.controlModal}
                            size="lg" >
                            {"ยีนยัน"}
                        </Button>
                        <Button
                            style={{ backgroundColor: "#f5aa23", borderColor: "#f5aa23" }}
                            onClick={() => { method.togglePayment(), method.setStatEmpty() }}
                            size="lg" >
                            {"ยกเลิก"}
                        </Button>
                        {/* <div className="d-flex flex-row justify-content-center mb-1">
                                        <Row>
                                            <Colxx xxs="6">
                                                <Button
                                                    style={{ backgroundColor: "#0c0ca9" }}
                                                    onClick={method.controlModal}
                                                    size="lg"
                                                >
                                                    <IntlMessages id={"ยีนยัน"} />
                                                </Button>
                                            </Colxx>

                                            <Colxx xxs="6">
                                                <Button
                                                    style={{ backgroundColor: "#f5aa23", borderColor: "#f5aa23" }}
                                                    onClick={() => { method.togglePayment(), method.setStatEmpty() }}
                                                    size="lg"
                                                >
                                                    <IntlMessages id={"ยกเลิก"} />
                                                </Button>
                                            </Colxx>
                                        </Row>

                                    </div> */}
                    </ModalFooter>
                </Modal>
            </Fragment>
        )
    }
}

class ModalWaitVeridate extends Component {
    render() {
        const modalOpen = _.get(this.props, "modalOpen")
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
                    isOpen={modalOpen}
                    toggle={method.toggleModalWaitApprove}
                    style={modalStyle}
                    aria-labelledby="example-modal-sizes-title-sm"
                    backdrop={true}
                >
                    <ModalBody className="pt-5">
                        <Row>
                            <Colxx xxs="12">
                                <div className="d-flex flex-row justify-content-center w-100 mb-4" style={jsx.headerStyle}>
                                    <h2><IntlMessages id={"รอการตรวจสอบภายใน 24 ชม"} /></h2>
                                </div>
                                <div className="d-flex flex-row justify-content-center w-100 mb-4" style={jsx.headerStyle}>
                                    <h2><IntlMessages id={"ขอบคุณที่ใช้บริการค่ะ"} /></h2>
                                </div>
                                <div className="d-flex flex-row justify-content-center w-100 mb-4" style={jsx.headerStyle}>
                                    <Button

                                        style={{ backgroundColor: "#0c0ca9" }}
                                        onClick={() => { method.toggleModalWaitApprove() }}

                                        size="lg"
                                        className=""
                                    >
                                        <IntlMessages id={"ปิด"} />
                                    </Button>
                                </div>
                            </Colxx>
                        </Row>
                    </ModalBody>
                </Modal>
            </Fragment>
        )

    }

}

class ModalCencelPayment extends Component {
    render() {
        const modalOpen = _.get(this.props, "modalOpen")
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
                    isOpen={modalOpen}
                    toggle={method.toggleModalCancelPayment}
                    style={modalStyle}
                    aria-labelledby="example-modal-sizes-title-sm"
                    backdrop={true}
                >
                    <ModalBody className="pt-5">
                        <Row>
                            <Colxx xxs="12">
                                <div className="d-flex flex-row justify-content-center w-100 mb-4" style={jsx.headerStyle}>
                                    <h2><IntlMessages id={"ต้องการยกเลิกการชำระเงิน?"} /></h2>
                                </div>

                            </Colxx>
                        </Row>

                        <Row>
                            <Colxx xxs="6" className="d-flex flex-row justify-content-center mb-5">
                                <Button
                                    style={{ backgroundColor: "#0c0ca9" }}
                                    onClick={method.canclePayment}
                                    size="lg"
                                    className=""
                                >

                                    <IntlMessages id={"ยืนยัน"} />
                                </Button>
                            </Colxx>

                            <Colxx xxs="6" className="d-flex flex-row  justify-content-center mb-5">
                                <Button
                                    style={{
                                        backgroundColor: "#f5aa23",
                                        borderColor: "#f5aa23"
                                    }}

                                    size="lg"
                                    className=""
                                    onClick={method.toggleModalCancelPayment}
                                >
                                    <IntlMessages id={"ยกเลิก"} />
                                </Button>
                            </Colxx>
                        </Row>

                    </ModalBody>
                </Modal>
            </Fragment>
        )

    }

}

class ModalNotification extends Component {
    render() {
        const modalOpen = _.get(this.props, "modalOpen")
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
                    isOpen={modalOpen}
                    toggle={method.toggleModalNotification}
                    aria-labelledby="example-modal-sizes-title-sm"
                    backdrop={true}
                >
                    <ModalHeader style={jsx.headerModalNonLine}>
                        <div className="text-center">
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

class ModalImage extends Component {
    render() {
        const modalOpen = _.get(this.props, "modalOpen")
        const method = _.get(this.props, "method")
        const img = _.get(this.props, "img")
        return (
            <Fragment>
                <Modal
                    isOpen={modalOpen}
                    toggle={method.toggleImage}
                    style={jsx.modalImage}
                    aria-labelledby="example-modal-sizes-title-sm"
                    backdrop={true}
                >
                    <ModalBody className="p-0" style={{ maxWidth: 0, maxHeight: 0 }}>
                        <div className="mb-2">
                            <img src={img} style={{ width: window.innerWidth * 0.5, height: window.innerHeight * 0.5 }} />
                        </div>
                    </ModalBody>

                </Modal>
            </Fragment>
        )
    }
}

