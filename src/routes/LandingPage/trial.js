import React, { Component, Fragment } from 'react';
import { Row, Card, CardBody, CardTitle } from "reactstrap";
import { NavLink } from 'react-router-dom';
import { Colxx } from "Components/CustomBootstrap";
import Media from 'react-media';
import IntlMessages from "Util/IntlMessages";
import { injectIntl } from 'react-intl';

import { desktopScreenQuery, mobileScreenQuery, tabletScreenQuery } from 'Constants/screenWidth';
import { urls } from "Constants/defaultValues";

const proComponent = (text) => {
    return (
        <Row className="mb-3">
            <Colxx xxs="12" className="d-flex flex-row">
                <div className="d-flex flex-column justify-content-center">
                    <img
                        className="icon"
                        alt="check"
                        src="/assets/img/landing-page/checkbox.svg" />
                </div>
                <div className="d-flex flex-column pro">
                    <b>{text}</b>
                </div>
            </Colxx>
        </Row>
    );
}

const Price = () => {
    return (
        <Row style={{ marginTop: 10 }}>
            <Colxx xxs="12" className="d-flex justify-content-end">
                <div className="d-flex flex-column">
                    <div className="d-flex flex-row">
                        <b className="price1">1000</b>
                        <b className="price1"><small>บาท</small></b>
                    </div>
                </div>
                <div className="d-flex flex-column">
                    <small className="price2">/ เดือน</small>
                </div>
            </Colxx>
        </Row>
    );
}

const cardTitle = "Pro ทดลองใช้ 2 เดือน";
const text = [
    "Stock ของ (จัดการถังแก๊ส, ช่วยให้มีความเป็น ระเบียบมากขึ้น รวดเร็วขึ้น)",
    "จัดการ Order (ช่วยจัดการรายการสั่งซื้อของคุณ เป็นระเบียบมากขึ้น รวดเร็วขึ้น)",
    "เก็บข้อมูลลูกค้า (ทำให้การส่งครั้งต่อไปรวดเร็วขึ้น)",
    "ออก Report ในรูปแบบต่างๆ"
];

class Trial extends Component {
    render() {
        return (
            <div className="trial">
                <Row>
                    <Colxx xxs="12" className="d-flex flex-row justify-content-center">
                        <h3 className="title">ทดลองใช้งานฟรี 2 เดือน</h3>
                    </Colxx>
                </Row>
                <Row>
                    <Colxx xxs="12" className="d-flex flex-row justify-content-center">
                        <h5 className="sub-title mb-3">มาทำให้การจัดการร้านคุณเป็นเรื่อง ง่ายๆ ครบ จบ ในเว็บเดียวกันเลย</h5>
                    </Colxx>
                </Row>
                <Row>
                    <Media query={desktopScreenQuery}>
                        <Desktop />
                    </Media>
                    <Media query={tabletScreenQuery}>
                        <Tablet />
                    </Media>
                    <Media query={mobileScreenQuery}>
                        <Tablet />
                    </Media>
                </Row>
                {this.props.isLoggedIn ? "" :
                    <Row>
                        <Colxx xxs="12" className="d-flex flex-row justify-content-center">
                            <NavLink
                                className="btn btn-outline-semi-light btn-sm pr-4 pl-4 btn-signup-now"
                                to={`/${urls.register}`}
                                style={{
                                    color: "#FFF",
                                    width: "fit-content",
                                    marginTop: 10
                                }}
                            >
                                <IntlMessages id="สมัครเลย" />
                            </NavLink>
                        </Colxx>
                    </Row>
                }
            </div>
        );
    }
}

class Desktop extends Component {
    render() {
        return (
            <Colxx xxs="12" className="d-flex justify-content-center">
                <div className="desktop-card">
                    <img
                        className="trial-image"
                        alt="trial"
                        src="/assets/img/landing-page/package.svg" />
                    <div className="trial-detail">
                        <h5 className="title">{cardTitle}</h5>
                        {text.map(
                            (text, i) => (
                                <Fragment key={i}>
                                    {proComponent(text)}
                                </Fragment>
                            )
                        )}
                        <Price />
                    </div>
                </div>
            </Colxx>
        );
    }
}

class Tablet extends Component {
    render() {
        return (
            <Colxx
                xxs="12"
                className="d-flex flex-row justify-content-center"
            >
                <Card className="w-100">
                    <CardBody>
                        <CardTitle className="title">
                            <b>{cardTitle}</b>
                        </CardTitle>
                        {text.map(
                            (text, i) => (
                                <Fragment key={i}>
                                    {proComponent(text)}
                                </Fragment>
                            )
                        )}
                        <Price />
                    </CardBody>
                </Card>
            </Colxx>
        );
    }
}

export default injectIntl(Trial);