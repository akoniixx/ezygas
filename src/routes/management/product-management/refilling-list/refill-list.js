import 'rc-time-picker/assets/index.css';
import "react-datepicker/dist/react-datepicker.css"
import React, { Component, Fragment } from 'react';
import {
    Card,
    CardBody,
    Button
} from "reactstrap";
import Text from 'Components/Text';
import { Input } from 'Components/Input';
import { Separator } from "Components/CustomBootstrap";
import Media from 'react-media';
import _ from 'lodash';
import DatePicker from "react-datepicker";
import TimePicker from 'rc-time-picker';
import moment from 'moment';
import { month } from "Constants/dataTime";

//Components
import CheckBox from 'Components/CheckBox';

//Constants
import * as screen from 'Constants/screenWidth';

class RefillList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            list: [],
            prices: {},
            selecting: -1,
            transportPrice: 0,
            isChecked: false,
            startDate: moment(),
            startTime: moment(),
        }
        this.calTimeStamp = this.calTimeStamp.bind(this);
        this.grouppingData = this.grouppingData.bind(this);
        this.handleCheck = this.handleCheck.bind(this);
        this.handleChangeDateTime = this.handleChangeDateTime.bind(this);
        this.handleFinishRefill = this.handleFinishRefill.bind(this);
        this.onChangePrice = this.onChangePrice.bind(this);
        this.onChangeTransportPrice = this.onChangeTransportPrice.bind(this);
        this.setPrices = this.setPrices.bind(this);
    }

    componentWillReceiveProps(nextProps) {
            const selected = this.state.selecting 
            const props = nextProps;
            const selecting = _.get(props, 'selecting', -1);
            this.setState({ selecting: selecting });
            const fillingList = _.get(props, 'fillingList', []);
            const list = _.get(fillingList, 'filling', []);
            if (!_.isEmpty(list)) {
                const grouppedData = this.grouppingData(list);
                this.setState({ list: grouppedData });
                if(selecting != selected){ // check when change activity
                    this.setPrices(grouppedData, list);
                }
                // this.setPrices(grouppedData, list); close for fix re-state everytime (mobile) 
            }
    }

    calTimeStamp() {
        const { startDate, startTime } = this.state
        let date = startDate.toString().split(" ")
        let time = startTime.toString().split(" ")
        date = "" + date[3] + "-" + month[date[1]] + "-" + date[2]
        time = time[4].substring(0, 5)
        return date + "T" + time + ":00+07:00"
    }

    grouppingData(data) {
        let results = {}
        _.forEach(
            data,
            (item) => {
                const brand = _.get(item, 'stock.cylinder_brand');
                const type = _.get(item, 'stock.cylinder_type');
                const quantity = _.get(item, 'quantity');
                let brands = _.get(results, brand, {});
                brands[type] = quantity;
                results[brand] = brands;
            }
        );
        return results;
    }

    handleCheck() {
        const { isChecked } = this.state
        this.setState({
            isChecked: !isChecked
        });
    }

    handleChangeDateTime(DataTime, index) {
        let state = {}
        state[index] = DataTime
        this.setState(state);
    }

    handleFinishRefill() {
        const dateTime = this.calTimeStamp()
        const selectingList = _.get(this.props, 'fillingList.filling', []);
        const id = _.get(this.props, 'fillingList.id', []);
        const prices = this.state.prices;
        const transportPrice = this.state.transportPrice;
        const dataToPost = {
            selectingList: selectingList,
            prices: prices,
            transportPrice: transportPrice,
            time_stamp: dateTime
        }
        //post
        this.props.completeRefillStock(dataToPost, id)
    }

    onChangePrice(newValue, brand) {
        const parsed = parseInt(newValue);
        if (!_.isNaN(parsed) || newValue == "") {
            let prices = this.state.prices;
            if (newValue == "") prices[brand] = newValue;
            else prices[brand] = parsed;
            this.setState({ prices: prices });
        }
    }

    onChangeTransportPrice(newValue) {
        const parsed = parseInt(newValue);
        if (newValue == "") this.setState({ transportPrice: newValue });
        if (!_.isNaN(parsed)) {
            let price = this.state.transportPrice;
            price = parsed;
            this.setState({ transportPrice: price });
        }
    }

    setPrices(data, list) {
        const brands = Object.keys(data);
        _.forEach(brands, brand => {
            let state = this.state.prices;
            state[brand] = 0;
            this.setState({ prices: state });
        });
        // _.forEach(brands, (brand) => {
        //     const types = Object.keys(data[brand]);
        //     let total = 0;
        //     _.forEach(types, (type) => {
        //         const stock = _.find(
        //             list,
        //             (l) => {
        //                 return (_.get(l, 'stock.cylinder_brand') == brand
        //                     && _.get(l, 'stock.cylinder_type') == type
        //                 );
        //             }
        //         ).stock;
        //         const price = parseInt(_.get(stock, 'price', 0));
        //         const quantity = parseInt(data[brand][type]);
        //         total = price * quantity;
        //     });
        //     let state = this.state.prices;
        //     state[brand] = total;
        //     this.setState({
        //         prices: state
        //     });
        // });
    }

    render() {
        const state = this.state;
        const selecting = _.get(state, 'selecting', -1);
        const isMobile = !(window.innerWidth > screen.mobileScreenQuery.maxWidth);
        let methods = _.get(this.props, 'methods', []);
        methods = {
            ...methods,
            handleCheck: this.handleCheck,
            handleChangeDateTime: this.handleChangeDateTime,
            handleFinishRefill: this.handleFinishRefill,
            onChangePrice: this.onChangePrice,
            onChangeTransportPrice: this.onChangeTransportPrice
        }
        if (selecting < 0 && !isMobile) {
            return (
                <Card>
                    <CardBody>
                        <Text
                            type="normal"
                            text="เลือกรายการส่งเติมเพื่อดูรายละเอียด" />
                    </CardBody>
                </Card>
            );
        }
        const grouppedData = _.get(state, 'list', []);
        if (_.isEmpty(grouppedData) && !isMobile) {
            return (
                <Card>
                    <CardBody>
                        <Text
                            type="normal"
                            text="ไม่มีข้อมูลรายการส่งเติม" />
                    </CardBody>
                </Card>
            );
        }
        const keys = Object.keys(grouppedData);
        return (
            <Card className="refill-list-details">
                <CardBody className={`${isMobile ? ' d-flex flex-column' : ''}`}>
                    <Media query={screen.nonMobileScreenQuery}>
                        <Fragment>
                            <Text
                                type="title"
                                text={`รายการส่งเติมที่ ${selecting + 1}`}
                                size="1.5em"
                                color="#0C0CA9"
                                align="start" />
                            <Separator className="mt-2 mb-2" />
                        </Fragment>
                    </Media>
                    {/* Brands List Section */}
                    {keys.map(
                        (key, i) => {
                            return (
                                <div
                                    className="brands-list-section p-3 mb-2" >
                                    <RefillListBrand
                                        key={i}
                                        brand={key}
                                        items={grouppedData[key]} />
                                </div>
                            );
                        }
                    )}
                    {/* Summary Section */}
                    <div className="summary-section p-3">
                        {keys.map(
                            (key, i) => {
                                const prices = _.get(state, 'prices', []);
                                const value = prices[key];
                                return (
                                    <SummaryItem
                                        key={i}
                                        brand={key}
                                        list={grouppedData[key]}
                                        value={value}
                                        methods={methods.onChangePrice}
                                        isTransportPrice={false} />
                                );
                            }
                        )}
                        <SummaryItem
                            brand="ค่าการขนส่ง"
                            value={_.get(state, 'transportPrice', -1)}
                            methods={methods.onChangeTransportPrice}
                            isTransportPrice={true} />
                        <div className="summary-checkBox mb-2" >
                            <CheckBox checked={this.state.isChecked} handleCheck={this.handleCheck} />
                            <Text
                                type="normal"
                                text={"กำหนดเวลาเติมแก๊สสำเร็จเอง"}
                                align="start" />
                        </div>
                        <DataTime method={methods} date={this.state.startDate} time={this.state.startTime} isChecked={this.state.isChecked} />
                    </div>
                </CardBody>
                <div className="finish-refill-button-container">
                    <Button
                        onClick={() => { methods.handleFinishRefill(), methods.toggleCollapse(selecting) }}>
                        <Text
                            type="normal"
                            text="เติมสำเร็จ"
                            color="white" />
                    </Button>
                </div>
            </Card>
        );
    }
}

