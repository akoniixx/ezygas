import React, { Component, Fragment } from "react";
import { Row } from "reactstrap";
import { NavLink } from "react-router-dom";

import { Colxx } from "Components/CustomBootstrap";

import { connect } from "react-redux";
import { registerUser } from "Redux/actions";

import Text from 'Components/Text';

import Media from 'react-media';
import { desktopScreenQuery, tabletScreenQuery, mobileScreenQuery } from 'Constants/screenWidth';
import { urls } from 'Constants/defaultValues';
import Button from "Components/Button";

const buttonText = "กลับสู่หน้าหลัก";
const head1 = "พนักงานจะติดต่อกลับไปเพื่อยืนยันการเปิดใช้ระบบนะคะ";
const head2 = "ขอบคุณทุกท่านที่ไว้วางใจ Ezygas ค่ะ";

class RegisterLayout extends Component {

  componentDidMount() {
    document.body.classList.add("background");
  }
  componentWillUnmount() {
    document.body.classList.remove("background");
  }

  render() {
    return (
      <Fragment>
        <div className="fixed-background2" />
        <main>
          <div className="container">
            <Media query={desktopScreenQuery}>
              <Desktop />
            </Media>
            <Media query={{ minWidth: 571, maxWidth: 992 }}>
              <Tablet />
            </Media>
            <Media query={{ maxWidth: 570 }}>
              <Mobile />
            </Media>
          </div>
        </main>
      </Fragment >
    );
  }
}

class Desktop extends Component {
  render() {
    const fontSize = '1.75rem';
    return (
      <Row className="h-100">
        <Colxx xxs="12" className="d-flex flex-column justify-content-center align-content-center">
          <NavLink to={`/`} className="white text-center">
            <span className="logo-single2" style={{ backgroundSize: "contain" }} />
          </NavLink>
          <div className="text-center mb-3">
            <Text type="normal" text={head1} size={fontSize} />
          </div>
          <div className="text-center mb-4">
            <Text type="title" text={head2} size={fontSize} />
          </div>
          <div className="landing-page text-center" style={{ backgroundImage: 'none' }}>
            <NavLink
              className="btn btn-outline-semi-light btn-sm pr-4 pl-4 btn-signup-now align-self-center"
              to={urls.landingPage}
              style={{
                color: 'white',
                width: 'fit-content',
                fontSize: 15
              }} >
              {buttonText}
            </NavLink>
            {/* <Button
              type="register"
              text={buttonText}
              to={urls.landingPage} /> */}
          </div>
        </Colxx>
      </Row>
    );
  }
}

class Tablet extends Component {
  render() {
    const fontSize = '1.5rem';
    return (
      <Row className="h-100">
        <Colxx xxs="12" md="12" className="mx-auto my-auto">
          <div className="form-side">
            <Row>
              <Colxx className="d-flex flex-row justify-content-center">
                <NavLink to={`/`} className="white">
                  <span className="logo-single2" style={{ backgroundSize: "contain" }} />
                </NavLink>
              </Colxx>
            </Row>
            <Row className="d-flex flex-row justify-content-center mb-3">
              <Colxx xxs="12" className="text-center">
                <Text type="normal" text={head1} size={fontSize} />
              </Colxx>
            </Row>
            <Row className="d-flex flex-row justify-content-center mb-4">
              <Colxx xxs="12" className="text-center">
                <Text type="title" text={head2} size={fontSize} />
              </Colxx>
            </Row>
            <div className="landing-page text-center" style={{ backgroundImage: 'none' }}>
              <NavLink
                className="btn btn-outline-semi-light btn-sm pr-4 pl-4 btn-signup-now align-self-center"
                to={urls.landingPage}
                style={{
                  color: 'white',
                  width: 'fit-content',
                  fontSize: 15
                }} >
                {buttonText}
              </NavLink>
              {/* <Button
              type="register"
              text={buttonText}
              to={urls.landingPage} /> */}
            </div>
          </div>
        </Colxx>
      </Row>
    );
  }
}

class Mobile extends Component {
  render() {
    const fontSize = "1.1rem";
    return (
      <Row className="h-100">
        <Colxx xxs="12" md="12" className="mx-auto my-auto">
          <div className="form-side">
            <Row>
              <Colxx className="d-flex flex-row justify-content-center">
                <NavLink to={`/`} className="white">
                  <span className="logo-single2"
                    style={{
                      width: 150,
                      height: 100,
                      backgroundSize: "contain"
                    }}
                  />
                </NavLink>
              </Colxx>
            </Row>
            <Row className="d-flex flex-row justify-content-center mb-3">
              <Colxx xxs="12" className="text-center">
                <Text type="normal" text={head1} size={fontSize} />
              </Colxx>
            </Row>
            <Row className="d-flex flex-row justify-content-center mb-4">
              <Colxx xxs="12" className="text-center">
                <Text type="title" text={head2} size={fontSize} />
              </Colxx>
            </Row>
            <div className="landing-page text-center" style={{ backgroundImage: 'none' }}>
              <NavLink
                className="btn btn-outline-semi-light btn-sm pr-4 pl-4 btn-signup-now align-self-center"
                to={urls.landingPage}
                style={{
                  color: 'white',
                  width: 'fit-content',
                  fontSize: 15
                }} >
                {buttonText}
              </NavLink>
              {/* <Button
              type="register"
              text={buttonText}
              to={urls.landingPage} /> */}
            </div>
          </div>
        </Colxx>
      </Row>
    );
  }
}

const mapStateToProps = ({ authUser }) => {
  const { user, loading } = authUser;
  return { user, loading };
};

export default connect(
  mapStateToProps,
  {
    registerUser
  }
)(RegisterLayout);
