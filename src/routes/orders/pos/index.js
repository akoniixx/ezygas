import React, { Component, Fragment } from "react";
import { injectIntl } from 'react-intl';
import {
  Row,
} from "reactstrap";
import { Separator } from "Components/CustomBootstrap";
import moment from 'moment';
import axios from 'axios';
import { month } from "Constants/dataTime";
import { connect } from "react-redux";
import { getCustomer, getStock, getVendor, getPrivatePrice, postPrivatePrice } from "Redux/actions";
import Media from 'react-media';
import * as screen from 'Constants/screenWidth';
import { handletoNumber } from 'Util/Utils'

//Child Components
import Header from './header';
import StockList from './stockList';
import ModalOrderManagement from './orderManagement'

//Modal
import Modals from './modal'
import SideButton from 'Components/SideButton'

const apiCustomer = "/api/customer/"
const apiOrder = "/api/order/"

function getCookie(name) {
  var cookieValue = null;
  if (document.cookie && document.cookie !== '') {
    var cookies = document.cookie.split(';');
    for (var i = 0; i < cookies.length; i++) {
      var cookie = cookies[i];
      if (cookie.substring(0, name.length + 1) === (name + '=')) {
        cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
        break;
      }
    }
  }
  return cookieValue;
}
class Pos extends Component {
  constructor(props) {
    super(props);
    this.checktCurrenTime = this.checktCurrenTime.bind(this);
    this.creatPromotionTocustomer = this.creatPromotionTocustomer.bind(this);
    this.dataCustomer = this.dataCustomer.bind(this);
    this.toggleModal = this.toggleModal.bind(this);
    this.handleButtonCalCulate = this.handleButtonCalCulate.bind(this);
    this.handleChangeDate = this.handleChangeDate.bind(this);
    this.handleChangeDateTime = this.handleChangeDateTime.bind(this);
    this.handleState = this.handleState.bind(this);
    this.selectedItem = this.selectedItem.bind(this);
    this.handleDefaultNumGasChange = this.handleDefaultNumGasChange.bind(this);
    this.getId = this.getId.bind(this);
    this.dataStock = this.dataStock.bind(this);
    this.toggleModalConOpen = this.toggleModalConOpen.bind(this);
    this.toggleModalSuccessOpen = this.toggleModalSuccessOpen.bind(this);
    this.toggleModalSideButton = this.toggleModalSideButton.bind(this);
    this.CreateOrder = this.CreateOrder.bind(this);
    this.CalsumGas = this.CalsumGas.bind(this);
    this.CalsumCost = this.CalsumCost.bind(this);
    this.checkActiveTime = this.checkActiveTime.bind(this);
    this.clearItem = this.clearItem.bind(this);
    this.setStateCalGas = this.setStateCalGas.bind(this);
    this.setDataTime = this.setDataTime.bind(this);
    this.state = {
      modalOpen: true,
      modalConOpen: false,
      modalSuccessOpen: false,
      modalSideButtonOpen: false,
      search: "",
      isLoading: true,
      startDate: moment(this.props.start),
      startTime: moment(this.props.start),
      valueCheck: [],
      itemList: [],
      defaultNumGas: [],
      defaultNumCost: [],
      sumGas: 0,
      sumCost: 0,
      checkTime: true,
      id: "",
      name: "",
      customers: [],
      ChangeToOrderList: false,
      CheckOrderMes: true,
      checkTimeCurrent: true,
      dateTime: "",
      serviceCharge: 0,
      discunt_id: ""
    };

  }

  checkActiveTime(event) {
    const { checkTime } = this.state
    this.setState({ checkTime: !checkTime })
  }

  CalsumCost() {
    const { defaultNumCost } = this.state
    var sum = 0;
    var range = defaultNumCost.length
    for (var i = 0; i < range; i++) {
      if (defaultNumCost[i] != null)
        sum = sum + parseInt(defaultNumCost[i], 10)
    }
    this.setState({ sumCost: sum })
  }

  CalsumGas() {
    const { defaultNumGas } = this.state
    var sum = 0
    var range = defaultNumGas.length
    for (var i = 0; i < range; i++) {
      if (defaultNumGas[i] != null && defaultNumGas[i] != "") {
        sum = sum + parseInt(defaultNumGas[i], 10)
      }
    }
    if (isNaN(sum)) {
      this.setState({ sumGas: 0 })
    } else {
      this.setState({ sumGas: sum })
    }
  }

