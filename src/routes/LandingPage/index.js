import React, { Component, Fragment } from 'react';
import { Container, Row } from "reactstrap";
import { NavLink } from "react-router-dom";
import { injectIntl } from 'react-intl';

import Headroom from 'react-headroom';
import scrollToComponent from 'react-scroll-to-component';

import { connect } from "react-redux";
import { landingPageMobileMenuToggle, landingPageMobileMenuClose } from "Redux/actions";

import Media from 'react-media';
import { nonMobileScreenQuery } from 'Constants/screenWidth';
import Loadable from 'react-loadable';

//Child Components
import { MenuMobile, Menu } from './menu';
import PolicyFooter from './policyFooter';
import Condition from './condition'
import Policy from './policy';
const Banner = Loadable({
    loader: () => import('./banner'),
    loading: () => null
});
const WhatsYouGet = Loadable({
    loader: () => import('./whats-you-get'),
    loading: () => null
});
const Usages = Loadable({
    loader: () => import('./usages'),
    loading: () => null
});
const Trial = Loadable({
    loader: () => import('./trial'),
    loading: () => null
});
const LPFooter = Loadable({
    loader: () => import('./footer'),
    loading: () => null
});




const mapStateToProps = ({ landingPage }) => {
    const { isMobileMenuOpen } = landingPage;
    return { isMobileMenuOpen };
}

class LandingPage extends Component {

    constructor(props) {
        super(props);
        this.onMenuClick = this.onMenuClick.bind(this);
        this.handlePage = this.handlePage.bind(this);
        this.state = {
            statusPage: "landingPage"
        }
    }

    onMobileMenuToggle() {
        this.props.landingPageMobileMenuToggle()
    }

    onUnmountingMobileMenu() {
        this.props.landingPageMobileMenuClose()
        return true;
    }

    onMenuClick(ref, event) {
        // event.preventDefault();
        let scroller;
        if (ref != "") {
            if (ref !== "home") {
                scroller = scrollToComponent(this[ref], { align: 'top', offset: 60 });
                scroller.on('end', () => {
                    this.headroom.unpin();
                    this.props.landingPageMobileMenuClose();
                });
            } else {
                scrollToComponent(this[ref], { align: 'top' });
            }
        }
    }

    handlePage(page, index, ref) {
        let state = {}
        state[index] = page
        this.setState({
            statusPage: state[index]
        }, () => { this.onMenuClick(ref) })
    }

    render() {
        const { statusPage } = this.state
        return (
            <Fragment>
                <div className={this.props.isMobileMenuOpen ? "landing-page show-mobile-menu" : "landing-page"}>
                    <MenuMobile onClick={this.onMenuClick} onUnmountingMenu={() => this.onUnmountingMobileMenu()} isLoggedIn={this.props.isLoggedIn}
                        handlePage={this.handlePage}
                    ></MenuMobile>
                    <div className="main-container">

                        <Headroom className="landing-page-nav" ref={(a) => { this.headroom = a; }}>
                            <Menu onClick={this.onMenuClick} onMobileMenuToggle={() => this.onMobileMenuToggle()} isLoggedIn={this.props.isLoggedIn}
                                handlePage={this.handlePage}
                            ></Menu>
                        </Headroom>
                        <div className="content-container">
                            {
                                statusPage === "landingPage" ?
                                    <Fragment>
                                        <div className="section home" ref={(x) => { this.home = x }}>
                                            <Container>
                                                <Banner isLoggedIn={this.props.isLoggedIn} />
                                                <WhatsYouGet ref={(x) => { this.whatsyouget = x }} />
                                                <Row>
                                                    <NavLink id="homeCircleButton"
                                                        className="btn btn-circle btn-outline-semi-light hero-circle-button"
                                                        aria-hidden="true" to="#"
                                                        onClick={(event) => this.onMenuClick("features", event)}>
                                                        <i className="simple-icon-arrow-down"></i>
                                                    </NavLink>
                                                </Row>
                                            </Container>
                                        </div>
                                        <div className="content-container" ref={(x) => { this.usages = x }}>
                                            <Container>
                                                <Usages />
                                            </Container>
                                        </div>
                                        <div className="section">
                                            <Container>
                                                <Trial isLoggedIn={this.props.isLoggedIn} ref={(x) => { this.packages = x }} />
                                            </Container>
                                        </div>
                                    </Fragment> :
                                    statusPage === "condition" ?
                                        <Fragment>
                                            <Condition />
                                        </Fragment>
                                        :
                                        <Fragment>
                                            <Policy />
                                        </Fragment>
                            }
                            <div className="section">
                                <Container className="mb-5 pb-2">
                                    <LPFooter ref={(x) => { this.footer = x }} />
                                </Container>
                                <Media query={nonMobileScreenQuery}>
                                    <Container>
                                        <PolicyFooter
                                            handlePage={this.handlePage} />
                                    </Container>
                                </Media>
                            </div>
                        </div>
                    </div>
                </div>
            </Fragment>
        );
    }
}

LandingPage.defaultProps = {
    isLoggedIn: false
}

export default connect(mapStateToProps, { landingPageMobileMenuToggle, landingPageMobileMenuClose })(injectIntl(LandingPage))