import React, { Component, Fragment } from "react";
import { injectIntl } from 'react-intl';
import { UncontrolledDropdown, DropdownItem, DropdownToggle, DropdownMenu, } from "reactstrap";
import IntlMessages from "Util/IntlMessages";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";
import {
  setContainerClassnames, clickOnMobileMenu,
  logoutUser, changeLocale,
  getVendor, getUser, changeNotification,
  getPayment, getNotification,
  postFixCost
} from "Redux/actions";
import { menuHiddenBreakpoint, searchPath } from "Constants/defaultValues";
import Media from 'react-media';
import moment from 'moment';
import * as screenWidth from 'Constants/screenWidth';
import _ from "lodash";
import { Avatar } from "react-avatar";
import { urls } from 'Constants/defaultValues';
import Notification from 'Components/notification';
import Dropdown from 'Components/Dropdown';
import FixCostModal from 'Components/Modal/fixCostModal';
import { dateTimeForm } from 'Util/Utils';

class TopNav extends Component {
  constructor(props) {
    super(props);
    this.calFormatTime = this.calFormatTime.bind(this);
    this.calTimePaymentNotification = this.calTimePaymentNotification.bind(this);
    this.changeNotificationState = this.changeNotificationState.bind(this);
    this.confirmFixCost = this.confirmFixCost.bind(this);
    this.menuButtonClick = this.menuButtonClick.bind(this);
    this.mobileMenuButtonClick = this.mobileMenuButtonClick.bind(this);
    this.search = this.search.bind(this);
    this.handleDocumentClickSearch = this.handleDocumentClickSearch.bind(this);
    this.addEventsSearch = this.addEventsSearch.bind(this);
    this.removeEventsSearch = this.removeEventsSearch.bind(this);
    this.toProfile = this.toProfile.bind(this);
    this.dataVendor = this.dataVendor.bind(this);
    this.dataUser = this.dataUser.bind(this);
    this.paymentState = this.paymentState.bind(this);
    this.toggleFixCostModal = this.toggleFixCostModal.bind(this);
    this.state = {
      isInFullScreen: false,
      fixcostModalOpen: false,
      searchKeyword: "",
      vendors: [],
      user: [],
      checkNotification: "",
      expiryDateTime: ""
    };
  }

  calFormatTime(dateTime) {
    let date = ""
    let time = ""
    let timeFormat = ""
    if (dateTime != null) {
      timeFormat = dateTime.split("T")
      date = _.get(timeFormat, "[0]", "")
      time = _.get(timeFormat, "[1]", "").substring(0, 8)
    }
    return `${date}, ${time}`
  }

  calTimePaymentNotification() {
    const { expiryDateTime } = this.state
    let startDate = moment(this.calFormatTime(moment().format()));
    let timeEnd = moment(this.calFormatTime(expiryDateTime));
    const diff = timeEnd.diff(startDate);
    const diffDuration = moment.duration(diff);
    if (diffDuration.days() >= 8 || diffDuration.months() > 0 || diffDuration.years() > 0) {
      this.setState({
        checkNotification: false
      }, () => this.props.changeNotification(false))
    } else if (diffDuration.days() < 8) {
      this.setState({
        checkNotification: true
      }, () => this.props.changeNotification(true))
    }
  }

  changeNotificationState(e, notification) {
    e.preventDefault
    this.props.changeNotification(notification);
  }

  componentWillReceiveProps(nextProps) {
    const { checkNotification, expiryDateTime } = this.state
    if (checkNotification === "" && expiryDateTime === "") {
      this.setState({
        expiryDateTime: _.get(nextProps.vendor, "list[0].premium_date_left", "")
      }, () => this.calTimePaymentNotification())
    }
  }

  componentDidMount() {
    this.dataVendor();
    this.dataUser();
    this.props.getPayment();
  }

  confirmFixCost(data) {
    let date = dateTimeForm(data.date)
    let time = dateTimeForm(data.time)
    let item = {
      name: _.get(data, "title", ""),
      amount: _.get(data, "cost"),
      date_time: date.split("T")[0]+"T"+time.split("T")[1]
    }
    this.props.postFixCost(item)
  }

  dataVendor() {
    this.props.getVendor();
  }

  dataUser() {
    this.props.getUser();
  }

  toProfile() {
    let path = '/' + urls.users + '/' + urls.store;
    this.props.history.push(path);
  }

  paymentState(e) {
    let path = '/' + urls.payment + '/' + urls.package;
    this.props.history.push(path);
    this.menuButtonClick(e, 1, "menu-default main-hidden sub-hidden")
  }

