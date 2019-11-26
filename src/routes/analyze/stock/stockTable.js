import React, { Component } from 'react';
import {
    Card,
    CardBody,
    CardTitle
} from "reactstrap";
import _ from 'lodash';
import Text from 'Components/Text';
import Dropdown from 'Components/Dropdown';

export default class StockTable extends Component {

    constructor(props) {
        super(props);
        this.getData = this.getData.bind(this);
        this.renderTableHead = this.renderTableHead.bind(this);
        this.renderTableBody = this.renderTableBody.bind(this);
        this.renderTableSummary = this.renderTableSummary.bind(this);
        this.toggleDropdown = this.toggleDropdown.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.state = {
            isToggled: false,
            currentTable: null
        }
    }

    getData(which) {
        const d = this.props.data.data;
        switch (which) {
            case "normal":
                return d.normal;
            case "empty":
                return d.empty;
            default: return d.normal;
        }
    }

    handleClick(changeTo) {
        this.setState({
            currentTable: changeTo
        });
    }

    renderTableHead(types) {
        return (
            <div className="table-row">
                <div className="table-item table-label left">{"ยี่ห้อ"}</div>
                {types.map(
                    (type, i) => (
                        <div key={i} className="table-item table-label">{type}</div>
                    )
                )}
            </div>
        );
    }

    renderTableBody(which, rowLabels) {
        const data = this.getData(which);
        return data.map(
            (row, i) => {
                const cols = row.map(
                    (col, j) => {
                        return (
                            <div key={j} className="table-item">
                                {col > 0 ? col : "-"}
                            </div>
                        );
                    }
                );
                return (
                    <div key={i} className="table-row">
                        <div className="table-label table-item left">{rowLabels[i]}</div>
                        {cols}
                    </div>
                );
            }
        );
    }

    renderTableSummary(which, columns) {
        const d = this.props.data;
        const total = (function (which) {
            switch (which) {
                case "normal": return d.total_normal;
                case "empty": return d.total_empty;
                default: return d.total_normal;
            }
        })(which);
        const width = (100 * columns);
        return (
            <div className="table-row" style={{ borderTop: 'solid 2px #8F8F8F' }}>
                <div className="table-label table-item left">
                    {"รวมทั้งหมด"}
                </div>
                <div className="table-item" style={{ width: width, maxWidth: width }}>{`${total} ถัง`}</div>
            </div>
        );
    }

    toggleDropdown() {
        this.setState({
            isToggled: !this.state.isToggled
        });
    }

    render() {
        const which = this.state.currentTable;
        const types = this.props.types;
        const brands = this.props.brands;
        const currentSelected = (
            `ถัง${
            this.state.currentTable == "normal" ? "เต็ม" :
                this.state.currentTable == "empty" ? "เปล่า" : "เต็ม"
            }`
        );
        const dropdownList = [
            {
                name: "ถังเต็ม",
                onSelected: () => this.handleClick("normal")
            },
            {
                name: "ถังเปล่า",
                onSelected: () => this.handleClick("empty")
            }
        ];
        return (
            <Card className="card-table">
                <CardBody>
                    <CardTitle>
                        <Text
                            type="title"
                            text="Stock สินค้า"
                            size="1.2em"
                            align="start" />
                        <Dropdown
                            type="primary"
                            currentSelected={currentSelected}
                            width="100px"
                            list={dropdownList} />
                    </CardTitle>
                    <div className="table-header">
                        {this.renderTableHead(types)}
                    </div>
                    {this.renderTableBody(which, brands)}
                    {this.renderTableSummary(which, _.size(types))}
                </CardBody>
            </Card>
        );
    }
}