import React from 'react';
import {
    Card,
    CardBody,
    CardTitle
} from 'reactstrap';
import Text from 'Components/Text';
import Dropdown from 'Components/Dropdown';
import { LineShadow, chartTooltip } from 'Components/Charts';
import { weekLabel, monthLabel } from 'Constants/dataTime';
import { lineChartColors } from 'Constants/colors';
import { getFullYear } from 'Util/Utils';

const currentYear = getFullYear();
const yearLabel = (function (year) {
    let y = [];
    for (let i = year - 4; i <= year; ++i) {
        y.push(i);
    }
    return y;
})(currentYear);

export default class IncomeGraph extends React.Component {

    constructor(props) {
        super(props);
        this.toggleSizingSm = this.toggleSizingSm.bind(this);
        this.closetoggleSizingSm = this.closetoggleSizingSm.bind();
        this.generateChart = this.generateChart.bind(this);
        this.createGraphLine = this.createGraphLine.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.state = {
            isOpenSizingSm: false,
            currentDropdownSelected: null
        };
    }

    createGraphLine(brand, data, color) {
        return {
            label: brand,
            data: data,
            borderColor: color,
            pointBackgroundColor: "rgba(255,255,255,1.0)",
            pointBorderColor: color,
            pointHoverBackgroundColor: "rgba(255,255,255,1.0)",
            pointHoverBorderColor: color,
            pointRadius: 6,
            pointBorderWidth: 2,
            pointHoverRadius: 8,
            fill: false
        }
    }

    generateChart(period) {
        const graphJson = this.props.graphJson;
        const dataSet = (function (period) {
            switch (period) {
                case "w": return graphJson.weekly;
                case "m": return graphJson.monthly;
                case "y": return graphJson.annual;
                default: return graphJson.annual;
            }
        })(period);
        const label = (function (period) {
            switch (period) {
                case "w": return weekLabel;
                case "m": return monthLabel;
                case "y": return yearLabel;
                default: return yearLabel;
            }
        })(period);
        const dataGraph = [];
        Object.keys(dataSet).forEach((brand, i) => {
            const d = dataSet[brand];
            dataGraph.push(this.createGraphLine(brand, d, lineChartColors[i]));
        });
        const data = {
            labels: label,
            datasets: dataGraph
        }
        const lineChartConfig = {
            legend: {
                position: "bottom",
                labels: {
                    padding: 30,
                    usePointStyle: true,
                    fontSize: 12
                }
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                tooltips: chartTooltip,
                plugins: {
                    datalabels: {
                        display: false
                    }
                },
                scales: {
                    yAxes: [
                        {
                            gridLines: {
                                display: true,
                                lineWidth: 1,
                                color: "rgba(0,0,0,0.1)",
                                drawBorder: false
                            },
                            ticks: {
                                beginAtZero: true,

                                padding: 20
                            }
                        }
                    ],
                    xAxes: [
                        {
                            gridLines: {
                                display: true
                            }
                        }
                    ]
                }
            },
            data: data
        };
        return lineChartConfig;
    }

    toggleSizingSm() {
        this.setState(prevState => ({
            isOpenSizingSm: !prevState.isOpenSizingSm
        }));
    }

    closetoggleSizingSm() {
        this.setState(prevState => ({
            isOpenSizingSm: !prevState.isOpenSizingSm
        }));
    }

    handleClick(changeTo) {
        this.setState({
            currentDropdownSelected: changeTo
        });
    }

    render() {
        let chart = this.generateChart(this.state.currentDropdownSelected);
        const showing = (
            this.state.currentDropdownSelected == "w" ? "สัปดาห์" :
                this.state.currentDropdownSelected == "m" ? "เดือน" :
                    this.state.currentDropdownSelected == "y" ? "ปี" : "ปี"
        );
        const title = `รายได้รวมแต่ละ${showing}`;
        const currentSelected = `ราย${showing}`;
        const dropdownList = [
            {
                name: "รายสัปดาห์",
                onSelected: () => this.handleClick("w")
            },
            {
                name: "รายเดือน",
                onSelected: () => this.handleClick("m")
            },
            {
                name: "รายปี",
                onSelected: () => this.handleClick("y")
            }
        ];
        return (
            <Card>
                <CardBody>
                    <CardTitle>
                        <Text
                            type="title"
                            text={title}
                            size="1.2em"
                            align="start" />
                        <Dropdown
                            type="primary"
                            currentSelected={currentSelected}
                            width="100px"
                            list={dropdownList} />
                    </CardTitle>
                    <div className="graph">
                        <Text
                            type="normal"
                            text="รายได้(บาท)"
                            size="1rem" />
                        <div className="dashboard-line-chart mt-3">
                            <LineShadow type="line" {...chart} />
                        </div>
                    </div>
                </CardBody>
            </Card>
        );
    }
}