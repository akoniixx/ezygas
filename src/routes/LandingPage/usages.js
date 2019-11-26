import React, { Component, Fragment } from 'react';
import { Row } from "reactstrap";
import { Colxx } from "Components/CustomBootstrap";
import Media from "react-media";
import ReactSiemaCarousel from "Components/ReactSiema/ReactSiemaCarousel";
import { injectIntl } from 'react-intl';
import Text from 'Components/Text';
import { mobileScreenQuery, desktopScreenQuery, tabletScreenQuery } from 'Constants/screenWidth';


const carouselImages = [
    "slide1",
    "slide2",
    "slide3"
];

const labels = [
    "ตรวจสอบยอดการสั่งซื้อ และคำนวณรายได้ทั้งหมด",
    "ไม่ต้องเช็คสต๊อกให้เหนื่อย ด้วยระบบตัดสต๊อคอัตโนมัติ",
    "จัดการออเดอร์ได้ตามต้องการ ปริ้นท์บิลส่งได้โดยไม่ต้องจด"
];

const carouselItem = carouselImages.map(
    (name, i) => {
        return (
            <div key={i}>
                <Row>
                    <Colxx xxs="12" className="d-flex flex-row justify-content-center">
                        <h5 className="label">{labels[i]}</h5>
                    </Colxx>
                </Row>
                <div className="d-flex flex-row justify-content-center">
                    <img
                        alt={`${name}`}
                        src={`/assets/img/landing-page/${name}.svg`}
                    />
                </div>
            </div>
        );
    }
);

const carousel = (
    <Fragment>
        <Row className="mb-2">
            <Colxx xxs="12" className="d-flex flex-row justify-content-center">
                <Text type="title" text="การใช้งานที่ตอบโจทย์" color="#261E49" size="1.4rem" />
            </Colxx>
        </Row>
        <Row>
            <Colxx xxs="12" className="mb-5 home-carousel">
                <ReactSiemaCarousel
                    perPage={{
                        0: 1
                    }}
                    controls={true}
                    loop={true}
                    auto={true}
                >
                    {carouselItem}
                </ReactSiemaCarousel>
            </Colxx>
        </Row>
    </Fragment>
);

class Usages extends Component {
    render() {
        return (
            <div className="usages">
                <Media query={desktopScreenQuery}>
                    <div style={{ paddingTop: 100 }}>
                        {carousel}
                    </div>
                </Media>
                <Media query={tabletScreenQuery}>
                    {carousel}
                </Media>
                <Media query={mobileScreenQuery}>
                    {carousel}
                </Media>
            </div>
        );
    }
}

export default injectIntl(Usages);