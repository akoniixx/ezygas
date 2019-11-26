import React, { Component, Fragment } from 'react';
import Media from 'react-media';
import { Row } from 'reactstrap';
import { Colxx } from 'Components/CustomBootstrap';
import { NavLink } from 'react-router-dom';
import IntlMessages from "Util/IntlMessages";
import { injectIntl } from 'react-intl';
import Text from 'Components/Text';

import { urls } from 'Constants/defaultValues';

import * as screenQuery from 'Constants/screenWidth';

const fontSize = "20px";

const titleLine1 = () => {
    return (
        <div className="mb-3">
            <Text
                type='title'
                text='ตัวช่วยที่จะทำให้การจัดการร้านแก๊สของคุณ'
                size={fontSize}
                align="start" />
        </div>
    );
}

const titleLine2 = () => {
    return (
        <div className="mb-3 d-flex flex-row">
            <Text
                type='title'
                text='เป็นเรื่อง'
                size={fontSize}
                align="start" />
            <Text
                type='title'
                text={`ง่ายๆ “ ครบ จบ ” `}
                size={fontSize}
                color="#FF782B"
                align="start" />
            <Text
                type='title'
                text=' ในเว็บเดียว'
                size={fontSize}
                align="start" />
        </div>
    );
}

const text1 = "ด้วยความพิเศษ และความก้าวหน้าขอเทคโนโลยีที่ถูกออกแบบมา";
const text2 = "เพื่อตอบสนองโลกในปัจจุบัน เราจึงพัฒนาระบบ ให้ใช้ง่ายสะดวก";
const text3 = "รวดเร็ว และ ทันสมัยเพื่อก้าวให้ทันยุคปัจจุบัน";
const banner = "/assets/img/landing-page/banner.svg"

const text = () => {
    const color = "#919AA3";
    return (
        <Fragment>
            <Text
                type="normal"
                text={text1}
                color={color}
                align="start" />
            <Text
                type="normal"
                text={text2}
                color={color}
                align="start" />
            <Text
                type="normal"
                text={text3}
                color={color}
                align="start" />
        </Fragment>
    );
}

class Banner extends Component {

    render() {
        return (
            <div style={{ marginTop: 100 }}>
                <Media query={screenQuery.mobileScreenQuery}>
                    <Mobile isLoggedIn={this.props.isLoggedIn} />
                </Media>
                <Media query={screenQuery.tabletScreenQuery}>
                    <Tablet isLoggedIn={this.props.isLoggedIn} />
                </Media>
                <Media query={screenQuery.desktopScreenQuery}>
                    <Desktop isLoggedIn={this.props.isLoggedIn} />
                </Media>
            </div>
        );
    }

}

class Desktop extends Component {
    render() {
        return (
            <Row style={{ padding: 20 }}>
                <Colxx xs="5" className="d-flex flex-row justify-content-left">
                    <div className="d-flex flex-column" style={{ paddingTop: 60 }}>
                        {titleLine1()}
                        {titleLine2()}
                        {text()}
                        {this.props.isLoggedIn ? "" :
                            <NavLink
                                className="btn btn-outline-semi-light btn-sm pr-4 pl-4 btn-signup-now mt-3"
                                to={`/${urls.register}`}
                                style={{
                                    color: "#FFF",
                                    width: "max-content"
                                }}
                            >
                                <IntlMessages id="สมัครเลย" />
                            </NavLink>
                        }
                    </div>
                </Colxx>
                <Colxx xs="7" className="d-flex flex-row justify-content-center">
                    <img
                        alt="app preview"
                        src={banner}
                        style={{
                            height: 400,
                            objectFit: "contain",
                            overflow: "hidden"
                        }}
                    />
                </Colxx>
            </Row>
        );
    }
}

class Tablet extends Component {
    render() {
        return (
            <Row className="d-flex flex-row justify-content-center">
                <div className="d-flex flex-column" style={{ textAlign: "center" }}>
                    {titleLine1()}
                    {titleLine2()}
                    {text()}
                    {this.props.isLoggedIn ? "" :
                        <NavLink
                            className="btn btn-outline-semi-light btn-sm pr-4 pl-4 btn-signup-now align-self-center mt-3"
                            to={`/${urls.register}`}
                            style={{
                                color: "#FFF",
                                width: "fit-content",
                                fontSize: 15
                            }}
                        >
                            <IntlMessages id="สมัครเลย" />
                        </NavLink>
                    }
                    <img
                        alt="app preview"
                        src={banner}
                        style={{
                            height: 400,
                            objectFit: "contain",
                            overflow: "hidden",
                            marginTop: 30
                        }}
                    />
                </div>
            </Row>
        );
    }
}

class Mobile extends Component {
    render() {
        return (
            <Row className="d-flex flex-row justify-content-center">
                <Colxx xs="12">
                    <div className="d-flex flex-column align-self-center">
                        {titleLine1()}
                        {titleLine2()}
                        {text()}
                        {this.props.isLoggedIn ? "" :
                            <NavLink
                                className="btn btn-outline-semi-light btn-sm pr-4 pl-4 btn-signup-now align-self-center mt-3"
                                to={`/${urls.register}`}
                                style={{
                                    color: "#FFF",
                                    width: "fit-content",
                                    fontSize: 12
                                }}
                            >
                                <IntlMessages id="สมัครเลย" />
                            </NavLink>
                        }
                        <img
                            alt="app preview"
                            src={banner}
                            style={{
                                height: 400,
                                objectFit: "contain",
                                overflow: "hidden",
                                marginTop: 30
                            }}
                        />
                    </div>
                </Colxx>
            </Row>
        );
    }
}

export default injectIntl(Banner);