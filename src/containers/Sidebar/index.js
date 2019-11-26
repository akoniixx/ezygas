import React, { Component } from "react";
import ReactDOM from "react-dom";
import IntlMessages from "Util/IntlMessages";
import { Nav, NavItem } from "reactstrap";
import { NavLink } from "react-router-dom";
import classnames from "classnames";
import PerfectScrollbar from "react-perfect-scrollbar";
import { withRouter } from "react-router-dom";
import _ from "lodash";
import { connect } from "react-redux";
import {
  setContainerClassnames,
  addContainerClassname,
  changeDefaultClassnames,
  getUser
} from "Redux/actions";

class Sidebar extends Component {
  constructor(props) {
    super(props);
    this.handleWindowResize = this.handleWindowResize.bind(this);
    this.addEvents = this.addEvents.bind(this);
    this.removeEvents = this.removeEvents.bind(this);
    this.handleDocumentClick = this.handleDocumentClick.bind(this);
    this.toggle = this.toggle.bind(this);
    this.handleProps = this.handleProps.bind(this);
    this.getContainer = this.getContainer.bind(this);
    this.getMenuClassesForResize = this.getMenuClassesForResize.bind(this);
    this.setSelectedLiActive = this.setSelectedLiActive.bind(this);

    this.state = {
      selectedParentMenu: "",
      viewingParentMenu: "",
    };
  }

  handleWindowResize(event) {
    if (event && !event.isTrusted) {
      return;
    }
    const { containerClassnames } = this.props;
    let nextClasses = this.getMenuClassesForResize(containerClassnames);
    this.props.setContainerClassnames(0, nextClasses.join(" "));
  }

  handleDocumentClick(e) {
    const container = this.getContainer();
    let isMenuClick = false;
    if (
      e.target &&
      e.target.classList &&
      (e.target.classList.contains("menu-button") ||
        e.target.classList.contains("menu-button-mobile"))
    ) {
      isMenuClick = true;
    } else if (
      e.target.parentElement &&
      e.target.parentElement.classList &&
      (e.target.parentElement.classList.contains("menu-button") ||
        e.target.parentElement.classList.contains("menu-button-mobile"))
    ) {
      isMenuClick = true;
    } else if (
      e.target.parentElement &&
      e.target.parentElement.parentElement &&
      e.target.parentElement.parentElement.classList &&
      (e.target.parentElement.parentElement.classList.contains("menu-button") ||
        e.target.parentElement.parentElement.classList.contains(
          "menu-button-mobile"
        ))
    ) {
      isMenuClick = true;
    }
    if (
      (container.contains(e.target) || container === e.target) ||
      isMenuClick
    ) {
      return;
    }
    this.toggle(e);
    this.setState({
      viewingParentMenu: ""
    })
  }

  getMenuClassesForResize(classes) {
    const { menuHiddenBreakpoint, subHiddenBreakpoint } = this.props;
    let nextClasses = classes.split(" ").filter(x => x != "");
    const windowWidth = window.innerWidth;
    if (windowWidth < menuHiddenBreakpoint) {
      nextClasses.push("menu-mobile");
    } else if (windowWidth < subHiddenBreakpoint) {
      nextClasses = nextClasses.filter(x => x != "menu-mobile");
      if (
        nextClasses.includes("menu-default") &&
        !nextClasses.includes("menu-sub-hidden")
      ) {
        nextClasses.push("menu-sub-hidden");
      }
    } else {
      nextClasses = nextClasses.filter(x => x != "menu-mobile");
      if (
        nextClasses.includes("menu-default") &&
        nextClasses.includes("menu-sub-hidden")
      ) {
        nextClasses = nextClasses.filter(x => x != "menu-sub-hidden");
      }
    }
    return nextClasses;
  }

  getContainer() {
    return ReactDOM.findDOMNode(this);
  }

  toggle() {
    const { containerClassnames, menuClickCount } = this.props;
    const currentClasses = containerClassnames
      ? containerClassnames.split(" ").filter(x => x != "")
      : "";

    if (currentClasses.includes("menu-sub-hidden") && menuClickCount == 3) {
      this.props.setContainerClassnames(2, containerClassnames);
    } else if (
      currentClasses.includes("menu-hidden") ||
      currentClasses.includes("menu-mobile")
    ) {
      this.props.setContainerClassnames(0, containerClassnames);
    }
  }

  handleProps() {
    this.addEvents();
  }

