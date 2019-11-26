import React, { Component, Fragment } from "react";
import IntlMessages from "Util/IntlMessages";
import { injectIntl } from 'react-intl';
import { Row, Nav, NavItem, TabContent, TabPane } from "reactstrap";
import { Colxx, Separator } from "Components/CustomBootstrap";
import { NavLink } from "react-router-dom";
import classnames from "classnames";
import { connect } from "react-redux";
import { getOrder, postOrder, getStock, postStock, deleteOrder } from "Redux/actions";
import * as status from 'Constants/orderStatus';
import _ from 'lodash';

//Child Components
import Header from './header';
import WaitForTransport from './waitForTransport';
import InTransit from './inTransit';
import Completed from './completed';
import InfoPanel from './infoPanel';
import SendToTransit from './modals/sendToTransit';
import DeleteConfirmation from './modals/deleteConfirmation';
import CompleteOrder from "./modals/completeOrder";

class OrderList extends Component {

  constructor(props) {
    super(props);
    this.state = {
      activeTab: status.WAIT_FOR_TRANSPORT,
      infoModal: {
        isOpen: false,
        order: [],
        customerDetail: [],
        orderDetail: [],
        date: [],
      },
      toTransitModal: {
        isOpen: false,
        order: []
      },
      completed: {
        isOpen: false,
        order: [],
        emptyTank: []
      },
      delete: {
        isOpen: false,
        order: []
      },
      orders: [],
      stock: []
    }
    this.changeStatus = this.changeStatus.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.loadOrders = this.loadOrders.bind(this);
    this.loadStock = this.loadStock.bind(this);
    this.onAddOrDeleteEmptyTank = this.onAddOrDeleteEmptyTank.bind(this);
    this.onChangeEmptyTank = this.onChangeEmptyTank.bind(this);
    this.onChangeSender = this.onChangeSender.bind(this);
    this.openInfoPanel = this.openInfoPanel.bind(this);
    this.sendToTransitModal = this.sendToTransitModal.bind(this);
    this.switchTabTo = this.switchTabTo.bind(this);
    this.toggleCompleteOrderModal = this.toggleCompleteOrderModal.bind(this);
    this.toggleDeleteModal = this.toggleDeleteModal.bind(this);
    this.toggleModal = this.toggleModal.bind(this);
    this.updateEmptyTank = this.updateEmptyTank.bind(this);
  }

  componentDidMount() {
    this.loadOrders();
    this.loadStock();
  }

  changeStatus(order, changeTo, sender) {
    this.setState({
      toTransitModal: {
        isOpen: false
      },
      completed: {
        isOpen: false
      }
    });
    var data = {
      customer: order.customer.id,
      status: changeTo,
      deliver_time: order.deliver_time
    }
    if(changeTo == status.IN_TRANSIT){
      data = {
        ...data,
        sender: sender
      }
    }
    this.props.postOrder(data, order.id)
    //console.log("order " + order.id + " will change status to ", changeTo)
    if (changeTo == status.COMPLETED) {
      this.updateEmptyTank(order, _.get(this.state, 'completed.emptyTank', []));
    }
    this.loadOrders();
    // switch (changeTo) {
    //   case status.WAIT_FOR_TRANSPORT:
    //     break;
    //   case status.IN_TRANSIT:
    //     break;
    //   case status.COMPLETED:
    //     this.updateEmptyTank(order, _.get(this.state, 'completed.emptyTank', null));
    //     break;
    // }
  }

  handleDelete(order) {
    this.setState({
      delete: {
        isOpen: false
      }
    });
    //console.log("order " + order.id + " will be voided");
    this.props.deleteOrder(order.id)
    this.loadOrders();
  }

  loadOrders() {
    this.props.getOrder();
  }

  loadStock() {
    this.props.getStock();
  }

  onAddOrDeleteEmptyTank(index) {
    const oldState = this.state.completed;
    if (!_.isLength(index)) {
      //add
      oldState.emptyTank.push({
        type: undefined,
        quantity: 0
      });
    } else {
      //delete
      oldState.emptyTank[index] = null;
      oldState.emptyTank = _.compact(oldState.emptyTank);
    }
    this.setState({
      completed: oldState
    });
  }

  onChangeEmptyTank(index, type, value, value2) {
    const oldState = this.state.completed;
    const targetTank = _.get(oldState.emptyTank, index);
    if (type == "TYPE") {
      oldState.emptyTank[index] = {
        ...oldState.emptyTank[index],
        brand: value,
        type: value2
      }
    } else if (type == "QUANTITY") {
      value = parseInt(value);
      if (_.isLength(value)) {
        oldState.emptyTank[index] = {
          ...oldState.emptyTank[index],
          quantity: value
        }
      }
    }
    this.setState({
      completed: oldState
    })
  }

  onChangeSender(changeTo) {
    var state = {}
    state["sender"] = this.state.toTransitModal.order.sender = changeTo
    if (_.has(this.state, 'toTransitModal.order.sender'))
      this.setState(state)
  }

  openInfoPanel(order) {
    let isOpen = this.state.infoModal.isOpen;
    let dateTime = _.get(order, 'deliver_time', '').split("T");
    let date = dateTime[0];
    let time = dateTime.length > 1 ? dateTime[1].substring(0, 5) : "";
    this.setState({
      infoModal: {
        isOpen: !isOpen,
        order: order,
        date: date,
        time: time,
        customer: order.customer,
        orderDetail: order.orders
      }
    });
  }