  checktCurrenTime() {
    const { startDate, startTime, checkTime } = this.state
    let currentDate = new Date().toString().split(" ")
    let currentTime = new Date().toString().split(" ")
    let date = startDate.toString().split(" ")
    let time = ""
    date = "" + date[3] + "-" + month[date[1]] + "-" + date[2]
    if (checkTime === true) {
      time = new Date().toString().split(" ")
      time = time[4].substring(0, 5)
      this.setDataTime(date, time)
    } else {
      time = startTime.toString().split(" ")
      time = time[4].substring(0, 5)
      currentDate = "" + currentDate[3] + "-" + month[currentDate[1]] + "-" + currentDate[2]
      currentTime = currentTime[4].substring(0, 5)
      if (currentDate === date) {
        let OrderTime = time.toString().split(":")
        currentTime = currentTime.toString().split(":")
        if (OrderTime[0] < currentTime[0]) {
          // console.log("less Hour")
          this.setState({ checkTimeCurrent: false, dateTime: "" })
        } else if (OrderTime[0] > currentTime[0]) {
          this.setDataTime(date, time)
        }

        if (OrderTime[0] === currentTime[0]) {
          if (OrderTime[1] < currentTime[1]) {
            // console.log("less minute")
            this.setState({ checkTimeCurrent: false, dateTime: "" })
          } else {

            this.setDataTime(date, time)
          }
        }

      } else {
        this.setDataTime(date, time)
      }
    }
  }