  addEvents() {
    ["click", "touchstart"].forEach(event =>
      document.addEventListener(event, this.handleDocumentClick, true)
    );
  }
  removeEvents() {
    ["click", "touchstart"].forEach(event =>
      document.removeEventListener(event, this.handleDocumentClick, true)
    );
  }
  setSelectedLiActive() {
    const oldli = document.querySelector(".sub-menu  li.active");
    if (oldli != null) {
      oldli.classList.remove("active");
    }

    /* set selected parent menu */
    const selectedlink = document.querySelector(".sub-menu  a.active");
    if (selectedlink != null) {
      selectedlink.parentElement.classList.add("active");
      this.setState({
        selectedParentMenu: selectedlink.parentElement.parentElement.getAttribute(
          "data-parent"
        )
      });
    } else {
      var selectedParentNoSubItem = document.querySelector(".main-menu  li a.active");
      if (selectedParentNoSubItem != null) {
        this.setState({
          selectedParentMenu: selectedParentNoSubItem.getAttribute(
            "data-flag"
          )
        });
      } else if (this.state.selectedParentMenu == "") {
        this.setState({
          selectedParentMenu: "dashboards"
        });
      }

    }
  }

  componentDidUpdate(prevProps) {
    if (this.props.location.pathname !== prevProps.location.pathname) {
      this.setSelectedLiActive();
      this.toggle();
      window.scrollTo(0, 0);
    }
    this.handleProps();
  }

  componentDidMount() {
    window.addEventListener("resize", this.handleWindowResize);
    this.handleWindowResize();
    this.handleProps();
    this.setSelectedLiActive();
    this.props.getUser();
  }

  componentWillUnmount() {
    this.removeEvents();
    window.removeEventListener("resize", this.handleWindowResize);
  }

  changeDefaultMenuType(e, containerClassnames) {
    e.preventDefault();
    let nextClasses = this.getMenuClassesForResize(containerClassnames);
    this.props.setContainerClassnames(0, nextClasses.join(" "));
  }

  openSubMenu(e, selectedParent, path) {
    e.preventDefault();
    const { containerClassnames, menuClickCount } = this.props;
    const currentClasses = containerClassnames
      ? containerClassnames.split(" ").filter(x => x != "")
      : "";

    if (!currentClasses.includes("menu-mobile")) {
      if (
        currentClasses.includes("menu-sub-hidden") &&
        (menuClickCount == 2 || menuClickCount == 0)
      ) {
        this.props.setContainerClassnames(3, containerClassnames);
      } else if (
        currentClasses.includes("menu-hidden") &&
        (menuClickCount == 1 || menuClickCount == 3)
      ) {
        this.props.setContainerClassnames(2, containerClassnames);
      } else if (
        currentClasses.includes("menu-default") &&
        !currentClasses.includes("menu-sub-hidden") &&
        (menuClickCount == 1 || menuClickCount == 3)
      ) {
        this.props.setContainerClassnames(0, containerClassnames);
      }
    } else {
      this.props.addContainerClassname(
        "sub-show-temporary",
        containerClassnames
      );
    }
    this.setState({
      viewingParentMenu: selectedParent
    });
    this.props.history.push(path);
  }

  changeViewingParentMenu(menu) {
    this.toggle();

    this.setState({
      viewingParentMenu: menu
    })
  }

  openMenu(e, selectedParent) {
    e.preventDefault();
    this.setState({
      viewingParentMenu: selectedParent
    });
  }

