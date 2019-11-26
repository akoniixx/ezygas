import "react-datepicker/dist/react-datepicker.css";
import React, { Component, Fragment } from "react";
import { injectIntl } from 'react-intl';
import { Separator } from "Components/CustomBootstrap";
import moment from 'moment';
import { month } from "Constants/dataTime";

//Child Components
import Header from './header';
import HistoryList from './historyList';
import ModalBill from 'Routes/orders/order-list/infoPanel';

import { connect } from "react-redux";
import { getHistory } from "Redux/actions";
import { apiHistory } from "Constants/defaultValues";

class History extends Component {
    constructor(props) {
        super(props);
        this.toggleModal = this.toggleModal.bind(this);
        this.dataHistory = this.dataHistory.bind(this);
        this.handleChangeDate = this.handleChangeDate.bind(this);
        this.state = {
            modalOpen: false,
            startDate: moment(this.props.start),
            isLoading: true,
            billData: [],
            customerDetail: [],
            ordersList: [],
            sumGas: 0,
            sumCost: 0,
            dayKepp: "",
            yearKeep: "",
            monthKeep: "",
            date: "",
            time: "",
        };
    }

    calSumGas(num) {
        this.state.sumGas += num
    }

    calSumCost(numCost) {
        this.state.sumCost += numCost
    }

    componentWillMount() {

    }

    componentDidMount() {
        this.dataHistory();
    }

    dataHistory() {
        var start = this.state.startDate.toString()
        var time = start.split(" ")
        var Api = apiHistory + time[3] + "/" + month[time[1]] + "/"
        if (this.state.yearKeep != time[3] || this.state.monthKeep != month[time[1]]) {
            this.props.getHistory(Api);
        }
    }

    handleChangeDate(date) {
        this.setState({
            startDate: date
        }, () => { this.dataHistory() })
    }

    toggleModal(status, data) {
        this.setState({
            modalOpen: !this.state.modalOpen,
            sumGas: 0,
            sumCost: 0
        });
        if (status === "info") {
            var dateTime = data.deliver_time.split("T")
            var date = dateTime[0]
            var time = dateTime[1].substring(0, 5)
            this.setState({
                billData: data,
                customerDetail: data.customer,
                ordersList: data.orders,
                date: date,
                time: time
            })
        }
    }

    render() {
        const { list, loading, message } = this.props.history;
        const info = {
            isOpen: this.state.modalOpen,
            customer: this.state.customerDetail,
            date: this.state.date,
            time: this.state.time,
            order: this.state.billData,
            orderDetail: this.state.ordersList
        }
        return (
            !this.state.isLoading ?
                <div className="loading"></div>
                :
                <Fragment>
                    <div className="order-history disable-text-selection" >
                        <ModalBill
                            info={info}
                            toggle={this.toggleModal} />
                        <Header date={this.state.startDate} handleChangeDate={this.handleChangeDate} />
                        <Separator className="mb-2" />
                        <HistoryList
                            historyData={list}
                            loading={loading}
                            state={this.state}
                            toggleModal={this.toggleModal} />
                    </div>
                </Fragment >
        );
    }
}

const mapStateToProps = ({ history }) => {
    return {
        history
    };
};
export default injectIntl(connect(
    mapStateToProps,
    {
        getHistory,
    }
)(History));