  postOrder(newApi, csrftoken, JsonData) {
    fetch(newApi, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-CSRFToken': csrftoken,
      },
      body: JsonData
    })
      .then((response) => response.json())
      .then((responseJson) => {
        if (responseJson.message === "quantity is not enough") {
          this.setState({
            CheckOrderMes: false
          })
        }
      })
      .catch((error) => {
        //console.error(error);
      });
  }

  creatPromotionTocustomer() {
    const { id, discount_id } = this.state
    console.log("creatPromotionTocustomer", discount_id || false)
    if (discount_id || false) {
      this.props.postPrivatePrice({}, discount_id, id, "promotion")
    }
  }

  CreateOrder(e, id) {
    let { itemList, defaultNumGas, checkTimeCurrent, dateTime, serviceCharge } = this.state
    const vendorData = _.get(this.props, "vendor.list[0]")
    e.preventDefault();
    var data = {}
    var OrderLine = {}
    var itemLists = []
    var NumItem = []
    var order = []
    var newApi = apiOrder

    var range = itemList.length
    itemLists = itemList
    NumItem = defaultNumGas
    for (var i = 0; i < range; i++) {
      if (NumItem[itemLists[i].id] != 0) {
        OrderLine = {
          stock: itemLists[i].id,
          quantity: NumItem[itemLists[i].id]
        }
        order = order.concat([OrderLine])
      }
    }
    data = {
      customer: id,
      status: 2,
      deliver_time: dateTime,
      orders: order,
      service_charge: serviceCharge || _.get(vendorData, "service_charge")
    }
    var csrftoken = getCookie('csrftoken');
    var JsonData = JSON.stringify(data);
    if (checkTimeCurrent === true) {
      this.postOrder(newApi, csrftoken, JsonData);
      this.toggleModalSuccessOpen();
      this.toggleModalConOpen();
    } else {
      this.toggleModalConOpen();
    }
  }

  check(e, value) {
    let valueCheck = this.state.valueCheck.slice();
    valueCheck[value.id] = e.target.checked;
    this.setState({ valueCheck })
  }

  clearItem(e) {
    this.setState({
      itemList: [],
      valueCheck: [],
      sumGas: 0,
      sumCost: 0,
      defaultNumGas: [],
      defaultNumCost: [],
      startDate: moment(this.props.start),
      checkTime: true
    })
  }

  componentWillReceiveProps() {
    const vendorData = _.get(this.props, "vendor.list[0]")
    this.setState({ serviceCharge: _.get(vendorData, "service_charge") })
  }

  componentDidMount() {
    this.dataCustomer();
    this.dataStock();
    this.getId();
    this.props.getVendor();
    this.props.getPrivatePrice();
  }

  dataCustomer() {
    this.props.getCustomer()
  }
  dataStock() {
    this.props.getStock();
  }

  getId() {
    const customer = this.props.customer.selected || []
    let id = customer.id || null
    if (id === null) {
      let path = `/orders/order`;
      this.props.history.push(path);
    } else {
      this.setState({ customers: customer, id: id });
    }
  }

  handleButtonCalCulate(e, index, status, price) {
    let state = {};
    const { defaultNumGas, defaultNumCost } = this.state
    if (status === "+" && defaultNumGas[index] >= 0) {
      state[index] = parseInt(defaultNumGas[index], 10) + 1
    }
    if (status === "+" && defaultNumGas[index] === "") {
      state[index] = 1
    }
    if (status === "-" && parseInt(defaultNumGas[index], 10) > 0) {
      state[index] = parseInt(defaultNumGas[index], 10) - 1
    }
    if (status === "-" && parseInt(defaultNumGas[index], 10) === 0) {
      state[index] = 0
    }
    this.setStateCalGas(state, index, price);
  }

  handleChangeDate(date) {
    this.setState({ startDate: date });
  }

  handleChangeDateTime(time) {
    this.setState({ startTime: time });
  }

  handleDefaultNumGasChange(e, index, price) {
    index = parseInt(index, 10)
    let state = {};
    let input = e.target.value
    if (!isNaN(parseInt(input, 10))) {
      state[index] = parseInt(input, 10)
    } else {
      state[index] = ""
    }
    this.setStateCalGas(state, index, price);
  }

  handleState(e, index) {
    console.log("handleState", index)
    const updataeState = () => {
       if (index == "discount_id") {
      this.creatPromotionTocustomer();
    }
    }
    let state = {}
    state[index] = handletoNumber(e)
    this.setState(state,()=>{updataeState()})
   
  }

  setDataTime(date, time) {
    this.setState({
      checkTimeCurrent: true,
      dateTime: date + "T" + time + ":00+07:00"
    })
  }

  selectedItem(e, value) {
    this.check(e, value)
    const { itemList, defaultNumGas, defaultNumCost } = this.state
    var index = parseInt(value.id, 10)
    if (e.target.checked) {
      //append to array 
      defaultNumGas[index] = 1;
      defaultNumCost[index] = value.price * defaultNumGas[index];
      this.setState({
        itemList: itemList.concat([value])
      })
    } else {
      //remove from array
      defaultNumGas[index] = 0;
      defaultNumCost[index] = 0;
      this.setState({
        itemList: itemList.filter(function (val) { return val !== value })
      })
    }
    this.CalsumGas();
    this.CalsumCost();
  }

  setStateCalGas(state, index, price) {
    const { defaultNumGas, defaultNumCost } = this.state
    defaultNumGas[index] = state[index]
    if (defaultNumGas[index] === "") {
      defaultNumCost[index] = 0
    } else {
      defaultNumCost[index] = parseInt(defaultNumGas[index], 10) * parseInt(price, 10)
    }
    this.CalsumGas();
    this.CalsumCost();

  }

  toggleModalConOpen() {
    const { modalConOpen } = this.state
    this.setState({
      modalConOpen: !modalConOpen
    });
  }

  toggleModal() {
    const { modalOpen } = this.state
    this.setState({
      modalOpen: !modalOpen
    });
  }

  toggleModalSuccessOpen(e, fact) {
    const { modalSuccessOpen, CheckOrderMes } = this.state
    this.setState({
      modalSuccessOpen: !modalSuccessOpen
    })
    if (fact === true && CheckOrderMes) {
      this.setState({ ChangeToOrderList: true })
    } else {
      this.setState({ ChangeToOrderList: false, CheckOrderMes: true })
    }
  }

  toggleModalSideButton() {
    const { modalSideButtonOpen } = this.state
    this.setState({
      modalSideButtonOpen: !modalSideButtonOpen
    })
  }

  unCheck(index) {
    let valueCheck = this.state.valueCheck.slice();
    valueCheck[index] = false;
  }

  render() {
    const props = this.props
    const privatePrice = props.private_price || []
    const customerSelected = props.customer.selected || []
    return (
      !this.state.isLoading ?
        <div className="loading"></div>
        :
        <div className="pos disable-text-selection">
          <Media query={screen.mobileScreenQuery}>
            <SideButton
              button={
                <img
                  className="sidebar-icon"
                  src='/assets/img/icon_pos_white.png' />
              }
              onClick={this.toggleModalSideButton} />
          </Media>
          <Modals
            state={this.state}
            dataStock={this.dataStock}
            toggleModalConOpen={this.toggleModalConOpen}
            CreateOrder={this.CreateOrder}
            clearItem={this.clearItem}
            toggleModalSuccessOpen={this.toggleModalSuccessOpen} />
          <Header
            customers={this.state.customers} />
          <Separator className="mb-5" />
          <div className="pos-row py-2">
            <StockList
              stock={this.props.stock}
              valueCheck={this.state.valueCheck}
              selectedItem={this.selectedItem}
              onConfirm={this.toggleModalSideButton} />
            <ModalOrderManagement
              state={{ ...this.state, customerSelected }}
              stock={this.props.stock}
              privatePrice={privatePrice}
              clearItem={this.clearItem}
              checktCurrenTime={this.checktCurrenTime}
              handleButtonCalCulate={this.handleButtonCalCulate}
              handleDefaultNumGasChange={this.handleDefaultNumGasChange}
              handleState={this.handleState}
              selectedItem={this.selectedItem}
              unCheck={this.unCheck}
              handleChangeDate={this.handleChangeDate}
              handleChangeDateTime={this.handleChangeDateTime}
              checkActiveTime={this.checkActiveTime}
              toggleModalConOpen={this.toggleModalConOpen}
              toggleModalSideButton={this.toggleModalSideButton} />
          </div>
        </div>
    );
  }
}

const mapStateToProps = ({ customer, stock, vendor, private_price }) => {
  return {
    customer,
    stock,
    vendor,
    private_price
  };
};
export default injectIntl(connect(
  mapStateToProps,
  {
    getCustomer,
    getStock,
    getVendor,
    getPrivatePrice,
    postPrivatePrice
  }
)(Pos));