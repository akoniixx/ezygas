import 'rc-time-picker/assets/index.css';
import "react-datepicker/dist/react-datepicker.css"
import React, { Component, Fragment } from "react";
import IntlMessages from "Util/IntlMessages";
import { Card, CardBody, Modal, ModalHeader, ModalBody } from "reactstrap";
import { Separator } from "Components/CustomBootstrap";
import Text from 'Components/Text';
import Button from 'Components/Button';
import { Input } from 'Components/Input';
import { PlusButton, MinusButton } from 'Components/Button/quantityButton';
import DatePicker from "react-datepicker";
import TimePicker from 'rc-time-picker';
import moment from 'moment';
import Dropdown from 'Components/Dropdown';
import _ from 'lodash';
import Media from 'react-media';
import * as screen from 'Constants/screenWidth';

class OrderManagement extends Component {
  constructor(props) {
    super(props)
    this.state = {
      index: 0,
      item: {}
    }
    this.setInitialValue = this.setInitialValue.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  componentDidMount() {
    this.setInitialValue()
  }

  setInitialValue(){
    const selectedCustomer = this.props.state.customerSelected || null
    const privatePriceList = this.props.privatePrice.list || []
    privatePriceList.forEach((item, index) => {
      console.log(item.name_th , selectedCustomer.discount)
      if (item.name_th == selectedCustomer.discount) {
        this.setState({ index: index + 1, item: item }, this.props.handleState(item.id, "discount_id"))
      }
    });
  }

  onChange(index, item) {
    console.log("test",index, item)
    this.setState({ index: index, item: item }, this.props.handleState(item.id, "discount_id"))
  }
  render() {
    const state = { ...this.props.state, ...this.state }
    const stock = this.props.stock
    const func = { ...this.props, onChange: this.onChange }
    const privatePrice = this.props.privatePrice
    return (
      <Fragment>
        <Media query={screen.nonMobileScreenQuery}>
          <Management state={state} privatePrice={privatePrice} stock={stock} func={func} />
        </Media>
        <Media query={screen.mobileScreenQuery}>
          <ManagementMobile state={state} privatePrice={privatePrice} stock={stock} func={func} />
        </Media>
      </Fragment>
    );
  }
}

export default OrderManagement

class Management extends Component {
  render() {
    const state = this.props.state
    const stock = this.props.stock
    const func = this.props.func
    const privatePrice = this.props.privatePrice
    return (
      <div className="order-manage mx-4" >
        <Card className="w-100">
          <CardBody >
            <Header func={func} />
            <HeaderList />
            <div className="scrollbars-orderManagement" >
              <ItemList state={state} stock={stock} func={func} />
            </div>
            <Separator className="mb-2" />
            <PrivatePrice state={state} privatePrice={privatePrice} func={func} />
            <SericeCost state={state} func={func} />
            <Date state={state} func={func} />
            <Time state={state} func={func} />
            <Result state={state} />
            <ButtonSubmit func={func} />
          </CardBody>
        </Card>
      </div>
    )
  }
}

class ManagementMobile extends Component {
  render() {
    const state = this.props.state;
    const stock = this.props.stock
    const func = this.props.func;
    const privatePrice = this.props.privatePrice
    return (
      <Fragment>
        <Modal
          className="order-manage-modal"
          isOpen={state.modalSideButtonOpen}
          toggle={func.toggleModalSideButton}
          wrapClassName="modal-right"
          backdrop={true}
        >
          <ModalHeader
            toggle={func.toggleModalSideButton}>
            <Header func={func} />
          </ModalHeader>
          <ModalBody>
            <HeaderList />
            <div className="scrollbars-orderManagement" >
              <ItemList state={state} stock={stock} func={func} />
            </div>
            <Separator className="mb-2" />
            <PrivatePrice state={state} privatePrice={privatePrice} func={func} />
            <SericeCost state={state} func={func} />
            <Date state={state} func={func} />
            <Time state={state} func={func} />
            <Result state={state} />
            <ButtonSubmit func={func} />
          </ModalBody>
        </Modal>
      </Fragment>
    )
  }
}

class Header extends Component {
  render() {
    const func_clearItem = _.get(this.props.func, 'clearItem');
    const content = (
      <div className="order-manage-title mb-2">
        <Text type="title" text="รายการสั่งซื้อ" align="start" />
        <Button type="cancel" text="ยกเลิกรายการ" onClick={func_clearItem} />
      </div>
    );
    return (
      <Fragment>
        <Media query={screen.nonMobileScreenQuery}>
          <div className="order-manage-header">
            {content}
          </div>
        </Media>
        <Media query={screen.mobileScreenQuery}>
          {content}
        </Media>
      </Fragment>
    )
  }
}

class HeaderList extends Component {
  render() {
    return (
      <div className="order-header">
        <div className="order-item mb-1">
          <div className="item-name mr-1">
            <b><Text type="normal" text="สินค้า" align="start" /></b>
          </div>
          <div className="item-price mr-1">
            <b><Text type="normal" text="ราคา" align="start" /></b>
          </div>
          <div className="item-quantity">
            <b><Text type="normal" text="จำนวน" align="start" /></b>
          </div>
        </div>
        <Separator className="mb-2" />
      </div>
    )
  }
}

class ItemList extends Component {
  render() {
    const state = this.props.state
    const itemList = this.props.state.itemList
    const stock = this.props.stock.list
    const func = this.props.func
    const ckeckQuantity = (stockList, item) => {
      return _.find(stockList, (stockList) => { return stockList.id === item.id })
    }
    // console.log("stock", stock)
    return (
      <Fragment>
        {itemList.map((item) => {
          return (
            <Fragment>
              <div className="order-item mb-1" key={item.id}>
                <div className="item-name mr-1">
                  <b>
                    <Text
                      type="normal"
                      text={`${item.cylinder_brand} ${item.cylinder_type}`} />
                  </b>
                </div>
                <div className="item-price mr-1">
                  <Text type="normal" text={item.price} />
                </div>
                <div className="item-quantity">
                  <MinusButton
                    onClick={(e) => { func.handleButtonCalCulate(e, item.id, '-', item.price) }} />
                  <Input
                    value={state.defaultNumGas[item.id]}
                    onChange={(value) => { func.handleDefaultNumGasChange({ target: { value: value } }, item.id, item.price); }} />
                  <PlusButton
                    onClick={(e) => { func.handleButtonCalCulate(e, item.id, '+', item.price) }} />
                </div>
                <a
                  className="item-delete"
                  onClick={(e) => {
                    func.selectedItem(e, item)
                    func.unCheck(item.id)
                  }} ><IntlMessages id="X" />
                </a>
              </div>
              <div>
                {state.defaultNumGas[item.id] > ckeckQuantity(stock, item).quantity ?
                  <Text type="normal" text={"จำนวนสินค้าไม่พอการสั่งซื้อ"} color="#DC3545" />
                  :
                  ""
                }
              </div>
              <Separator className="mb-2" />
            </Fragment>
          )
        }
        )}
      </Fragment>
    )
  }
}

class PrivatePrice extends Component {
  render() {
    const state = this.props.state
    const func = this.props.func
    const privatePriceList = this.props.privatePrice.list || []
    const index = state.index || 0
    const onSelected = (index, item) => { func.onChange(index, item) }
    let listInitial = [{ name: "-ไม่เลือกโปรโมชัน-", onSelected: () => onSelected(0, "none") }]
    let createList = (privatePriceList) => {
      privatePriceList.forEach((item, index) => {
        listInitial = listInitial.concat({ name: item.name_th, onSelected: () => onSelected(index + 1, item) })
      });
      return listInitial
    }
    const list = createList(privatePriceList)
    const selectedItem = list[index].name
    return (
      <Fragment>
        <div className="mb-2">
          <b><Text type="normal" text="โปรโมชัน" /></b>
          <div className="mt-2">
            <Dropdown
              style={{ borderRadius: "5px" }}
              type={"primary"}
              currentSelected={selectedItem}
              list={list}
            />
          </div>
        </div>
      </Fragment>
    )
  }
}

class SericeCost extends Component {
  render() {
    const serviceCharge = _.get(this.props.state, "serviceCharge")
    const func = _.get(this.props, "func")
    return (
      <div className="mb-2">
        <b><Text type="normal" text="ค่าบริการ" /></b>
        <div className="mt-2">
          <Input value={serviceCharge} borderRadius={"5px"} onChange={(e) => { func.handleState(e, "serviceCharge") }} />
        </div>
      </div>
    )
  }
}

class Date extends Component {
  render() {
    const state = this.props.state
    const func = this.props.func
    return (
      <div className="order-item-date" >
        <b><Text type="normal" text="วันที่" /></b>
        <div className="react-datepicker mt-2 mb-2 w-100">
          <DatePicker
            selected={state.startDate}
            onChange={func.handleChangeDate}
            minDate={new Date()}
            dateFormat="DD/MM/YYYY"
            showDisabledMonthNavigation
            // popperClassName="some-custom-class"
            // popperPlacement="top-end"
            // popperModifiers={{
            //   offset: {
            //     enabled: true,
            //     offset: '0px, -1px'
            //   },
            //   preventOverflow: {
            //     enabled: true,
            //     escapeWithReference: false, // force popper to stay in viewport (even when input is scrolled out of view)
            //     boundariesElement: 'viewport'
            //   }
            // }}
            //Portal
            withPortal
          />
        </div>
      </div>
    )
  }
}

class Time extends Component {
  render() {
    const state = this.props.state
    const time = _.get(this.props.state, "startTime")
    const func = this.props.func
    const currentlyTime = (function (t) {
      if (t === null) {
        return moment()
      } else {
        return time
      }
    })(time)
    return (
      <div className="order-item-time mb-4">
        <b><Text type="normal" text="เวลา" /></b>
        <div className="time-select mt-2">
          <TimePicker
            className="mr-3"
            defaultValue={moment()}
            value={currentlyTime}
            showSecond={false}
            disabled={state.checkTime}
            clearIcon
            onChange={func.handleChangeDateTime} />
          <input
            className="time-checkbox mr-2"
            type="checkbox"
            ref={'ref_checktime'}
            checked={state.checkTime}
            onClick={event => { func.checkActiveTime(event) }} />
          <Text type="normal" text="ส่งตามคิว" />
        </div>
      </div>
    )
  }
}

class Result extends Component {
  render() {
    const state = this.props.state
    const discount = state.item.discount_price || 0
    const discountText = (
      <div class="style-discount">
        <del>
          <span class="amount"><Text type="normal" text={state.sumCost} align="start" /></span>
        </del>
        <ins>
          <span class="amount"><Text type="normal" text={state.sumCost - discount} align="start" /></span>
        </ins>
      </div>
    )
    return (
      <div className="order-manage-result mb-3">
        <div className="order-manage-total mb-2">
          <Text type="normal" text="จำนวนทั้งหมด" align="start" />
          <Text type="normal" text={state.sumGas} align="start" />
          <Text type="normal" text="ถัง" align="start" />
        </div>
        <div className="order-manage-total">
          <Text type="normal" text="รวมทั้งสิ้น" align="start" />
          {discount === 0 || state.sumCost - discount < 0 ?
            <Text type="normal" text={state.sumCost} align="start" />
            :
            <div>{discountText}</div>
          }
          <Text type="normal" text="บาท" align="start" />
        </div>
      </div>
    )
  }
}

class ButtonSubmit extends Component {
  render() {
    const func = this.props.func;
    return (
      <div className="order-submit">
        <Button
          type="primary"
          text="ยืนยันการสั่งซื้อ"
          isFullWidth={true}
          onClick={() => { func.checktCurrenTime(), func.toggleModalConOpen() }} />
      </div>
    );
  }
}