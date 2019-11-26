import React, { Component, Fragment } from "react";
import IntlMessages from "Util/IntlMessages";
import { Row, Card, Button } from "reactstrap";
import { Colxx, Separator } from "Components/CustomBootstrap";
import Media from 'react-media';
import * as jsx from "Assets/JSX-Style/InlineStyle";
import moment from 'moment';
import _ from 'lodash';
import { mobileScreenQuery as mobileScreen } from 'Constants/screenWidth';

class NotificationControl extends Component {
    constructor(props) {
        super(props)
        this.state = {

        }
    }
    render() {
        let desktop = jsx.buttonNotification
        let mobile = jsx.buttonNotificationMobile
        const statusPayment = _.get(this.props, "statusPayment", "")
        const expiryDate = _.get(this.props, "expiryDate", "")
        const buttonStyle = (function (width) {
            if (width > 446) {
                return {
                    ...desktop, backgroundColor: "#ffffff"
                }
            } else {
                return {
                    ...mobile, backgroundColor: "#ffffff"
                }
            }
        })(window.innerWidth);

        const buttonFontontStyle = (function (width) {
            if (width > 446) {
                return {
                    fontSize: '1.0rem', color: "#0C0CA9"
                }
            } return {
                fontSize: '0.6rem', color: "#0C0CA9"
            }
        })(window.innerWidth);

        const method = {
            paymentState: this.props.paymentState,
            changeNotification: this.props.changeNotification
        }

        return (
            <Fragment>
                <NotificationTap expiryDate={expiryDate} statusPayment={statusPayment} buttonStyle={buttonStyle} buttonFontontStyle={buttonFontontStyle} method={method} />
            </Fragment >
        )
    }
}

export default NotificationControl

class NotificationTap extends Component {
    constructor(props) {
        super(props)
        this.calFormatTime = this.calFormatTime.bind(this);
        this.calTime = this.calTime.bind(this);
        this.state = {
            time: "",
            intervalId: "",
            notification: false
        }
    }

    componentDidMount() {
        let intervalId = setInterval(this.calTime, 1000);
        this.setState({ intervalId: intervalId });
    }

    componentWillUnmount() {
        clearInterval(this.state.intervalId);
    }

    calFormatTime(dateTime) {
        const timeFormat = dateTime.split("T")
        const date = _.get(timeFormat, "[0]", "")
        const time = _.get(timeFormat, "[1]", "").substring(0, 8)
        return `${date}, ${time}`
    }

    calTime() {
        let startDate = moment(this.calFormatTime(moment().format()));
        let timeEnd = moment(this.calFormatTime(_.get(this.props, "expiryDate", "")));
        const diff = timeEnd.diff(startDate);
        const diffDuration = moment.duration(diff);
        if (diffDuration.days() < 8) {
            if (diffDuration.seconds() >= 0) {
                if (diffDuration.days() > 0) {
                    this.setState({
                        time: diffDuration.days() + " วัน ",
                        notification: true
                    })
                } else if (diffDuration.days() <= 0) {
                    if (diffDuration.hours() > 0) {
                        this.setState({
                            time: diffDuration.hours() + " ชม. " + diffDuration.minutes() + " นาที " + diffDuration.seconds() + " วินาที ",
                            notification: true
                        })
                    } else if (diffDuration.hours() <= 0) {
                        this.setState({
                            time: diffDuration.minutes() + " นาที " + diffDuration.seconds() + " วินาที ",
                            notification: true
                        })
                    }
                }

            } else {
                this.setState({
                    time: "หมดอายุ",
                    notification: true
                })
            }
        } else {
            this.setState({
                notification: false
            })
        }
    }
    render() {
        let { time } = this.state
        const statusPayment = _.get(this.props, "statusPayment")
        const buttonStyle = _.get(this.props, "buttonStyle")
        const buttonFontontStyle = _.get(this.props, "buttonFontontStyle")
        const method = _.get(this.props, "method")
        const rowSeparator = { width: '-webkit-fill-available', height: '3px' }
        const separatorStyle = { height: 3, width: '100%' }
        const messageNotification = (function (s) {
            if (s === 1 && time != "หมดอายุ") {
                return `แจ้งการชำระภายใน `
            } else if (s === 4 && time != "หมดอายุ") {
                return "อยู่ในขั้นตอนการตรวจสอบการชำระเงิน"
            } else if (time === "หมดอายุ") {
                return "บัญชีหมดอายุการใช้งาน กรุณาซื้อแพ็คเกจค่ะ"
            } else {
                return `บัญชีคุณจะหมดอายุภายใน `
            }
        })(statusPayment)
        const messageButton = (function (s) {
            if (s === 1 && time != "หมดอายุ") {
                return "แจ้งการชำระ"
            } else if (s === 4 && time != "หมดอายุ") {
                return "อยู่ในขั้นตอนการตรวจสอบการชำระเงิน"
            } else{
                return "ซื้อเลย!"
            }
        })(statusPayment)
        let classname = "btn buttons";
        if (window.innerWidth <= mobileScreen.maxWidth) {
            classname += " px-3 my-3";
        }
        let style = {
            backgroundColor: "#FFF",
            border: "none"
        };
        return (
            <Fragment>
                <div style={jsx.backgroundNotification}>
                    <Row style={jsx.rowNotification}>
                        <Colxx xxs="12" className="d-flex flex-column justify-content-center">
                            <div className="d-flex flex-row justify-content-center">
                                <div className="d-flex flex-column justify-content-center">
                                    <a style={jsx.fontNotification}>
                                        <b><IntlMessages id={messageNotification} />{statusPayment != 4 && time != "หมดอายุ" ? <a style={{ fontSize: '1.4rem' }}>{time}</a> : ""}</b>
                                    </a>
                                </div>
                                {statusPayment != 4 || time === "หมดอายุ"?
                                    <Button 
                                    size="lg" 
                                    style={style} 
                                    className={classname}
                                    onClick={(e) => { method.paymentState(e), method.changeNotification(e, false) }}>
                                        <b><a style={buttonFontontStyle}>
                                            <IntlMessages id={messageButton} />
                                        </a></b>
                                    </Button>
                                    : ""}
                            </div>
                        </Colxx>
                    </Row>
                </div>
                {/* <Row style={rowSeparator}>
                    <div className="separator-blue mt-0" style={separatorStyle} />
                </Row> */}
            </Fragment>
        )
    }
}