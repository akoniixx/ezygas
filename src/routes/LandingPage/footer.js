import React, { Fragment, Component } from "react";
import { Row } from "reactstrap";
import { Colxx } from "Components/CustomBootstrap";
import Media from 'react-media';
import { mobileScreenQuery, tabletScreenQuery, desktopScreenQuery } from 'Constants/screenWidth';
import { copyrightText } from 'Constants/defaultValues';

const img = (
    <img
        alt="logo"
        src="/assets/img/landing-page/logolanding.svg"
        style={{
            objectFit: "contain",
            maxWidth: "100%",
            maxHeight: 50,
            marginBottom: 20,
            marginRight: 20
        }}
    />
);

const address1 = "99/96 ถนนปรีชาสุข ตำบลห้วยจรเข้";
const address2 = "อำเภอเมืองนครปฐม จังหวัดนครปฐม";
const contact = "ติดต่อ 097-252-4614";

class LPFooter extends Component {
    render() {
        return (
            <div className="lp-footer">
                <Media query={desktopScreenQuery}>
                    <Desktop />
                </Media>
                <Media query={tabletScreenQuery}>
                    <Tablet />
                </Media>
                <Media query={mobileScreenQuery}>
                    <Mobile />
                </Media>
            </div>
        );
    }
}

class Desktop extends Component {
    render() {
        return (
            <Fragment>
                <Row>
                    <Colxx xxs="12" className="d-flex flex-row justify-content-center">
                        {img}
                        <div>
                            <p className="contact-d">
                                {`${address1} ${address2}`}<br />{contact}
                            </p>
                        </div>
                    </Colxx>
                </Row>
            </Fragment>
        );
    }
}

class Tablet extends Component {
    render() {
        return (
            <Fragment>
                <Row>
                    <Colxx xxs="12" className="d-flex flex-row justify-content-center">
                        {img}
                        <div>
                            <p className="contact-t">
                                {`${address1} ${address2}`}<br />{contact}
                            </p>
                        </div>
                    </Colxx>
                </Row>
            </Fragment>
        );
    }
}

class Mobile extends Component {
    render() {
        return (
            <Fragment>
                <Row>
                    <Colxx xxs="12" className="d-flex flex-row justify-content-center">
                        {img}
                    </Colxx>
                </Row>
                <Row>
                    <Colxx xxs="12" className="d-flex flex-row justify-content-center">
                        <p className="contact-m">
                            {address1}<br />{address2}<br />{contact}<br />{copyrightText}
                        </p>
                    </Colxx>
                </Row>
            </Fragment>
        );
    }
}

export default LPFooter;