  isInFullScreen = () => {
    return (
      (document.fullscreenElement && document.fullscreenElement !== null) ||
      (document.webkitFullscreenElement &&
        document.webkitFullscreenElement !== null) ||
      (document.mozFullScreenElement &&
        document.mozFullScreenElement !== null) ||
      (document.msFullscreenElement && document.msFullscreenElement !== null)
    );
  };
  handleSearchIconClick = e => {
    if (window.innerWidth < menuHiddenBreakpoint) {
      let elem = e.target;
      if (!e.target.classList.contains("search")) {
        if (e.target.parentElement.classList.contains("search")) {
          elem = e.target.parentElement;
        } else if (
          e.target.parentElement.parentElement.classList.contains("search")
        ) {
          elem = e.target.parentElement.parentElement;
        }
      }

      if (elem.classList.contains("mobile-view")) {
        this.search();
        elem.classList.remove("mobile-view");
        this.removeEventsSearch();
      } else {
        elem.classList.add("mobile-view");
        this.addEventsSearch();
      }
    } else {
      this.search();
    }
  };
  addEventsSearch() {
    document.addEventListener("click", this.handleDocumentClickSearch, true);
  }
  removeEventsSearch() {
    document.removeEventListener("click", this.handleDocumentClickSearch, true);
  }

  handleDocumentClickSearch(e) {
    let isSearchClick = false;
    if (
      e.target &&
      e.target.classList &&
      (e.target.classList.contains("navbar") ||
        e.target.classList.contains("simple-icon-magnifier"))
    ) {
      isSearchClick = true;
      if (e.target.classList.contains("simple-icon-magnifier")) {
        this.search();
      }
    } else if (
      e.target.parentElement &&
      e.target.parentElement.classList &&
      e.target.parentElement.classList.contains("search")
    ) {
      isSearchClick = true;
    }

    if (!isSearchClick) {
      const input = document.querySelector(".mobile-view");
      if (input && input.classList) input.classList.remove("mobile-view");
      this.removeEventsSearch();
      this.setState({
        searchKeyword: ""
      });
    }
  }
  handleSearchInputChange(e) {
    this.setState({
      searchKeyword: e.target.value
    });
  }
  handleSearchInputKeyPress(e) {
    if (e.key === "Enter") {
      this.search();
    }
  }

  search() {
    this.props.history.push(searchPath + "/" + this.state.searchKeyword);
    this.setState({
      searchKeyword: ""
    });
  }