  render() {
    let notification = _.get(this.props, "notificationPayment")
    const user = _.get(this.props, "user.list")
    const is_staff = _.get(user, "is_staff", "")
    return (
      <div className="sidebar"
        style={notification ? { top: "4rem" } : {}}
      >
        <div className="main-menu">
          <div className="scroll">
            <PerfectScrollbar
              option={{ suppressScrollX: true, wheelPropagation: false }}
            >
              <Nav vertical className="list-unstyled">
                <NavItem
                  className={classnames({
                    active: ((this.state.selectedParentMenu == "orders" && this.state.viewingParentMenu == "") || this.state.viewingParentMenu == "orders")
                  })}
                >
                  <NavLink
                    to="/orders/order"
                    onClick={e => this.openSubMenu(e, "orders", "/orders/order")}
                  >
                    <i className="iconsmind-Cash-Register" />{" "}
                    การสั่งซื้อ
                  </NavLink>
                </NavItem>
                <NavItem
                  className={classnames({
                    active: ((this.state.selectedParentMenu == "management" && this.state.viewingParentMenu == "") || this.state.viewingParentMenu == "management")
                  })}
                >
                  <NavLink
                    to="/management/product-management"
                    onClick={e => this.openSubMenu(e, "management", "/management/product-management")}
                  >
                    <i className="iconsmind-Gear" />{" "}
                    การจัดการ
                  </NavLink>
                </NavItem>
                <NavItem
                  className={classnames({
                    active: ((this.state.selectedParentMenu == "activity" && this.state.viewingParentMenu == "") || this.state.viewingParentMenu == "activity")
                  })}
                >
                  <NavLink
                    to="/activity/history"
                    onClick={e => this.openSubMenu(e, "activity", "/activity/history")}
                  >
                    <i className="iconsmind-Big-Data" />{" "}
                    ประวัติ
                  </NavLink>
                </NavItem>
                <NavItem
                  className={classnames({
                    active: ((this.state.selectedParentMenu == "analyze" && this.state.viewingParentMenu == "") || this.state.viewingParentMenu == "analyze")
                  })}
                >
                  <NavLink
                    to="/analyze/dashboards"
                    onClick={e => this.openSubMenu(e, "analyze", "/analyze/dashboards")}
                  >
                    <i className="iconsmind-Board" />{" "}
                    สรุปผล
                  </NavLink>
                </NavItem>

                {is_staff ?
                  <NavItem
                    className={classnames({
                      active: ((this.state.selectedParentMenu == "adminSystem" && this.state.viewingParentMenu == "") || this.state.viewingParentMenu == "adminSystem")
                    })}
                  >
                    <NavLink
                      to="/adminSystem/vendorManagement"
                      onClick={e => this.openSubMenu(e, "adminSystem", "/adminSystem/vendorManagement")}
                    >
                      <i className="iconsmind-Cash-Register" />{" "}
                      <span className="text-center">การจัดการEzygas</span>
                    </NavLink>
                  </NavItem>
                  : ""}
              </Nav>
            </PerfectScrollbar>
          </div>
        </div>

        <div className="sub-menu">
          <div className="scroll">
            <PerfectScrollbar
              option={{ suppressScrollX: true, wheelPropagation: false }}
            >
              <Nav
                className={classnames({
                  "d-block": ((this.state.selectedParentMenu == "orders" && this.state.viewingParentMenu == "") || this.state.viewingParentMenu == "orders")
                })}
                data-parent="orders"
              >
                <NavItem>
                  <NavLink to="/orders/order">
                    <i className="iconsmind-Telephone" />{" "}
                    บริการโทรสั่ง
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink to="/orders/order-list">
                    <i className="iconsmind-Bulleted-List" />{" "}
                    รายการสั่งซื้อ
                  </NavLink>
                </NavItem>
              </Nav>

              <Nav
                className={classnames({
                  "d-block": ((this.state.selectedParentMenu == "analyze" && this.state.viewingParentMenu == "") || this.state.viewingParentMenu == "analyze")
                })}
                data-parent="analyze"
              >
                <NavItem>
                  <NavLink to="/analyze/dashboards">
                    <i className="iconsmind-Bar-Chart2" />{" "}
                    สรุปข้อมูล
                  </NavLink>
                </NavItem>
              </Nav>

              <Nav
                className={classnames({
                  "d-block": ((this.state.selectedParentMenu == "management" && this.state.viewingParentMenu == "") || this.state.viewingParentMenu == "management")
                })}
                data-parent="management"
              >
                <NavItem>
                  <NavLink to="/management/product-management">
                    <i className="iconsmind-Add-Cart" />{" "}
                    การจัดการคลังสินค้า
                  </NavLink>
                </NavItem>
                
                <NavItem>
                  <NavLink to="/management/customer-management">
                    <i className="iconsmind-Add-User" />{" "}
                    การจัดการลูกค้า
                  </NavLink>
                </NavItem>

                <NavItem>
                  <NavLink to="/management/privatePrice-management">
                    <i className="iconsmind-Add-User" />{" "}
                    การจัดการโปรโมชั่น
                  </NavLink>
                </NavItem>
              </Nav>

              <Nav
                className={classnames({
                  "d-block": ((this.state.selectedParentMenu == "activity" && this.state.viewingParentMenu == "") || this.state.viewingParentMenu == "activity")
                })}
                data-parent="activity"
              >
                <NavItem>
                  <NavLink to="/activity/history">
                    <i className="iconsmind-Timer" />{" "}
                    ประวัติการขาย
                  </NavLink>
                </NavItem>
              </Nav>

              <Nav
                className={classnames({
                  "d-block": ((this.state.selectedParentMenu == "adminSystem" && this.state.viewingParentMenu == "") || this.state.viewingParentMenu == "adminSystem")
                })}
                data-parent="adminSystem"
              >
                <NavItem>
                  <NavLink to="/adminSystem/vendorManagement">
                    <i className="iconsmind-Timer" />{" "}
                    การจัดการร้านค้า
                  </NavLink>
                </NavItem>

                <NavItem>
                  <NavLink to="/adminSystem/approve">
                    <i className="iconsmind-Timer" />{" "}
                    ยืนยันการชำระเงิน
                  </NavLink>
                </NavItem>
              </Nav>

              {/* <Nav
                className={classnames({
                  "d-block": ((this.state.selectedParentMenu == "landingpage" && this.state.viewingParentMenu == "") || this.state.viewingParentMenu == "landingpage")
                })}
                data-parent="landingpage"
              >
                <NavItem>
                  <a href="/multipage-home" target="_blank"><i className="simple-icon-docs" />{" "}<IntlMessages id="menu.multipage-home" /></a>
                </NavItem>
                <NavItem>
                  <a href="/singlepage-home" target="_blank"><i className="simple-icon-doc" />{" "}<IntlMessages id="menu.singlepage-home" /></a>
                </NavItem>
                <NavItem>
                  <a href="/about" target="_blank"><i className="simple-icon-info" />{" "}<IntlMessages id="menu.about" /></a>
                </NavItem>
                <NavItem>
                  <a href="/blog" target="_blank"><i className="simple-icon-bubbles" />{" "}<IntlMessages id="menu.blog" /></a>
                </NavItem>
                <NavItem>
                  <a href="/blog-detail" target="_blank"><i className="simple-icon-bubble" />{" "}<IntlMessages id="menu.blog-detail" /></a>
                </NavItem>
                <NavItem>
                  <a href="/careers" target="_blank"><i className="simple-icon-people" />{" "}<IntlMessages id="menu.careers" /></a>
                </NavItem>
                <NavItem>
                  <a href="/confirmation" target="_blank"><i className="simple-icon-check" />{" "}<IntlMessages id="menu.confirmation" /></a>
                </NavItem>
                <NavItem>
                  <a href="/contact" target="_blank"><i className="simple-icon-phone" />{" "}<IntlMessages id="menu.contact" /></a>
                </NavItem>
                <NavItem>
                  <a href="/content" target="_blank"><i className="simple-icon-book-open" />{" "}<IntlMessages id="menu.content" /></a>
                </NavItem>
                <NavItem>
                  <a href="/docs" target="_blank"><i className="simple-icon-notebook" />{" "}<IntlMessages id="menu.docs" /></a>
                </NavItem>
                <NavItem>
                  <a href="/features" target="_blank"><i className="simple-icon-chemistry" />{" "}<IntlMessages id="menu.features" /></a>
                </NavItem>
                <NavItem>
                  <a href="/prices" target="_blank"><i className="simple-icon-wallet" />{" "}<IntlMessages id="menu.prices" /></a>
                </NavItem>
                <NavItem>
                  <a href="/videos" target="_blank"><i className="simple-icon-film" />{" "}<IntlMessages id="menu.videos" /></a>
                </NavItem>
              </Nav> */}

              <Nav
                className={classnames({
                  "d-block": ((this.state.selectedParentMenu == "menu" && this.state.viewingParentMenu == "") || this.state.viewingParentMenu == "menu")
                })}
                data-parent="menu"
              >
                <NavItem>
                  <NavLink
                    to="#"
                    onClick={e => this.changeDefaultMenuType(e, "menu-default")}
                  >
                    <i className="simple-icon-control-pause" />{" "}
                    <IntlMessages id="menu.default" />
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink
                    to="#"
                    onClick={e =>
                      this.changeDefaultMenuType(e, "menu-sub-hidden")
                    }
                  >
                    <i className="simple-icon-arrow-left" />{" "}
                    <IntlMessages id="menu.subhidden" />
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink
                    to="#"
                    onClick={e => this.changeDefaultMenuType(e, "menu-hidden")}
                  >
                    <i className="simple-icon-control-start" />{" "}
                    <IntlMessages id="menu.hidden" />
                  </NavLink>
                </NavItem>
              </Nav>
            </PerfectScrollbar>
          </div>
        </div >
      </div >
    );
  }
}

const mapStateToProps = ({ menu, user }) => {
  const {
    containerClassnames,
    subHiddenBreakpoint,
    menuHiddenBreakpoint,
    menuClickCount
  } = menu;
  return {
    containerClassnames,
    subHiddenBreakpoint,
    menuHiddenBreakpoint,
    menuClickCount,
    user
  };
};
export default withRouter(
  connect(
    mapStateToProps,
    { setContainerClassnames, addContainerClassname, changeDefaultClassnames, getUser }
  )(Sidebar)
);