class RefillListBrand extends Component {
    render() {
        const props = this.props;
        const brand = _.get(props, 'brand', 'brand');
        const items = _.get(props, 'items', []);
        const keys = Object.keys(items);
        return (
            <Fragment>
                <div className="stock-name mb-2">
                    <b>
                        <Text
                            type="normal"
                            text={brand}
                            align="start" />
                    </b>
                    <b className="d-flex justify-content-end">
                        <Text
                            type="normal"
                            text="จำนวน"
                            align="end" />
                    </b>
                </div>
                <Separator className="mb-3" />
                {keys.map(
                    (key, i) => {
                        return (
                            <RefillListItem
                                key={i}
                                type={key}
                                quantity={items[key]} />
                        );
                    }
                )}
            </Fragment>
        );
    }
}

class RefillListItem extends Component {
    render() {
        const props = this.props;
        const type = _.get(props, 'type', 'type');
        const quantity = _.get(props, 'quantity', 'quantity');
        return (
            <div className="list-item mb-2">
                <Text
                    type="normal"
                    text={type}
                    align="start" />
                <Text
                    type="normal"
                    text={`${quantity} ถัง`}
                    align="end" />
            </div>
        );
    }
}

class SummaryItem extends Component {
    render() {
        const props = this.props;
        const brand = _.get(props, 'brand', 'brand');
        const list = _.get(props, 'list', []);
        const value = _.get(props, 'value', 0);
        const isTransportPrice = _.get(props, 'isTransportPrice', false);
        const methods = _.get(props, 'methods');
        if (_.isEmpty(list) && !isTransportPrice) return '';
        return (
            <div className="summary-item mb-2">
                <b>
                    <Text
                        type="normal"
                        text={isTransportPrice ? brand : `ค่าแก๊ส ${brand}`}
                        align="start" />
                </b>
                <Input
                    value={value}
                    onChange={(value) => methods(value, brand)} />
                <b>
                    <Text
                        type="normal"
                        text="บาท"
                        align="end" />
                </b>
            </div>
        );
    }
}

class DataTime extends Component {
    render() {
        const date = (_.get(this.props, "date"))
        const time = (_.get(this.props, "time"))
        const isChecked = (_.get(this.props, "isChecked"))
        const method = (_.get(this.props, "method"))
        return (
            <Fragment>
                <div className="mb-2">
                    <Text
                        type="normal"
                        text="วันที่"
                        align="start" />
                    <DatePicker
                        style={{ backgroundColor: "red" }}
                        selected={date}
                        disabled={!isChecked}
                        dateFormat="DD/MM/YYYY"
                        onChange={event => { method.handleChangeDateTime(event, "startDate") }} />
                </div>
                <Text
                    type="normal"
                    text="เวลา"
                    align="start" />
                <TimePicker
                    defaultValue={time}
                    disabled={!isChecked}
                    showSecond={false}
                    onChange={event => { method.handleChangeDateTime(event, "startTime") }} />
            </Fragment>
        )
    }
}

export default RefillList;