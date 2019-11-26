import React, { Component } from "react";
import { injectIntl } from 'react-intl';

import { Card, CardTitle, CardBody } from 'reactstrap';

import "chartjs-plugin-datalabels";
import "react-circular-progressbar/dist/styles.css";
//import axios from 'axios';
import _ from 'lodash';
import Text from 'Components/Text';

//child components
import IncomeGraph from "./incomeGraph";
import SalesGroup from './sales';
import SalesHistogram from './salesHistogram';
import StockGroup from './stock';

import { connect } from "react-redux";
import { getGraph, getHistogram, getSale, getStockTable } from "Redux/actions";

const graphApi = "/api/data/cashflow";
const histogramApi = "/api/data/summary_sale";
const todaySalesApi = "/api/data/today";
const stockTableApi = "/api/data/stock";

class Dashboard extends Component {

    constructor(props) {
        super(props);
        // this.state = {
        //     graph: "not loaded",
        //     sales: "not loaded",
        //     histogram: "not loaded",
        //     stockTable: "not loaded"
        // }
        // this.getGraphData = this.getGraphData.bind(this);
        // this.getHistogramData = this.getHistogramData.bind(this);
        // this.getTodaySalesData = this.getTodaySalesData.bind(this);
        // this.getStockData = this.getStockData.bind(this);
        // this.onRefresh = this.onRefresh.bind(this);
        this.loadingCard = this.loadingCard.bind(this);
        this.errorCard = this.errorCard.bind(this);
        this.noDataCard = this.noDataCard.bind(this);
    }

    // getGraphData() {
    //     axios.get(`${graphApi}`)
    //         .then(res => {
    //             this.setState({
    //                 graph: res.data
    //             });
    //         })
    //         .catch(error => {
    //             this.setState({
    //                 graph: "error"
    //             });
    //         });
    // }

    // getHistogramData() {
    //     axios.get(`${histogramApi}`)
    //         .then(res => {
    //             this.setState({
    //                 histogram: res.data
    //             });
    //         })
    //         .catch(error => {
    //             this.setState({
    //                 histogram: "error"
    //             });
    //         });
    // }

    // getTodaySalesData() {
    //     axios.get(`${todaySalesApi}`)
    //         .then(res => {
    //             const sales = res.data;
    //             this.setState({
    //                 sales: sales.data
    //             });
    //         })
    //         .catch(error => {
    //             this.setState({
    //                 sales: "error"
    //             });
    //         });
    // }

    // getStockData() {
    //     axios.get(`${stockTableApi}`)
    //         .then(res => {
    //             const stock = res.data;
    //             this.setState({
    //                 stockTable: stock.data
    //             });
    //         })
    //         .catch(error => {
    //             this.setState({
    //                 stockTable: "error"
    //             });
    //         });
    // }

    componentDidMount() {
        this.props.getGraph();
        this.props.getHistogram()
        this.props.getSale();
        this.props.getStockTable();
        //this.onRefresh();
    }

    // onRefresh() {
    //     this.getGraphData();
    //     this.getHistogramData();
    //     this.getTodaySalesData();
    //     this.getStockData();
    // }

    loadingCard(title) {
        return (
            <Card>
                <CardBody>
                    <CardTitle>
                        <Text
                            type="title"
                            text={title}
                            size="1em"
                            align="start" />
                    </CardTitle>
                    <Text
                        type="normal"
                        text="กำลังโหลด..." />
                </CardBody>
            </Card>
        );
    }

    errorCard(title) {
        return (
            <Card>
                <CardBody>
                    <CardTitle>
                        <Text
                            type="title"
                            text={title}
                            size="1em"
                            align="start" />
                    </CardTitle>
                    <Text
                        type="normal"
                        text="มีบางอย่างผิดพลาด กรุณากด refresh เพื่อโหลดใหม่ค่ะ" />
                </CardBody>
            </Card>
        );
    }

    noDataCard(title) {
        return (
            <Card>
                <CardBody>
                    <CardTitle>
                        <Text
                            type="title"
                            text={title}
                            size="1em"
                            align="start" />
                    </CardTitle>
                    <Text
                        type="normal"
                        text="ไม่มีข้อมูล" />
                </CardBody>
            </Card>
        );
    }

    render() {
        const dashboard = _.get(this.props, 'dashboard', []);
        const graph = _.get(dashboard, 'GRAPH', []);
        const histogram = _.get(dashboard, 'HISTOGRAM', []);
        const sales = _.get(dashboard, 'SALE', []);
        const stockTable = _.get(dashboard, 'STOCKTABLE', []);
        const section = (data, title, component) => {
            if (data == null || data.list == null || data == [] || !_.get(data, 'loading', false)) {
                return this.errorCard(title);
            }
            if (data.list == 'no data') {
                return this.noDataCard(title);
            }
            if (component == 'income') {
                return <IncomeGraph graphJson={graph.list} />;
            }
            if (component == 'sales') {
                return <SalesGroup sales={sales.list} />;
            }
            if (component == 'histogram') {
                return <SalesHistogram barJson={histogram.list} />;
            }
            if (component == 'stockTable') {
                return <StockGroup stock={stockTable.list} />;
            }
        }
        return (
            <div className="ezygas-dashboard">
                <Text
                    type="header"
                    text="สรุปผล"
                    align="start" />

                {/* Monthly Income Summary Graph */}
                {section(graph, "รายได้รวม", 'income')}

                {/* Today Sales Table */}
                {section(sales, "ยอดขายวันนี้", 'sales')}

                {/* Sales Histogram (bar chart) */}
                {section(histogram, "ยอดขายรวม", 'histogram')}

                {/* Stock Group */}
                {section(stockTable, "Stock สินค้า", 'stockTable')}

            </div>
        );
    }
}


const mapStateToProps = ({ dashboard }) => {
    return {
        dashboard
    };
};
export default injectIntl(connect(
    mapStateToProps,
    {
        getGraph,
        getHistogram,
        getSale,
        getStockTable,
    }
)(Dashboard));