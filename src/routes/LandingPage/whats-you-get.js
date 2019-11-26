import React, { Component, Fragment } from "react";
import { Row, Card, CardBody } from "reactstrap";
import { Colxx } from "Components/CustomBootstrap";
import Media from 'react-media';
import { injectIntl } from 'react-intl';

import Text from 'Components/Text';

import { desktopScreenQuery, tabletScreenQuery, mobileScreenQuery } from 'Constants/screenWidth';

const card = (img, title, detail) => {
    return (
        <CardBody className="text-center d-flex flex-column justify-content-center">
            <Row className="image">
                <Colxx xxs="12">
                    {img}
                </Colxx>
            </Row>
            <div className="text">
                <Row className="mb-2">
                    <Colxx xxs="12">
                        <Text type="title" text={title} color="#171C34" size="1.2em" className="mb-2" />
                    </Colxx>
                </Row>
                <Row>
                    <Colxx xxs="12">
                        <p className="detail-text mb-0">{detail}</p>
                    </Colxx>
                </Row>
            </div>
        </CardBody>
    );
}

const cardList = [
    card(
        <img
            alt="clock-icon"
            src="/assets/img/landing-page/clock.svg"
        />,
        "ประหยัดเวลา",
        "ลดขั้นตอนที่ ยุ่งยากทำให้การทำงาน\nเป็นระบบระเบียบ และรวดเร็วยิ่งขึ้น"
    ),
    card(
        <img
            alt="everywhere-icon"
            src="/assets/img/landing-page/place.svg"
        />,
        "อยู่ที่ไหนก็จัดการได้",
        "ระบบออนไลน์นี้ จะช่วยให้คุณเหลือเวลาทำอะไรได้อีกมากมาย ในทุกๆ ที่ เพียงแค่คุณมีสัญญาณอินเตอร์เน็ต"
    ),
    card(
        <img
            alt="graph-icon"
            src="/assets/img/landing-page/graph.svg"
        />,
        "งานมีประสิทธิภาพมากขึ้น",
        "ช่วยเก็บข้อมูลได้อย่างแม่นยำ\nไม่พลาดสักออเดอร์และ วิเคราะห์ผลได้ทันที ทำให้การจัดการเป็นเรื่องที่ง่ายขึ้น"
    )
];

const Title = (props) => {
    const margin = props.marginTop;
    let style = {};
    if (margin != null) {
        style = { marginTop: margin }
    }
    return (
        <div className="title" style={style}>
            <Text type="title" text="สิ่งที่คุณจะได้จากเรา" color="#261E49" size="1.4rem" />
        </div>
    );
}

class WhatsYouGet extends Component {
    render() {
        return (
            <div className="whats-you-get">
                <Row>
                    <Colxx xxs="12" className="d-flex flex-row justify-content-center">
                        <Media query={tabletScreenQuery}>
                            <Title marginTop={30} />
                        </Media>
                        <Media query={mobileScreenQuery}>
                            <Title marginTop={null} />
                        </Media>
                        <Media query={desktopScreenQuery}>
                            <Title marginTop={100} />
                        </Media>
                    </Colxx>
                </Row>
                <Row>
                    <Colxx xxs="12">
                        <Media query={mobileScreenQuery}>
                            <Mobile />
                        </Media>
                        <Media query={tabletScreenQuery}>
                            <Tablet />
                        </Media>
                        <Media query={desktopScreenQuery}>
                            <Desktop />
                        </Media>
                    </Colxx>
                </Row>
            </div>
        );
    }
}

class Desktop extends Component {
    render() {
        const groupedCardList = [];
        for (let i = 0; i < cardList.length; i += 3) {
            const thisRowComp = (
                <Row key={i}>
                    <Colxx xxs="4" className="d-flex flex-row justify-content-center">
                        <Card>
                            {cardList[i]}
                        </Card>
                    </Colxx>
                    {
                        i + 1 < cardList.length ?
                            <Colxx xxs="4" className="d-flex flex-row justify-content-center">
                                <Card>
                                    {cardList[i + 1]}
                                </Card>
                            </Colxx> : ""
                    }
                    {
                        i + 2 < cardList.length ?
                            <Colxx xxs="4" className="d-flex flex-row justify-content-center">
                                <Card>
                                    {cardList[i + 2]}
                                </Card>
                            </Colxx> : ""
                    }
                </Row>
            );
            groupedCardList.push(thisRowComp);
        }
        return groupedCardList.map(
            (item) => {
                return item;
            }
        );
    }
}

class Tablet extends Component {
    render() {
        const groupedCardList = [];
        for (let i = 0; i < cardList.length; i += 2) {
            const thisRowComp = (
                <Row style={{ marginTop: 20 }}>
                    <Colxx xxs="6" className="d-flex flex-row justify-content-center">
                        <Card>
                            {cardList[i]}
                        </Card>
                    </Colxx>
                    {
                        i + 1 < cardList.length ?
                            <Colxx xxs="6" className="d-flex flex-row justify-content-center">
                                <Card>
                                    {cardList[i + 1]}
                                </Card>
                            </Colxx> : ""
                    }
                </Row>
            );
            groupedCardList.push(thisRowComp);
        }
        return groupedCardList.map(
            (item) => {
                return item;
            }
        );
    }
}

class Mobile extends Component {
    render() {
        const cardStyle = { width: 250, height: 250 }
        return cardList.map(
            (item) => {
                return (
                    <Row style={{ marginTop: 20 }}>
                        <Colxx xxs="12" className="d-flex flex-row justify-content-center">
                            <Card>
                                {item}
                            </Card>
                        </Colxx>
                    </Row>
                );
            }
        );
    }
}

export default injectIntl(WhatsYouGet);