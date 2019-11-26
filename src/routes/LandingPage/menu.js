import React, { Component, Fragment } from "react";
import ReactDOM from "react-dom";
import { NavLink } from "react-router-dom";
import { Nav, NavItem } from "reactstrap";
import { Container } from "reactstrap";
import { urls } from "Constants/defaultValues";
import { landingPageMenuStyle } from 'Assets/JSX-Style/InlineStyle'
import _ from "lodash";
const buttonIfLoggedIn = "ไปทำงานกันเลย";

const navItemLabel = [
    'สิ่งที่คุณจะได้จากเรา',
    'การใช้งาน',
    'แพ็กเกจ',
    'เข้าสู่ระบบ',
    'สมัครสมาชิก'
];

export class Menu extends Component {

    openMobileMenu(e) {
        e.preventDefault();
        this.props.onMobileMenuToggle();
    }

    render() {
        const navItemLabelStyle = {
            color: "#494949",
            fontWeight: "bold"
        }
        const method = {
            handlePage: _.get(this.props, "handlePage")
        }
        return (
            <Container className="d-flex align-items-center justify-content-between">
                <Nav className="navbar-nav d-none d-lg-flex flex-row">
                    {/* Logo */}
                    <NavItem>
                        <NavLink
                            className="navbar-logo"
                            aria-hidden="true"
                            to={urls.landingPage}
                            onClick={event => {
                                method.handlePage("landingPage", "statusPage", "home", event);
                            }}
                        >
                            <span className="white" />
                            <span className="dark" />
                        </NavLink>
                    </NavItem>
                    {/* Whats you get */}
                    <NavItem>
                        <NavLink
                            to={urls.landingPage}
                            style={landingPageMenuStyle}
                            onClick={event => {
                                method.handlePage("landingPage", "statusPage", "whatsyouget", event);
                            }}
                        >
                            <span style={navItemLabelStyle}>{navItemLabel[0]}</span>
                        </NavLink>
                    </NavItem>
                    {/* Usages */}
                    <NavItem>
                        <NavLink
                            to={urls.landingPage}
                            style={landingPageMenuStyle}
                            onClick={event => {
                                method.handlePage("landingPage", "statusPage", "usages", event);
                            }}
                        >
                            <span style={navItemLabelStyle}>{navItemLabel[1]}</span>
                        </NavLink>
                    </NavItem>
                    {/* Packages */}
                    <NavItem>
                        <NavLink
                            to={urls.landingPage}
                            style={landingPageMenuStyle}
                            onClick={event => {
                                method.handlePage("landingPage", "statusPage", "packages", event);
                            }}
                        >
                            <span style={navItemLabelStyle}>{navItemLabel[2]}</span>
                        </NavLink>
                    </NavItem>
                </Nav>

                {this.props.isLoggedIn ?
                    <Nav className="navbar-nav d-none d-lg-flex flex-row pull-right">
                        <NavItem>
                            <NavLink
                                className="btn btn-outline-semi-light btn-sm pr-4 pl-4 btn-signup-now pull-right"
                                to={`/${urls.analyze}/${urls.dashboards}`}
                            >
                                {buttonIfLoggedIn}
                            </NavLink>
                        </NavItem>
                    </Nav>
                    :
                    <Nav className="navbar-nav d-none d-lg-flex flex-row pull-right">
                        <NavItem>
                            <NavLink
                                to={`/${urls.login}`}
                                style={landingPageMenuStyle}>
                                <span style={navItemLabelStyle}>{navItemLabel[3]}</span>
                            </NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink
                                className="btn btn-outline-semi-light btn-sm pr-4 pl-4 btn-signup-now pull-right"
                                to={`/${urls.register}`}
                            >
                                <span>{navItemLabel[4]}</span>
                            </NavLink>
                        </NavItem>
                    </Nav>
                }

                <div className="mobile-menu-button">
                    <span className="mobile-logo" />
                </div>
                <NavLink
                    className="mobile-menu-button"
                    to="#"
                    onClick={(event) => this.openMobileMenu(event)}
                    style={{
                        color: "#000"
                    }}
                >
                    <i className="simple-icon-menu" />
                </NavLink>
            </Container>
        );
    }

}

export class MenuMobile extends Component {

    constructor(props) {
        super(props);
        this.handleDocumentClick = this.handleDocumentClick.bind(this);
    }

    componentDidMount() {
        ["click", "touchstart"].forEach(event =>
            document.addEventListener(event, this.handleDocumentClick, true)
        );
    }

    componentWillUnmount() {
        ["click", "touchstart"].forEach(event =>
            document.removeEventListener(event, this.handleDocumentClick, true)
        );
        this.props.onUnmountingMenu()
    }

    handleDocumentClick(e) {
        const container = ReactDOM.findDOMNode(this);
        if ((container.contains(e.target) || container === e.target)) {
            return;
        }
        return this.props.onUnmountingMenu()
    }

    render() {
        const method = {
            handlePage: _.get(this.props, "handlePage")
        }
        return (
            <div className="mobile-menu">
                <div className="nav-item-head-mobile">
                    <NavLink
                        className="logo-mobile scrollTo "
                        to="#"
                        onClick={event => {
                            method.handlePage("landingPage", "statusPage", "home", event);
                        }}
                        style={{
                            display: "initial"
                        }}
                    >
                        <img
                            alt="logo"
                            src="/assets/img/landing-page/logolanding.svg"
                        />
                    </NavLink>
                </div>
                <div className="nav-item-mobile">
                    <p>
                        <NavLink to="#" onClick={event => { method.handlePage("landingPage", "statusPage", "whatsyouget", event) }}>
                            {navItemLabel[0]}
                        </NavLink>
                    </p>
                    <p>
                        <NavLink to="#" onClick={event => { method.handlePage("landingPage", "statusPage", "usages", event) }}>
                            {navItemLabel[1]}
                        </NavLink>
                    </p>
                    <p>
                        <NavLink to="#" onClick={event => { method.handlePage("landingPage", "statusPage", "packages", event) }}>
                            {navItemLabel[2]}
                        </NavLink>
                    </p>

                    <p>
                        <div className="separator"></div>
                    </p>

                    <p>
                        <NavLink
                            to="#"
                            onClick={() => method.handlePage("condition", "statusPage", "")}>
                            {"เงื่อนไขการให้บริการ"}
                        </NavLink>
                    </p>

                    <p>
                        <NavLink
                            to="#"
                            onClick={() => method.handlePage("policy", "statusPage", "")}>
                            {"นโยบายการให้บริการ"}
                        </NavLink>
                    </p>

                    <p>
                        <div className="separator"></div>
                    </p>

                    {this.props.isLoggedIn ?
                        <p>
                            <NavLink to={`/${urls.analyze}/${urls.dashboards}`}>
                                {buttonIfLoggedIn}
                            </NavLink>
                        </p>
                        :
                        <Fragment>
                            <p>
                                <NavLink to={`/${urls.login}`}>
                                    {navItemLabel[3]}
                                </NavLink>
                            </p>
                            <p>
                                <NavLink to={`/${urls.register}`}>
                                    {navItemLabel[4]}
                                </NavLink>
                            </p>
                        </Fragment>
                    }
                </div>
            </div>
        );
    }

}