  sendToTransitModal(order) {
    this.setState({
      toTransitModal: {
        isOpen: !this.state.toTransitModal.isOpen,
        order: order
      }
    });
  }

  switchTabTo(tab) {
    if (this.state.activeTab != tab) {
      this.setState({
        activeTab: tab
      });
    }
  }

  toggleCompleteOrderModal(order) {
    this.setState({
      completed: {
        isOpen: !this.state.completed.isOpen,
        order: order,
        emptyTank: []
      }
    })
  }

  toggleDeleteModal(order) {
    this.setState({
      delete: {
        isOpen: !this.state.delete.isOpen,
        order: order
      }
    })
  }

  toggleModal(modalName, order) {
    switch (modalName) {
      case "INFO":
        this.openInfoPanel(order);
        break;
      case "TRANSIT_COMPLETED":
        this.toggleCompleteOrderModal(order);
        break;
      case "DELETE":
        this.toggleDeleteModal(order);
        break;
      case "SEND_TO_TRANSIT":
        this.sendToTransitModal(order);
        break;
      default: return;
    }
  }

  updateEmptyTank(order, emptyTanks) {
    const stockList = this.props.stock.list
    if (!_.isEmpty(emptyTanks)) {
      //post empty tank to order
      emptyTanks.forEach(tank => {
        //console.log("tank", tank)
        const brand = _.get(tank, 'brand');
        const type = _.get(tank, 'type');
        let tankInStock = _.find(stockList, (item) => { return item.cylinder_type === type && item.cylinder_brand === brand })
        let data = {
          cylinder_brand: brand,
          cylinder_type: type,
          quantity_empty: parseInt(tankInStock.quantity_empty, 10) + parseInt(tank.quantity, 10)
        }
        this.props.postStock(data, tankInStock.id)
      });
    }
  }

  render() {
    let tab1 = status.WAIT_TO_APPROVE;
    let tab2 = status.WAIT_FOR_TRANSPORT;
    let tab3 = status.IN_TRANSIT;
    let tab4 = status.COMPLETED;

    const active = _.get(this.state, 'activeTab');
    const orders = _.get(this.props.order, 'list');
    const stock = _.get(this.props.stock, 'list');
    const loading = _.get(this.props.stock, 'loading');
    return (
      <div className="order-list px-3">
        <InfoPanel
          toggle={this.openInfoPanel}
          info={this.state.infoModal} />
        <SendToTransit
          info={this.state.toTransitModal}
          toggle={this.sendToTransitModal}
          onChangeSender={this.onChangeSender}
          changeStatus={this.changeStatus} />
        <CompleteOrder
          info={this.state.completed}
          toggle={this.toggleCompleteOrderModal}
          onAddOrDeleteEmptyTank={this.onAddOrDeleteEmptyTank}
          onChangeEmptyTank={this.onChangeEmptyTank}
          changeStatus={this.changeStatus}
          stock={stock}
          loading={loading} />
        <DeleteConfirmation
          isOpen={this.state.delete.isOpen}
          toggle={this.toggleDeleteModal}
          order={this.state.delete.order}
          handleDelete={this.handleDelete} />
        <div className="order-list-header-group">
          <Header />
          {/* Tabs */}
          <Nav tabs className="separator-tabs ml-0 mb-5 hello">
            {/* <NavItem>
                <NavLink
                  className={classnames({
                    active: this.state.activeTab === tab1,
                    "nav-link": true
                  })}
                  onClick={() => { this.switchTabTo(tab1) }}
                  to="#"
                >
                  <IntlMessages id="รอการอนุมัติ" />
                </NavLink>
              </NavItem> */}
            <NavItem>
              <NavLink
                className={classnames({
                  active: this.state.activeTab === tab2,
                  "nav-link": true
                })}
                onClick={() => { this.switchTabTo(tab2) }}
                to="#" >
                <IntlMessages id="รอการจัดส่ง" />
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                className={classnames({
                  active: this.state.activeTab === tab3,
                  "nav-link": true
                })}
                onClick={() => { this.switchTabTo(tab3) }}
                to="#" >
                <IntlMessages id="กำลังจัดส่ง" />
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                className={classnames({
                  active: this.state.activeTab === tab4,
                  "nav-link": true
                })}
                onClick={() => { this.switchTabTo(tab4) }}
                to="#" >
                <IntlMessages id="จัดส่งสำเร็จ" />
              </NavLink>
            </NavItem>
          </Nav>
        </div>

        <TabContent activeTab={active}>
          {/* <TabPane tabId={tab1}>
                  //
              </TabPane> */}
          <TabPane tabId={tab2}>
            <WaitForTransport
              orders={_.filter(orders, (order) => { return _.get(order, 'status') == status.WAIT_FOR_TRANSPORT })}
              toggleModal={this.toggleModal} />
          </TabPane>
          <TabPane tabId={tab3}>
            <InTransit
              orders={_.filter(orders, (order) => { return _.get(order, 'status') == status.IN_TRANSIT })}
              toggleModal={this.toggleModal} />
          </TabPane>
          <TabPane tabId={tab4}>
            <Completed
              orders={_.filter(orders, (order) => { return _.get(order, 'status') == status.COMPLETED })}
              toggleModal={this.toggleModal}
            />
          </TabPane>
        </TabContent>
      </div>
    );
  }
}

const mapStateToProps = ({ order, stock }) => {
  return {
    order,
    stock,
  };
};
export default injectIntl(connect(
  mapStateToProps,
  {
    getOrder,
    postOrder,
    getStock,
    postStock,
    deleteOrder,
  }
)(OrderList));