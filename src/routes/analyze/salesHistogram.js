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
import { getFullYear } from 'Util/Utils';
import { barChartColors } from 'Constants/colors';

const currentYear = getFullYear();
const yearLabel = (function (year) {
    let y = [];
    for (let i = year - 4; i <= year; ++i) {
        y.push(i);
    }
    return y;
})(currentYear);

class SalesHistogram extends React.Component {

    constructor(props) {
        super(props);
        this.toggleDropdown = this.toggleDropdown.bind(this);
        this.generateChart = this.generateChart.bind(this);
        this.createBar = this.createBar.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.state = {
            isToggled: false,
            currentHistogram: null
        }
    }

    createBar(brand, data, color) {
        return {
            label: brand,
            borderColor: color,
            backgroundColor: color,
            data: data,
            borderWidth: 2
        }
    }

    generateChart(period) {
        const barJson = this.props.barJson;
        const dataSet = (function (period) {
            switch (period) {
                case "w": return barJson.weekly;
                case "m": return barJson.monthly;
                case "y": return barJson.annual;
                default: return barJson.annual;
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
        const dataHistogram = [];
        Object.keys(dataSet.data).forEach((brand, i) => {
            const d = dataSet.data[brand];
            dataHistogram.push(this.createBar(brand, d, barChartColors[i]));
        });
        const barChartConfig = {
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
                                display: false
                            }
                        }
                    ]
                },
                tooltips: chartTooltip
            },
            data: {
                labels: label,
                datasets: dataHistogram
            }
        };
        return barChartConfig;
    }

    handleClick(changeTo) {
        this.setState({
            currentHistogram: changeTo
        });
    }

    toggleDropdown() {
        this.setState({
            isToggled: !this.state.isToggled
        });
    }

    render() {
        const showing = (
            this.state.currentHistogram == "w" ? "สัปดาห์" :
                this.state.currentHistogram == "m" ? "เดือน" :
                    this.state.currentHistogram == "y" ? "ปี" : "ปี"
        );
        const title = `ยอดขายรวมแต่ละ${showing}`;
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
                            text="จำนวน(ถัง)"
                            size="1rem" />
                        <div className="dashboard-line-chart mt-3">
                            <LineShadow type="bar" {...this.generateChart(this.state.currentHistogram)} />
                        </div>
                    </div>
                </CardBody>
            </Card>
        );
    }
}

export default SalesHistogram;