  toggleFullScreen = () => {
    const isInFullScreen = this.isInFullScreen();

    var docElm = document.documentElement;
    if (!isInFullScreen) {
      if (docElm.requestFullscreen) {
        docElm.requestFullscreen();
      } else if (docElm.mozRequestFullScreen) {
        docElm.mozRequestFullScreen();
      } else if (docElm.webkitRequestFullScreen) {
        docElm.webkitRequestFullScreen();
      } else if (docElm.msRequestFullscreen) {
        docElm.msRequestFullscreen();
      }
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
      } else if (document.mozCancelFullScreen) {
        document.mozCancelFullScreen();
      } else if (document.msExitFullscreen) {
        document.msExitFullscreen();
      }
    }
    this.setState({
      isInFullScreen: !isInFullScreen
    });
  };

  handleLogout = () => {
    this.props.logoutUser(this.props.history);
  };

  menuButtonClick(e, menuClickCount, containerClassnames) {
    e.preventDefault();

    setTimeout(() => {
      var event = document.createEvent("HTMLEvents");
      event.initEvent("resize", false, false);
      window.dispatchEvent(event);
    }, 350);
    this.props.setContainerClassnames(++menuClickCount, containerClassnames);
  }

  mobileMenuButtonClick(e, containerClassnames) {
    e.preventDefault();
    this.props.clickOnMobileMenu(containerClassnames);
  }

  toggleFixCostModal() {
    let { fixcostModalOpen } = this.state
    this.setState({ fixcostModalOpen: !fixcostModalOpen })
  }

  render() {
    let { vendors, user } = this.state
    let notification = _.get(this.props, "notificationPayment")
    const statusPayment = _.get(this.props, "paymentStatus")
    vendors = _.get(this.props, "vendor")
    user = _.get(this.props, "user")
    const expiryDate = _.get(vendors, "list[0].premium_date_left", "")
    let { containerClassnames, menuClickCount, locale } = this.props;
    const { messages } = this.props.intl;
    const avatarName = (function (v) {
      if (v == undefined || v.length == 0) return "E";
      return v[0].name_en;
    })(vendors.list);
    const fixCost = "เพิ่มรายจ่าย"
    const onSelected = () => { this.toggleFixCostModal() }
    const listDropdown =
      [
        { name: "เพิ่มรายจ่าย", onSelected: () => onSelected() },
        // { name: "เพิ่มรายรับ", onSelected: () => onSelected() },

      ]
    return (
      <Fragment>
        <div className="fixed-top">
          {notification ? <Notification
            expiryDate={expiryDate}
            statusPayment={statusPayment}
            paymentState={this.paymentState}
            changeNotification={this.changeNotificationState} /> : ""}
          <nav className="navbar">
            <NavLink
              to="#"
              className="menu-button d-none d-md-block"
              onClick={e =>
                this.menuButtonClick(e, menuClickCount, containerClassnames)
              }
            >
              <svg
                className="main"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 9 17"
              >
                <rect x="0.48" y="0.5" width="7" height="1" />
                <rect x="0.48" y="7.5" width="7" height="1" />
                <rect x="0.48" y="15.5" width="7" height="1" />
              </svg>
              <svg
                className="sub"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 18 17"
              >
                <rect x="1.56" y="0.5" width="16" height="1" />
                <rect x="1.56" y="7.5" width="16" height="1" />
                <rect x="1.56" y="15.5" width="16" height="1" />
              </svg>
            </NavLink>
            <NavLink
              to="#"
              className="menu-button-mobile d-xs-block d-sm-block d-md-none"
              onClick={e => this.mobileMenuButtonClick(e, containerClassnames)}
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 26 17">
                <rect x="0.5" y="0.5" width="25" height="1" />
                <rect x="0.5" y="7.5" width="25" height="1" />
                <rect x="0.5" y="15.5" width="25" height="1" />
              </svg>
            </NavLink>
            <a className="navbar-logo" aria-hidden="true" href="/"></a>
            <div className="ml-auto">
              <div className="header-icons d-inline-block align-middle">
                <div className="position-relative d-none d-sm-inline-block">
                </div>
                <div className="position-relative d-inline-block">
                </div>
                {/* fix cost */}
                <Media query={screenWidth.mobileScreenQuery}>
                  {matches =>
                    matches ? (
                      <a></a>
                    ) : (
                        <div className="user d-inline-block">
                          <Dropdown
                            // key={i}
                            type={"primary"}
                            currentSelected={fixCost}
                            list={listDropdown}
                          />
                        </div>
                      )
                  }
                </Media>
                <FixCostModal
                  modalOpen={this.state.fixcostModalOpen}
                  toggleFixCostModal={this.toggleFixCostModal}
                  confirmFixCost={this.confirmFixCost}
                />
                {/* <button
                  className="header-icon btn btn-empty d-none d-sm-inline-block"
                  type="button"
                  id="fullScreenButton"
                  onClick={this.toggleFullScreen}
                >
                  {this.state.isInFullScreen ? (
                    <i className="simple-icon-size-actual d-block" />
                  ) : (
                      <i className="simple-icon-size-fullscreen d-block" />
                    )}
                </button> */}
              </div>
              <Media query={screenWidth.mobileScreenQuery}>
                {matches =>
                  matches ? (
                    <a></a>
                  ) : (
                      <a>{avatarName}</a>
                    )
                }
              </Media>
              <div className="user d-inline-block">
                <UncontrolledDropdown className="dropdown-menu-right">
                  <DropdownToggle className="p-0" color="empty">
                    <span className="name mr-1">

                    </span>
                    <span>
                      {user.loading === true ?
                        <Avatar name={avatarName} size="40px" round={true} />
                        :
                        ""
                      }
                    </span>
                  </DropdownToggle>
                  <DropdownMenu className="mt-0" style={{borderRadius: "10.5px"}} right>
                    <DropdownItem onClick={this.toProfile} ><IntlMessages id="การจัดการร้าน" /></DropdownItem>
                    <DropdownItem divider />
                    <DropdownItem onClick={this.paymentState}><IntlMessages id="แพ็คเกจ" /></DropdownItem>
                    <Media query={screenWidth.mobileScreenQuery}>
                      {matches =>
                        matches ? (
                          <Fragment>
                            <DropdownItem divider />
                            <DropdownItem onClick={() => this.toggleFixCostModal()}><IntlMessages id={fixCost} /></DropdownItem>
                          </Fragment>
                        ) : (
                            <a></a>
                          )
                      }
                    </Media>
                    <DropdownItem divider />
                    <DropdownItem onClick={() => this.handleLogout()}><IntlMessages id="ออกจากระบบ" /></DropdownItem>
                  </DropdownMenu>
                </UncontrolledDropdown>
              </div>
            </div>
          </nav>
        </div>
      </Fragment>
    );
  }
}

const mapStateToProps = ({ menu, settings, vendor, user, payment, fixCost }) => {
  const { containerClassnames, menuClickCount } = menu;
  const { locale } = settings;
  const { list } = _.get(payment, "PAYMENT")
  const paymentStatus = _.get(list, "status", "")
  return { containerClassnames, menuClickCount, locale, vendor, user, paymentStatus, fixCost };
};
export default injectIntl(connect(
  mapStateToProps,
  {
    setContainerClassnames, clickOnMobileMenu, logoutUser,
    changeLocale, getVendor, getUser,
    changeNotification, getPayment, getNotification,
    postFixCost
  }
)(TopNav));
