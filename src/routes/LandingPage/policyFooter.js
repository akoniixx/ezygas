import React, { Component, Fragment } from 'react';
import { Row } from "reactstrap";
import { Colxx } from "Components/CustomBootstrap";
import { NavLink } from "react-router-dom";
import { Nav, NavItem } from "reactstrap";
import { copyrightText } from 'Constants/defaultValues';
import { landingPageMenuStyle } from 'Assets/JSX-Style/InlineStyle'
import _ from "lodash";

class PolicyFooter extends Component {
    render() {
        const navItemLabelStyle = {
            color: "#494949",
            fontWeight: "bold",
            fontSize: '.9rem'
        }
        const method = {
            handlePage: _.get(this.props, "handlePage")
        }
        return (
            <Nav className="navbar-nav d-flex flex-row w-100 justify-content-between">
                <div
                    className="d-flex flex-row">
                    <NavItem className="mr-3">
                        <NavLink
                            to="#"
                            style={navItemLabelStyle}
                            onClick={() => {
                                method.handlePage("condition", "statusPage", "home");
                                window.scrollTo({ top: 0, behavior: 'smooth' });
                            }} >
                            <span style={navItemLabelStyle}>{"เงื่อนไขการให้บริการ"}</span>
                        </NavLink>
                    </NavItem>
                    <span className="mr-3">•</span>
                    <NavItem>
                        <NavLink
                            to="#"
                            style={landingPageMenuStyle}
                            onClick={() => {
                                method.handlePage("policy", "statusPage", "home");
                                window.scrollTo({ top: 0, behavior: 'smooth' });
                            }}>
                            <span style={navItemLabelStyle}>{"นโยบายการให้บริการ"}</span>
                        </NavLink>
                    </NavItem>
                </div>
                <span style={{
                    fontWeight: 'bold',
                    color: 'rgb(73, 73, 73)'
                }}>{copyrightText}</span>
            </Nav>
        );
    }
}
export default PolicyFooter;